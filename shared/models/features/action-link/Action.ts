import {z} from "zod";
import {NonEmptyString} from "../../";

export default z.discriminatedUnion(
    "type",
    [
        z.object({
            type: z.literal("issue_resource"),
            resourceKey: NonEmptyString,
        }),
        z.object({
            type: z.literal("subscribe_to_mailing_list"),
            mailingListKey: NonEmptyString,
        }),
        z.object({
            type: z.literal("unsubscribe_from_mailing_list"),
            mailingListKey: NonEmptyString,
        }),
    ]
);
