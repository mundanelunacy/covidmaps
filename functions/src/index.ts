import * as functions from "firebase-functions";
import { naverImport, getGooglePlace, adHoc1159 } from "./countries/korea/parser";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

export const scrapeKoreanData = functions.https.onRequest(naverImport);
export const importKoreanData = functions.https.onRequest(getGooglePlace);
