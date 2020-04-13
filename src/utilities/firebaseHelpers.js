import hash from "object-hash";
import { INCIDENTS } from "../config/firebaseCollections";

export const insertNoDupes = async (obj, collection, firebase) => {
    const colRef = firebase.firestore().collection(collection);
    const docId = hash(obj);

    if (colRef.doc(docId).get().exists) {
        return "";
    }

    await colRef.doc(docId).set(obj);

    return docId;
};

export const getIncident = async (docId, firebase) => {
    const doc = await firebase.firestore().collection(INCIDENTS).doc(docId).get();
    return doc.data();
};
