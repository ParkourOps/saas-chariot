import * as logger from "firebase-functions/logger";
import {user} from "firebase-functions/v1/auth";
import {initializeApp} from "firebase-admin/app";
import {firestore} from "firebase-admin";
import UserProfile from "../../../models/UserProfile";
import {z} from "zod";

initializeApp();

export const createUserProfileOnSignUp =
  user().onCreate(async (user/* , context */)=>{
    // extract user information
    const rawProfileData : z.infer<typeof UserProfile> = {
      userId: user.uid,
      email: user.email as string,
      emailVerified: user.emailVerified,
      signedUpAt: new Date(user.metadata.creationTime).toISOString(),
      // lastSignedInAt: new Date(user.metadata.lastSignInTime).toISOString()
    };
    // make profile object
    const parseResult = UserProfile.safeParse(rawProfileData);
    if (!parseResult.success) {
      logger.error("Failed to parse user data from request.", {
        function: "createUserProfileOnSignUp",
        input: rawProfileData,
        details: parseResult.error.errors,
      });
      return;
    }
    // store
    const userProfile = parseResult.data;
    try {
      return firestore().doc(`user/${userProfile.userId}`).set(userProfile);
    } catch (e) {
      logger.error("Failed to store user profile in Firestore.", {
        function: "createUserProfileOnSignUp",
        details: e,
      });
      return;
    }
  });
