import {z} from "zod";
import internalApiCall from "../../../../libraries/internal-api-call";
import {Url, EmailAddress} from "../../../";

export default internalApiCall.declare(
    "sendSignInLink",
    "Send a sign-in link to the user's email address.",
    "NO_AUTH",
    z.object({
        email: EmailAddress,
        redirectUrl: Url,
    }),
    z.object({}),
);
