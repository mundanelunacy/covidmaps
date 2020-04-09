import * as functions from "firebase-functions";
import * as hash from "object-hash";
import * as admin from "firebase-admin";
import { apiKey } from "../config/googleMaps";
import { objToParams, sleep } from "../helpers";
import axios, { AxiosResponse } from "axios";
import { GOOGLEPLACES_SLEEP_INTERVAL, GOOGLEPLACES_ENDPOINT } from "./constants";

// initialize Firestore
try {
    admin.initializeApp(functions.config().firebase);
} catch (e) {}

const db = admin.firestore();

export const noDupesInsert = async (collection: string, obj: object): Promise<string> => {
    const docId = hash(obj);
    const tempDoc = await db.collection(collection).doc(docId).get();
    if (!tempDoc.exists) {
        await db.collection(collection).doc(docId).set(obj);
    } else {
        console.log(`${docId} was a dupe`);
    }
    return docId;
};

export const setIncidentCreatedFlag = async (collection: string, docId: string, status: boolean) => {
    await db.collection(collection).doc(docId).update({ incidentCreated: status });
    return;
};

export const getNonRegisteredIncidents = async (collection: string): Promise<any[]> => {
    let snapshot: any;
    const temp: any[] = [];
    try {
        snapshot = await db.collection(collection).where("incidentCreated", "==", false).get();
    } catch (e) {
        console.log("error: ", e);
    }

    snapshot.forEach((doc: any) => {
        temp.push({ data: doc.data(), id: doc.id });
    });

    return temp;
};

export const googlePlacesQuery = async (
    input: string,
    lat: number,
    lng: number,
    language: string = "en"
): Promise<any> => {
    const query = {
        key: apiKey,
        inputtype: "textquery",
        language,
        fields: "formatted_address,geometry,name,place_id",
        input,
        locationbias: `point:${lat},${lng}`,
    };

    const requestStr = `${GOOGLEPLACES_ENDPOINT}${encodeURI(objToParams(query))}`;

    try {
        sleep(GOOGLEPLACES_SLEEP_INTERVAL);
        const mapsResponse: AxiosResponse = await axios.get(requestStr);
        return mapsResponse;
    } catch (e) {
        console.error(`axios ${requestStr} failed`);
    }
    return;
};
