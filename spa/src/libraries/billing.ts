import useFunctions from "./firebase/use-functions";
import CreateCatalogue from "@/_shared_/models/features/billing/api/CreateCatalogue";
import CreateCheckoutSession from "@/_shared_/models/features/billing/api/CreateCheckoutSession";

const functions = useFunctions();

export const getCatalogue = functions.createCaller(CreateCatalogue);
export const getCheckoutUrl = functions.createCaller(CreateCheckoutSession);

