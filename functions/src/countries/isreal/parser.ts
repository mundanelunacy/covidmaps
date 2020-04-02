import * as functions from "firebase-functions";
import axios, { AxiosResponse } from "axios";
import * as admin from "firebase-admin";
import * as hash from "object-hash";
import { apiKey } from "../../config/googleMaps";
import { objToParams, sleep } from "../../helpers";

// initialize Firestore
try {
    admin.initializeApp(functions.config().firebase);
} catch (e) {}

const db = admin.firestore();
const geo = require("geofirex").init(admin);
const placesEndpoint = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?`;
const arcgisEndpoint =
    "https://services5.arcgis.com/dlrDjz89gx9qyfev/arcgis/rest/services/Corona_Exposure_View/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&maxRecordCountFactor=4&outSR=4326&resultOffset=0&resultRecordCount=8000&cacheHint=true";

export const arcgisImport = async (request: any, response: any) => {
    const original: AxiosResponse = await axios.get(arcgisEndpoint);

    original.data.features.map(async (data: any) => {
        const doc = await db
            .collection("rawIsrealData")
            .doc(hash(data))
            .get();

        if (!doc.exists) {
            await db
                .collection("rawIsrealData")
                .doc(hash(data))
                .set({ ...data, incidentCreated: false });
            return 1;
        }
        return 0;
    });

    response.send(`added documents`);
};

export const getGooglePlace = async (request: any, response: any) => {
    let snapshot: any;

    try {
        snapshot = await db
            .collection("rawIsrealData")
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

        const query = {
            key: apiKey,
            inputtype: "textquery",
            language: "iw",
            fields: "formatted_address,geometry,name,place_id",
            input: doc.data.attributes.Place,
            locationbias: `point:${doc.data.geometry.x},${doc.data.geometry.y}`
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
                    name: mapsResponse.data.candidates[0].name
                        ? mapsResponse.data.candidates[0].name
                        : doc.data.attributes.Place,
                    placeId: mapsResponse.data.candidates[0].place_id,
                    position: geo.point(
                        mapsResponse.data.candidates[0].geometry.location.lat,
                        mapsResponse.data.candidates[0].geometry.location.lng
                    ),
                    validated: true,
                    startTimestampMs: doc.data.attributes.fromTime,
                    endTimestampMs: doc.data.attributes.toTime
                };
                await db.collection("incidents").add(obj);
                await db
                    .collection("rawIsrealData")
                    .doc(doc.id)
                    .update({ incidentCreated: true });

                count++;
            } else if (mapsResponse.data.status === "ZERO_RESULTS") {
                obj = {
                    address: "",
                    name: doc.data.attributes.Place ? doc.data.attributes.Place : "",
                    placeId: "",
                    position: geo.point(doc.data.geometry.x, doc.data.geometry.y),
                    validated: true,
                    startTimestampMs: doc.data.attributes.fromTime,
                    endTimestampMs: doc.data.attributes.toTime
                };
                await db.collection("incidents").add(obj);
                await db
                    .collection("rawIsrealData")
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
