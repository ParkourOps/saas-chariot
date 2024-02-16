import { z } from "zod";
import internalApiCall from "../../../../libraries/internal-api-call";
import ActionLinkRequest from "../ActionLinkRequest";

export default internalApiCall.declare(
    "sendActionLink",
    "Send action link to a customer.",
    "NO_AUTH",
    ActionLinkRequest,
    z.object({})
);
