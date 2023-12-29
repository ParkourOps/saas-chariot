import { z } from "zod";
import defineApiCall from "../define-api-call";
import NonEmptyString from "@m/NonEmptyString";
import Subscription from "@m/billing/Subscription";

export default defineApiCall({
    name: "get active subscriptions",
    description: "Get active subscriptions for the given customer.",
    requiresAuth: true,
    request: z.object({
        sessionId: NonEmptyString.nullish()         // only fetch subscriptions that were checked out in the given sessionId
    }),
    successResponse: z.object({
        forSessionId: NonEmptyString.nullish(),     // only fetch subscriptions that were checked out in the given sessionId
        activeSubscriptions: Subscription.array()
    })
});
