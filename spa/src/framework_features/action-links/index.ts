import {useFuncs} from "@/libraries/firebase/funcs";
import SendActionLink from "@/_shared_/models/features/action-link/api/SendActionLink";

const functions = useFuncs();

export const sendActionLink = functions.createCaller(SendActionLink);

