import {z} from "zod";
import {NonEmptyString, DateTime, Url, Metadata} from "../..";
import PriceOption from "./PriceOption";

export default z.object({
    product: z.object({
        // Product identifier:
        id: NonEmptyString,
        // Product information:
        name: NonEmptyString,
        description: NonEmptyString.nullish(),
        images: Url.array(),
        features: NonEmptyString.array(),
        // Describes how you sell your product, e.g. seats, tiers.
        // Appears on each line item. Appears on receipts, invoices,
        // at checkout, and on the customer portal.
        unitLabel: NonEmptyString.nullish(),
        // Overrides default account descriptors.
        // Used for customers’ bank statements.
        statementDescriptor: NonEmptyString.nullish(),
        // Product timestamps and metadata:
        created: DateTime,
        updated: DateTime,
        metadata: Metadata,
    }),

    // Prices:
    priceOptions: PriceOption.array(),
});
