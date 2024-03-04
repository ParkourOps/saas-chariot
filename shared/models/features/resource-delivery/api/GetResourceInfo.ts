import {z} from "zod";
import internalApiCall from "../../../../libraries/internal-api-call";
import {NonEmptyString} from "../../../";

export default internalApiCall.declare(
    "getResourceInfo",
    "Get information about a registered deliverable resource.",
    "NO_AUTH",
    z.object({
        resourceKey: NonEmptyString,
    }),
    z.object({
        title: NonEmptyString,
        description: NonEmptyString.nullish(),
    }),
);
