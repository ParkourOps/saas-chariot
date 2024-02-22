import {user} from "firebase-functions/v1/auth";
import {firestore} from "firebase-admin";
import UserProfile from "@/_shared_/models/features/user-authentication/UserProfile";
import DateTime from "@/_shared_/libraries/date-time";
import withSchema from "@/_shared_/libraries/with-schema";
import ServerlessFunctionError from "@/libraries/serverless-function-error";

export default user().onCreate(async (user/* , context */)=>{
    // create User Profile object
    let userProfile = withSchema.declareVar(UserProfile);
    try {
        userProfile = withSchema.declareConst(UserProfile, {
            userId: user.uid,
            signedUpAt: DateTime.utcFromDate(new Date(user.metadata.creationTime)).toJSON(),
            email: user.email ?? "",
            emailVerified: user.emailVerified,
        });
    } catch (e) {
        return ServerlessFunctionError.createFromException(
            undefined,
            e,
            "internal",
            "Could not create user profile on registration: could not parse user data.",
            {
                inputVariables: {
                    user,
                },
            }
        ).log();
    }
    // store User Profile object
    const documentPath = `customer/${userProfile.email}`;
    try {
        return firestore().doc(documentPath).set(userProfile);
    } catch (e) {
        return ServerlessFunctionError.createFromException(
            undefined,
            e,
            "internal",
            "Could not create user profile on registration: could not write user profile to document store.",
            {
                inputVariables: {
                    user,
                },
                intermediateVariables: {
                    documentPath,
                    userProfile,
                },
            }
        ).log();
    }
});
