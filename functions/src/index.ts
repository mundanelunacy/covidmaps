import * as functions from "firebase-functions";
import { naverImport, getGooglePlace } from "./countries/korea/parser";
import { arcgisImport, getGooglePlace as importISData } from "./countries/isreal/parser";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

export const scrapeKoreanData = functions.https.onRequest(naverImport);
export const importKoreanData = functions.https.onRequest(getGooglePlace);
export const scrapeIsraelData = functions.https.onRequest(arcgisImport);
export const importIsrealData = functions.https.onRequest(importISData);
