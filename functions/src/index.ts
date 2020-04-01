import * as functions from "firebase-functions";
import axios from "axios";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const importKoreanData = functions.https.onRequest(async (request, response) => {
    const original: any = await axios.get("https://coronamap.site/javascripts/ndata.js");

    console.log(original.data);
});
