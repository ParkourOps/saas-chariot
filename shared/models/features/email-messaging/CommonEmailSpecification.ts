import { NonEmptyString, ExpandedEmailAddress, DateTime } from "../..";
import {z} from "zod";

export default z.object({
    to: ExpandedEmailAddress.or(ExpandedEmailAddress.array()),
    cc: ExpandedEmailAddress.or(ExpandedEmailAddress.array()).nullish(),
    bcc: ExpandedEmailAddress.or(ExpandedEmailAddress.array()).nullish(),

    from: ExpandedEmailAddress,
    replyTo: ExpandedEmailAddress.nullish(),

    subject: NonEmptyString,
    sendAt: DateTime.nullish(),

    categories: NonEmptyString.array().nullish(),
});
