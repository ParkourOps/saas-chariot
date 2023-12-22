import {sendEmail as _sendEmail, sendTemplatedEmail as _sendTemplatedEmail} from "./emailer";
import {createUserProfileOnSignUp as _createUserProfileOnSignUp} from "./user";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// async function decodeToken(authHeader: string) {
//     try {
//         const token = authHeader.replace(/^bearer\s+/i, "");
//         const decodedToken = await auth().verifyIdToken(token);
//         return decodedToken;
//     } catch (e) {
//         logger.error("Could not extract or decode auth token from header.", {
//             authHeader
//         });
//     }
// }

export const sendEmail = _sendEmail;
export const sendTemplatedEmail = _sendTemplatedEmail;

export const createUserProfileOnSignUp = _createUserProfileOnSignUp;
