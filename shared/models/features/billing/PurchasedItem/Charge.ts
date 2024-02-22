import {z} from "zod";
import {NonEmptyString, DateTime, Boolean, Url, Metadata} from "../../../";

export default z.object({
    id: NonEmptyString,
    refunded: Boolean,
    paid: Boolean,
    receipt: z.object({
        number: NonEmptyString,
        webpageUrl: Url,
    }).nullish(),
    created: DateTime,
    metadata: Metadata,
});
