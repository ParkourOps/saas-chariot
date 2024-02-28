import {user} from "firebase-functions/v1/auth";
import UserProfile from "@/_shared_/models/features/user-authentication/UserProfile";
import DateTime from "@/_shared_/libraries/date-time";
import withSchema from "@/_shared_/libraries/with-schema";
import ServerlessFunctionError from "@/libraries/serverless-function-error";
import {customer} from "@/document-collections";

export default user().onCreate(async (user/* , context */)=>{
    // create User Profile object
    let userProfile = withSchema(UserProfile).instantiateVar();
    try {
        userProfile = withSchema(UserProfile).instantiateConst({
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
    try {
        await customer.setDoc(undefined, [userProfile.email], userProfile);
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
                    userProfile,
                },
            }
        ).log();
    }
});
