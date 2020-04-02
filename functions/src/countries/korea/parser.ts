import * as functions from "firebase-functions";
import axios, { AxiosResponse } from "axios";
import * as hash from "object-hash";
import * as admin from "firebase-admin";
import * as moment from "moment-timezone";
import { apiKey } from "../../config/googleMaps";
import { objToParams, sleep, minTwoDigits } from "../../helpers";

// initialize Firestore
try {
    admin.initializeApp(functions.config().firebase);
} catch (e) {}

const db = admin.firestore();
const geo = require("geofirex").init(admin);
const placesEndpoint = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?`;
const naverEndpoint = "https://coronamap.site/javascripts/ndata.js";

export const naverImport = async (request: any, response: any) => {
    const original: AxiosResponse = await axios.get(naverEndpoint);
    const mutated = "[" + original.data.substring(original.data.indexOf("\n") + 1);
    const x: Function = new Function("return " + mutated);
    const inputData: [] = x();

    inputData.map(async (data: any) => {
        const doc = await db
            .collection("rawKoreaData")
            .doc(hash(data))
            .get();

        if (!doc.exists) {
            await db
                .collection("rawKoreaData")
                .doc(hash(data))
                .set({ ...data, incidentCreated: false });
        }
    });

    response.send(`added documents`);
};

export const getGooglePlace = async (request: any, response: any) => {
    let snapshot: any;

    try {
        snapshot = await db
            .collection("rawKoreaData")
            .where("incidentCreated", "==", false)
            .get();
    } catch (e) {
        console.log("error: ", e);
    }

    if (snapshot.empty) {
        response.send("added 0 documents");
        return;
    }

    let i: number = 0;
    let count: number = 0;
    const temp: any[] = [];

    snapshot.forEach((doc: any) => {
        temp.push({ data: doc.data(), id: doc.id });
    });

    for (i = 0; i < temp.length; i++) {
        // console.log("i:  " + i);
        const doc = temp[i];

        const s = doc.data.latlng.split(",");
        const startTimestampMs = moment
            .tz(
                `${new Date().getUTCFullYear()}-${minTwoDigits(doc.data.month)}-${minTwoDigits(
                    doc.data.day
                )} 23:59`,
                "Asia/Seoul"
            )
            .valueOf();
        const query = {
            key: apiKey,
            inputtype: "textquery",
            language: "ko",
            fields: "formatted_address,geometry,name,place_id",
            input: doc.data.address,
            locationbias: `point:${s[0].trim()},${s[1].trim()}`
        };

        const requestStr = `${placesEndpoint}${encodeURI(objToParams(query))}`;
        let mapsResponse: any;

        try {
            mapsResponse = await axios.get(requestStr);
            sleep(125);
        } catch (e) {
            console.error(`axios ${requestStr} failed`);
        }

        let obj: {} = {};

        try {
            if (mapsResponse.data.status === "OK") {
                obj = {
                    address: mapsResponse.data.candidates[0].formatted_address,
                    name: mapsResponse.data.candidates[0].name,
                    placeId: mapsResponse.data.candidates[0].place_id,
                    position: geo.point(
                        mapsResponse.data.candidates[0].geometry.location.lat,
                        mapsResponse.data.candidates[0].geometry.location.lng
                    ),
                    validated: true,
                    startTimestampMs,
                    endTimestampMs: startTimestampMs + 60 * 60 * 1000
                };
                await db.collection("incidents").add(obj);

                await db
                    .collection("rawKoreaData")
                    .doc(doc.id)
                    .update({ incidentCreated: true });

                count++;
            } else if (mapsResponse.data.status === "ZERO_RESULTS") {
                obj = {
                    address: doc.data.address_name,
                    name: doc.data.address,
                    placeId: "",
                    position: geo.point(parseFloat(s[0]), parseFloat(s[1])),
                    validated: true,
                    startTimestampMs,
                    endTimestampMs: startTimestampMs + 60 * 60 * 1000
                };
                await db.collection("incidents").add(obj);
                await db
                    .collection("rawKoreaData")
                    .doc(doc.id)
                    .update({ incidentCreated: true });

                count++;
            } else {
                console.error(`${requestStr} request failed with ${mapsResponse.data.status} status`);
            }
        } catch (e) {
            console.error("this document add produced an error");
            console.error(obj);
        }
    }

    response.send(`added ${count} documents`);
};
