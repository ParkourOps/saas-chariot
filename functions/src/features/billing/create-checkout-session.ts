import CreateCheckoutSession from "@/_shared_/models/features/billing/api/CreateCheckoutSession";
import {getCheckoutUrl, getCustomerByEmail} from "../../services/stripe";
import internalApiCall from "@/libraries/internal-api-call";

export default internalApiCall.implement(CreateCheckoutSession)(async (request)=>{
    const customerId = await (async ()=>{
        // if customer email address is not available (they have not logged in), continue without identity
        const userEmail = request.auth?.user.email;
        if (!userEmail) {
            return;
        }
        // otherwise, retrieve customer's identity
        const findStripeCustomerResult = await getCustomerByEmail(request.correlationId, userEmail);
        if (!findStripeCustomerResult.success) {
            throw findStripeCustomerResult.error;
        } else {
            return findStripeCustomerResult.data?.id;
        }
    })();

    const getCheckoutUrlResult = await getCheckoutUrl(
        request.correlationId,
        request.data.cart,
        request.data.successUrl,
        request.data.cancelUrl ?? undefined,
        request.data.subscriptionSettings ? {
            trialPeriodInDays: request.data.subscriptionSettings.trialPeriodInDays ?? undefined,
            missingPaymentBehaviour: (()=>{
                switch (request.data.subscriptionSettings.missingPaymentBehaviour) {
                case "cancel_subscription":
                    return "cancel";
                case "pause_subscription":
                    return "pause";
                case "create_invoice":
                    return "create_invoice";
                }
            })(),
        } : undefined,
        customerId
    );
    if (!getCheckoutUrlResult.success) {
        throw getCheckoutUrlResult.error;
    }
    return {
        checkoutUrl: getCheckoutUrlResult.data.checkoutUrl,
    };
});
