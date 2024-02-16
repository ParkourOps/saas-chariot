import {z} from "zod";
import Cart from "../../billing/Cart";
import {Url, NonNegativeInteger} from "../../../"
import internalApiCall from "../../../../libraries/internal-api-call";

export default internalApiCall.declare(
    "createCheckoutSession",
    "Create a Stripe Checkout URL to allow customer to pay for items in the cart.",
    "NO_AUTH",
    z.object({
        cart: Cart, // the cart to create checkout session for
        successUrl: Url, // URL to navigate to when checkout session is successful
        cancelUrl: Url.nullish(), // URL to navigate to when checkout session has been cancelled,
        subscriptionSettings: z.object({
            trialPeriodInDays: NonNegativeInteger.min(
                1,
                "Trial period (in days) must be greater than or equal to one day."
            ).nullish(),
            missingPaymentBehaviour: z.union([
                z.literal("cancel_subscription"),
                z.literal("pause_subscription"),
                z.literal("create_invoice"),
            ]),
        }).nullish(),
    }),
    z.object({
        checkoutUrl: Url, // the URL to navigate to, to access the checkout session
    }),
);
