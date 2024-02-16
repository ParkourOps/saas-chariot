import {z} from "zod";
import internalApiCall from "../../../../libraries/internal-api-call";
import {Url, NonEmptyString} from "../../../";

export default internalApiCall.declare(
    "getResource",
    "Get a resource from cloud storage.",
    "NO_AUTH",
    z.object({
        resourceKey: NonEmptyString,
    }),
    z.object({
        accessUrl: Url,
    })
);
