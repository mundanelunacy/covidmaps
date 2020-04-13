import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { INCIDENTS, RETIRED_INCIDENTS, RETIRE_INCIDENTS_TIME_MS } from "../lib/constants";
import { noDupesInsert } from "../lib/lib";

// initialize Firestore
try {
    admin.initializeApp(functions.config().firebase);
} catch (e) {}

const db = admin.firestore();

export const retireIncidents = async (request: any, response: any) => {
    const twoWeeksAgoMs: number = Date.now() - RETIRE_INCIDENTS_TIME_MS;

    const snapshot = await db.collection(INCIDENTS).where("startTimestampMs", "<", twoWeeksAgoMs).get();
    const temp: any[] = [];

    snapshot.forEach((doc) => {
        temp.push({ id: doc.id, data: doc.data() });
    });

    const insertedIds: string[] = await Promise.all(
        temp.map(async (doc) => {
            const id = await noDupesInsert(RETIRED_INCIDENTS, doc.data);
            if (id) {
                await db.collection(INCIDENTS).doc(doc.id).delete();
            }
            return id;
        })
    );

    response.send(insertedIds.filter((value) => value));
};
