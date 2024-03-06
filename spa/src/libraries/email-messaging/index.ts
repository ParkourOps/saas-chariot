import {useFuncs} from "@/libraries/firebase/funcs";
import SendTemplatedEmail from "@/_shared_/models/features/email-messaging/api/SendTemplatedEmail";
import SendTextOnlyEmail from "@/_shared_/models/features/email-messaging/api/SendTextOnlyEmail";

const functions = useFuncs();

export const sendTemplatedEmail = functions.createCaller(SendTemplatedEmail);
export const sendTextOnlyEmail = functions.createCaller(SendTextOnlyEmail);
