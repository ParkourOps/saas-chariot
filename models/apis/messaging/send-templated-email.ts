import { z } from "zod";
import defineApiCall from "../define-api-call";
import EmailAddress from "../../EmailAddress";
import NonEmptyString from "../../NonEmptyString";
import Timestamp from "../../Timestamp";

export default defineApiCall({
    name: "sendTemplatedEmail",
    description: "Send an email using a pre-installed *.mjml template.",
    requiresAuth: true,
    request: z.object({
        to: EmailAddress.or(EmailAddress.array()),
        cc: EmailAddress.or(EmailAddress.array()).nullish(),
        bcc: EmailAddress.or(EmailAddress.array()).nullish(),
    
        from: EmailAddress,
        replyTo: EmailAddress.nullish(),
    
        subject: NonEmptyString,
        sendAt: Timestamp.nullish(),
    
        text: NonEmptyString,
        
        templateName: NonEmptyString,
        templateSubstitutions: z.record(z.string(), z.unknown()),
    
        categories: NonEmptyString.array().nullish()
    }),
    successResponse: z.object({
        sent: z.literal(true)
    })
});
