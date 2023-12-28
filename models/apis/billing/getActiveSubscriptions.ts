import { z } from "zod";
import defineApiCall from "../define-api-call";
import NonEmptyString from "@m/NonEmptyString";
import Subscription from "@m/billing/Subscription";

export default defineApiCall({
    name: "get active subscriptions",
    description: "Get active subscriptions for the given customer.",
    request: z.object({
        userId: NonEmptyString
    }),
    successResponse: z.object({
        activeSubscriptions: Subscription.array()
    })
});
