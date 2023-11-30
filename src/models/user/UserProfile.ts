import { z } from "zod";
import NonEmptyString from "../NonEmptyString";
import Email from "../Email";
import Timestamp from "../Timestamp";

export default z.object({
    userId: NonEmptyString,
    email: Email,
    signedUpAt: Timestamp,
    // lastSignedInAt: Timestamp
});
