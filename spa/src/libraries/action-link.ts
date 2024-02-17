import useFunctions from "@/libraries/firebase/use-functions";
import SendActionLink from "@/_shared_/models/features/action-link/api/SendActionLink";

const functions = useFunctions();

export const sendActionLink = functions.createCaller(SendActionLink);

