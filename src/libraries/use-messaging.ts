import TextOnlyEmailMessage from "@m/apis/messaging/send-text-only-email";
import TemplatedEmailMessage from "@m/apis/messaging/send-templated-email";
import { funcCaller } from "@/libraries/firebase/functions";

export function useMessaging() {    
    return {
        email: {
            sendTextOnlyEmail: funcCaller(TextOnlyEmailMessage),
            sendTemplatedEmail: funcCaller(TemplatedEmailMessage)
        }
    }
}
