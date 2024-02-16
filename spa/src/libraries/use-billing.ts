import useFunctions from "./firebase/use-functions";
import CreateCatalogue from "@/_shared_/models/features/billing/api/CreateCatalogue";
import CreateCheckoutSession from "@/_shared_/models/features/billing/api/CreateCheckoutSession";

export function useBilling() {
    const functions = useFunctions();
    return {
        getCatalogue: functions.createCaller(CreateCatalogue),
        getCheckoutUrl: functions.createCaller(CreateCheckoutSession),
    };
}
