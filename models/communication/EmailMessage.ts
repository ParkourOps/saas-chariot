import { z } from "zod";
import EmailAddress from "../EmailAddress";
import NonEmptyString from "../NonEmptyString";
import Timestamp from "../Timestamp";

export default z.object({
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
});
