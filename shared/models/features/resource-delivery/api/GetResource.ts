import {z} from "zod";
import internalApiCall from "../../../../libraries/internal-api-call";
import {Url, NonEmptyString} from "../../../";

export default internalApiCall.declare(
    "getResource",
    "Get a registered deliverable resource from cloud storage via a temporary download link.",
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
                accessUrl: Url,
            }),
        ]),
    })
);
