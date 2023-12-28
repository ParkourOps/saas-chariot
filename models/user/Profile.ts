import { z } from "zod";
import NonEmptyString from "../NonEmptyString";
import EmailAddress from "../EmailAddress";
import Timestamp from "../Timestamp";

export default z.object({
    userId: NonEmptyString,         // populated by auth, never changes
    
    email: EmailAddress,            // populated by auth, then updated in app (not implemented)
    emailVerified: z.boolean(),     // populated by auth, then updated by app (not implemented)

    name: NonEmptyString.nullish(), // populated by Stripe upon payment (customer's full name or business name)
    
    signedUpAt: Timestamp,
    lastSignedInAt: Timestamp
});
