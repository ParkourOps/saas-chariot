import {z} from "zod";
import {NonEmptyString, DateTime, EmailAddress, Boolean} from "../../";

export default z.object({
    userId: NonEmptyString, // populated by auth, never changes
    signedUpAt: DateTime, // populated by auth, never changes

    email: EmailAddress, // populated by auth, then changed only via function
    emailVerified: Boolean, // populated by auth, then changed only via function

    displayName: NonEmptyString.nullish(),
});
