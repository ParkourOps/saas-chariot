import { z } from "zod";
import defineApiCall from "../define-api-call";
import EmailAddress from "../../EmailAddress";
import NonEmptyString from "../../NonEmptyString";
import Timestamp from "../../Timestamp";

export default defineApiCall({
    name: "sendTextOnlyEmail",
    description: "Send a simple text email.",
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
        html: NonEmptyString.nullish(),
    
        categories: NonEmptyString.array().nullish()
    }),
    successResponse: z.object({
        sent: z.literal(true)
    })
});
