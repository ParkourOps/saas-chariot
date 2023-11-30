/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from "firebase-functions/logger";
import {user} from "firebase-functions/v1/auth";
import {initializeApp} from "firebase-admin/app";
import {firestore} from "firebase-admin";
import UserProfile from "../../src/models/user/UserProfile";

initializeApp();

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

export const createUserProfileOnSignUp =
    user().onCreate(async (user, context)=>{
      // extract user information
      const rawProfileData = {
        userId: user.uid,
        email: user.email,
        signedUpAt: new Date(user.metadata.creationTime).toISOString(),
        // lastSignInTime: new Date(user.metadata.lastSignInTime).toISOString();
      };
      // make profile object
      const parseResult = UserProfile.safeParse(rawProfileData);
      if (!parseResult.success) {
        logger.error("Failed to parse user data from request.", {
          input: rawProfileData,
          zodErrors: parseResult.error.errors,
        });
        return;
      }
      // store
      const userProfile = parseResult.data;
      try {
        return firestore().doc(`user/${userProfile.userId}`).set(userProfile);
      } catch (e) {
        logger.error("Failed to store user profile in Firestore.", {
          error: e,
        });
        return;
      }
    });
