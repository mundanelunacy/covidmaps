import * as functions from "firebase-functions";
import { naverImport, getGooglePlace as importKRData } from "./countries/korea/parser";
import { arcgisImport, getGooglePlace as importISData } from "./countries/isreal/parser";
import { retireIncidents as ri } from "./maintainance/retireIncidents";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

const maxRuntimeOpts = {
    timeoutSeconds: 540,
};

export const scrapeKoreanData = functions.https.onRequest(naverImport);
export const scrapeIsraelData = functions.https.onRequest(arcgisImport);
export const importKoreanData = functions.runWith(maxRuntimeOpts).https.onRequest(importKRData);
export const importIsrealData = functions.runWith(maxRuntimeOpts).https.onRequest(importISData);
export const retireIncidents = functions.https.onRequest(ri);
