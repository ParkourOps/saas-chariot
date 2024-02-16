import {z} from "zod";
import { NonEmptyString, DateTime, NonNegativeInteger, Metadata } from "../../../";

export default z.object({
    id: NonEmptyString,
    currentPeriod: z.object({
        start: DateTime,
        end: DateTime,
    }),
    trial: z.object({
        start: DateTime,
        end: DateTime,
    }).nullish(),
    status: z.union([
        z.literal("incomplete"),
        z.literal("incomplete_expired"),
        z.literal("trialing"),
        z.literal("active"),
        z.literal("past_due"),
        z.literal("canceled"),
        z.literal("unpaid"),
    ]),
    billingCycleAnchor: DateTime,
    daysUntilDue: NonNegativeInteger.nullish(),
    cancellationDetails: z.discriminatedUnion(
        "reason",
        [
            z.object({
                reason: z.literal("cancellation_requested"),
                comment: NonEmptyString.nullish(),
                feedback: z.union([
                    z.literal("customer_service"),
                    z.literal("low_quality"),
                    z.literal("missing_features"),
                    z.literal("other"),
                    z.literal("switched_service"),
                    z.literal("too_complex"),
                    z.literal("too_expensive"),
                    z.literal("unused"),
                ]),
            }),
            z.object({
                reason: z.literal("payment_disputed"),
            }),
            z.object({
                reason: z.literal("payment_failed"),
            }),
        ]
    ),
    created: DateTime,
    started: DateTime,
    ended: DateTime.nullish(),
    canceled: DateTime.nullish(),
    metadata: Metadata,
});
