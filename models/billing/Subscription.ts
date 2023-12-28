import Boolean from "@m/Boolean";
import Metadata from "@m/Metadata";
import NonEmptyString from "@m/NonEmptyString";
import Timestamp from "@m/Timestamp";
import { z } from "zod";
import Product from "./Product";
import Count from "@m/Count";

export default z.object({
    id: NonEmptyString,

    // order: 
    items: z.array(z.object({
        product: Product,
        quantity: Count
    })),

    // status:
    cancelAtPeriodEnd: Boolean,
    status: z.union([
        z.literal("incomplete"),
        z.literal("incomplete_expired"),
        z.literal("trialing"),
        z.literal("active"),
        z.literal("past_due"),
        z.literal("canceled"),
        z.literal("unpaid"),
    ]),

    // timestamps and metadata:
    startDate: Timestamp,

    currentPeriod: z.object({
        start: Timestamp,
        end: Timestamp
    }),

    trial: z.object({
        start: Timestamp,
        end: Timestamp
    }).nullish(),

    cancel_at: Timestamp.nullish(),
    canceled_at: Timestamp.nullish(),
    ended_at: Timestamp.nullish(),

    metadata: Metadata
});
