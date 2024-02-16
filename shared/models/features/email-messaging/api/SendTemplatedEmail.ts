import {z} from "zod";
import TemplatedEmailSpec from "../TemplatedEmailSpecification";
import internalApiCall from "../../../../libraries/internal-api-call";

export default internalApiCall.declare(
    "sendTemplatedEmail",
    "Send an email message using a pre-installed *.mjml template.",
    "NO_AUTH",
    TemplatedEmailSpec,
    z.object({})
);
