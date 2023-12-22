import { z } from "zod";
import Email from "./Email";
import NonEmptyString from "./NonEmptyString";
import Timestamp from "./Timestamp";

export default z.object({
    to: Email.or(Email.array()),
    cc: Email.or(Email.array()).nullish(),
    bcc: Email.or(Email.array()).nullish(),

    from: Email,
    replyTo: Email.nullish(),

    subject: NonEmptyString,
    sendAt: Timestamp.nullish(),

    text: NonEmptyString,
    html: NonEmptyString.nullish(),

    categories: NonEmptyString.array().nullish()
});
