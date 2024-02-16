import {z} from "zod";
import { NonEmptyString } from "../../";

export default z.discriminatedUnion(
    "type",
    [
        z.object({
            type: z.literal("issueResource"),
            resourceKey: NonEmptyString,
        }),
        z.object({
            type: z.literal("subscribeToMailingList"),
            mailingListKey: NonEmptyString,
        }),
        z.object({
            type: z.literal("unsubscribeFromMailingList"),
            mailingListKey: NonEmptyString,
        }),
    ]
);
