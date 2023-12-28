import EmailMessage from "@m/communication/EmailMessage";
import { z } from "zod";
import { callFunc } from "@/libraries/firebase/call-func";
import type TemplatedEmailMessage from "@m/communication/TemplatedEmailMessage";

export function useMessaging() {    
    async function sendTextEmail(message: z.infer<typeof EmailMessage>) {
        return await callFunc("sendEmail", message);
    }
    
    async function sendTemplatedEmail(
        message: z.infer<typeof TemplatedEmailMessage>
    ) {
        return await callFunc("sendTemplatedEmail", message);
    }

    return {
        email: {
            sendTextEmail,
            sendTemplatedEmail
        }
    }
}
