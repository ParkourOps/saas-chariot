import {z} from "zod";
import internalApiCall from "../../../../libraries/internal-api-call";
import {NonEmptyString, Url} from "../../../";

export default internalApiCall.declare(
    "getResourceInfo",
    "Get information about a registered deliverable resource.",
    "NO_AUTH",
    z.object({
        resourceKey: NonEmptyString,
    }),
    z.object({
        result: z.discriminatedUnion("type", [
            z.object({
                type: z.literal("not_found"),
            }),
            z.object({
                type: z.literal("found"),
                title: NonEmptyString,
                description: NonEmptyString.nullish(),
                thumbnails: Url.array().nullish(),
            }),
        ]),
    })
);
