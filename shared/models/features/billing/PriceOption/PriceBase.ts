import {NonEmptyString, DateTime, Metadata} from "../../../";
import {z} from "zod";

const PriceBase = z.object({
    id: NonEmptyString,

    // Price descriptors:
    name: NonEmptyString.nullish(),
    description: NonEmptyString.nullish(),
    // Indicates if billed units are packaged/bundled/grouped:
    transformQuantity: z.object({
        divideBy: z.number(),
        round: z.union([
            z.literal("up"),
            z.literal("down"),
        ]),
    }).nullish(),

    // Timestamp and metadata:
    created: DateTime,
    metadata: Metadata,
});

export default PriceBase;
