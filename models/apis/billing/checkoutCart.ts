import { z } from "zod";
import defineApiCall from "../define-api-call";
import Cart from "@m/billing/Cart";
import URL from "@m/URL";

export default defineApiCall({
    name: "checkout cart",
    description: "Create a Stripe URL to checkout items in a cart.",
    requiresAuth: true,
    request: z.object({
        cart: Cart                  // the cart to checkout
    }),
    successResponse: z.object({
        checkoutUrl: URL            // the checkout URL
    })
});
