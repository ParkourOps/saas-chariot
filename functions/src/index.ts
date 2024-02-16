import "module-alias/register";

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

import {initializeApp} from "firebase-admin/app";
initializeApp();

// user-profile, auth-triggered
import createUserProfileOnSignup from "@/features/user-profile/auth-triggered/create-user-profile-on-signup";
export {createUserProfileOnSignup};

// email messaging, callable
import sendTextOnlyEmail from "@/features/email-messaging/send-text-only-email";
import sendTemplatedEmail from "@/features/email-messaging/send-templated-email";
export {sendTextOnlyEmail, sendTemplatedEmail};

// billing, callable
import createCatalogue from "@/features/billing/create-catalogue";
import createCheckoutSession from "@/features/billing/create-checkout-session";
export {createCatalogue, createCheckoutSession};
// billing, webhook endpoint
import onStripeEvent from "@/features/billing/on-stripe-event";
export {onStripeEvent};

// action links, callable
import sendActionLink from "@/features/action-link/send-action-link";
import handleActionLink from "./features/action-link/handle-action-link";
export {sendActionLink, handleActionLink};
