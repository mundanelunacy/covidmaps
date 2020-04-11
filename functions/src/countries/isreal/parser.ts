import * as functions from "firebase-functions";
import axios, { AxiosResponse } from "axios";
import * as admin from "firebase-admin";
import {
    noDupesInsert,
    setIncidentCreatedFlag,
    getNonRegisteredIncidents,
    googlePlacesQuery,
} from "../../lib/lib";
import { RAW_ISREAL_DATA, INCIDENTS, ARCGIS_ENDPOINT } from "../../lib/constants";

// initialize Firestore
try {
    admin.initializeApp(functions.config().firebase);
} catch (e) {}

const geo = require("geofirex").init(admin);

export const arcgisImport = async (request: any, response: any) => {
    const original: AxiosResponse = await axios.get(ARCGIS_ENDPOINT);

    const asyncRes = await Promise.all(
        original.data.features.map(async (data: any, index: number) => {
            const docId = await noDupesInsert(RAW_ISREAL_DATA, data);
            if (docId) {
                await setIncidentCreatedFlag(RAW_ISREAL_DATA, docId, false);
                return docId;
            }
            return "";
        })
    );

    response.send(`added ${asyncRes.filter((value) => value).length} documents`);
};

export const getGooglePlace = async (request: any, response: any) => {
    let i: number = 0;
    let count: number = 0;
    let obj: {} = {};

    const temp: any[] = await getNonRegisteredIncidents(RAW_ISREAL_DATA);

    if (!temp.length) {
        response.send("added 0 documents");
        return;
    }

    for (i = 0; i < temp.length; i++) {
        // for (i = 0; i < 3; i++) {
        const doc = temp[i];
        console.log("i: ", i);

        const mapsResponse: any = await googlePlacesQuery(
            doc.data.attributes.Place,
            doc.data.geometry.x,
            doc.data.geometry.y,
            "iw"
        );
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
                    endTimestampMs: doc.data.attributes.toTime,
                };
                await noDupesInsert(INCIDENTS, obj);
                await setIncidentCreatedFlag(RAW_ISREAL_DATA, doc.id, true);

                count++;
            } else if (mapsResponse.data.status === "ZERO_RESULTS") {
                obj = {
                    address: "",
                    name: doc.data.attributes.Place ? doc.data.attributes.Place : "",
                    placeId: "",
                    position: geo.point(doc.data.geometry.x, doc.data.geometry.y),
                    validated: true,
                    startTimestampMs: doc.data.attributes.fromTime,
                    endTimestampMs: doc.data.attributes.toTime,
                };

                await noDupesInsert(INCIDENTS, obj);
                await setIncidentCreatedFlag(RAW_ISREAL_DATA, doc.id, true);
                count++;
            } else {
                console.error(
                    `${mapsResponse.request} request failed with ${mapsResponse.data.status} status`
                );
            }
        } catch (e) {
            console.error("this document add produced an error");
            console.error(doc);
        }
    }

    response.send(`added ${count} documents`);
};
