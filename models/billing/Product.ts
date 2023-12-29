import { z } from "zod";
import NonEmptyString from "../NonEmptyString";
import Timestamp from "../Timestamp";
import URL from "../URL";
import Count from "../Count";
import Decimal from "../Decimal";
import Metadata from "../Metadata";
import Boolean from "../Boolean";

const Price = z.object({
    id: NonEmptyString,

    type: z.union([
        z.literal("one_time"),
        z.literal("recurring")
    ]),
    
    // if recurring:
    recurring: z.object({
        aggregateUsage: z.union([
            z.literal("last_during_period"),
            z.literal("last_ever"),
            z.literal("max"),
            z.literal("sum"),
        ]).nullish(),
        interval: z.union([
            z.literal("day"),
            z.literal("week"),
            z.literal("month"),
            z.literal("year")
        ]),
        intervalCount: Count,
        usageType: z.union([
            z.literal("metered"),
            z.literal("licensed")
        ])
    }).nullish(),

    // billing scheme:
    //
    // – per_unit indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) 
    //   will be charged per unit in quantity (for prices with usage_type=licensed), 
    //   or per unit of total usage (for prices with usage_type=metered). 
    //
    // – tiered indicates that the unit pricing will be computed using a tiering strategy 
    //   as defined using the tiers and tiers_mode attributes.
    //
    billingScheme: z.union([
        z.literal("per_unit"),
        z.literal("tiered")
    ]),

    // per-unit pricing info:
    currencyCode: NonEmptyString,
    unitAmount: Count.nullish(),
    unitAmountDecimal: Decimal.nullish(),
    customUnitAmount: z.object({
        maximum: Count.nullish(),
        minimum: Count.nullish(),
        preset: Count.nullish()
    }).nullish(),
    // taxBehaviour: z.union([
    //     z.literal("exclusive"),
    //     z.literal("inclusive"),
    //     z.literal("unspecified"),
    // ]).nullish(),
    transformQuantity: z.object({
        divideBy: z.number(),
        round: z.union([
            z.literal("up"),
            z.literal("down")
        ])
    }).nullish(),    

    // tiered pricing info:
    //
    // – in volume-based tiering, the maximum quantity within a period determines the per unit price. 
    //
    // – in graduated tiering, pricing can change as the quantity grows.
    //
    tiersMode: z.union([
        z.literal("volume"),
        z.literal("graduated")
    ]).nullish(),
    tiers: z.object({
        flatAmount: Count.nullish(),
        flatAmountDecimal: z.number().gt(0).nullish(),
        unitAmount: Count.nullish(),
        unitAmountDecimal: z.number().gt(0).nullish(),
        upTo: Count.nullish()
    }).array().nullish(),

    // timestamps and metadata:
    created: Timestamp,
    metadata: Metadata
});

export default z.object({
    id: NonEmptyString,

    // product info"
    name: NonEmptyString,
    description: NonEmptyString.nullish(),
    images: URL.array(),
    features: z.object({
        name: NonEmptyString.nullish(),
    }).array(),
    unitLabel: NonEmptyString.nullish(), // Describes how you sell your product, e.g. seats, tiers. 
                                         // Appears on each line item. Appears on receipts, invoices, 
                                         // at checkout, and on the customer portal.

    // packaging / logistics info:
    shippable: Boolean.nullish(),
    packageDimensions: z.object({
        heightInches: Decimal,
        widthInches: Decimal,
        lengthInches: Decimal,
        weightOunces: Decimal
    }).nullish(),

    // invoice / receipt:
    statementDescriptor: NonEmptyString.nullish(), // Overrides default account descriptors. 
                                                   // Used for customers’ bank statements.

    // pricing:
    defaultPrice: Price,

    // timestamps and metadata:
    created: Timestamp,
    updated: Timestamp,
    metadata: Metadata
});
