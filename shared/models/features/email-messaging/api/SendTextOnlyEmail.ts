import {z} from "zod";
import TextOnlyEmailSpec from "../../email-messaging/TextOnlyEmailSpecification";
import internalApiCall from "../../../../libraries/internal-api-call";

export default internalApiCall.declare(
    "sendTextOnlyEmail",
    "Send a simple text-only email message.",
    "NO_AUTH",
    TextOnlyEmailSpec,
    z.object({})
);
