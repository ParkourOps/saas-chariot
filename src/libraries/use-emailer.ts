import EmailMessage from "@m/EmailMessage";
import { z } from "zod";
import { callFunc } from "@/libraries/firebase/call-func";
import type TemplatedEmailMessage from "@m/TemplatedEmailMessage";

export function useEmailer() {    
    async function send(message: z.infer<typeof EmailMessage>) {
        return await callFunc("sendEmail", message);
    }
    
    async function sendTemplated(
        message: z.infer<typeof TemplatedEmailMessage>
    ) {
        return await callFunc("sendTemplatedEmail", message);
    }

    return {
        send,
        sendTemplated
    }
}
