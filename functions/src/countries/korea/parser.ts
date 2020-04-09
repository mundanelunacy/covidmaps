import * as functions from "firebase-functions";
import axios, { AxiosResponse } from "axios";
import * as admin from "firebase-admin";
import * as moment from "moment-timezone";
import { minTwoDigits } from "../../helpers";
import { RAW_KOREA_DATA, INCIDENTS, NAVER_ENDPOINT, KOREA_DEFAULT_DURATION_MS } from "../constants";

import { noDupesInsert, setIncidentCreatedFlag, getNonRegisteredIncidents, googlePlacesQuery } from "../lib";

// initialize Firestore
try {
    admin.initializeApp(functions.config().firebase);
} catch (e) {}

const geo = require("geofirex").init(admin);

export const naverImport = async (request: any, response: any) => {
    const original: AxiosResponse = await axios.get(NAVER_ENDPOINT);
    const mutated = "[" + original.data.substring(original.data.indexOf("\n") + 1);
    const x: Function = new Function("return " + mutated);
    const inputData: [] = x();

    const asyncRes = await Promise.all(
        inputData.map(async (data: any, index: number) => {
            const docId = await noDupesInsert(RAW_KOREA_DATA, data);
            if (docId) {
                await setIncidentCreatedFlag(RAW_KOREA_DATA, docId, false);
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

    const temp: any[] = await getNonRegisteredIncidents(RAW_KOREA_DATA);

    if (!temp.length) {
        response.send("added 0 documents");
        return;
    }

    for (i = 0; i < temp.length; i++) {
        const doc = temp[i];

        const pos = {
            lat: parseFloat(doc.data.latlng.split(",")[0].trim()),
            lng: parseFloat(doc.data.latlng.split(",")[1].trim()),
        };
        const startTimestampMs = moment
            .tz(
                `${new Date().getUTCFullYear()}-${minTwoDigits(doc.data.month)}-${minTwoDigits(
                    doc.data.day
                )} 23:59`,
                "Asia/Seoul"
            )
            .valueOf();

        const mapsResponse: any = await googlePlacesQuery(doc.data.address, pos.lat, pos.lng, "ko");
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
                    endTimestampMs: startTimestampMs + KOREA_DEFAULT_DURATION_MS,
                };
                await noDupesInsert(INCIDENTS, obj);
                await setIncidentCreatedFlag(RAW_KOREA_DATA, doc.id, true);

                count++;
            } else if (mapsResponse.data.status === "ZERO_RESULTS") {
                obj = {
                    address: doc.data.address_name,
                    name: doc.data.address,
                    placeId: "",
                    position: geo.point(pos.lat, pos.lng),
                    validated: true,
                    startTimestampMs,
                    endTimestampMs: startTimestampMs + KOREA_DEFAULT_DURATION_MS,
                };
                await noDupesInsert(INCIDENTS, obj);
                await setIncidentCreatedFlag(RAW_KOREA_DATA, doc.id, true);

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
