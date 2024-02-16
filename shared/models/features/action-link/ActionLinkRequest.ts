import {z} from "zod";
import {EmailAddress, NonEmptyString, Url} from "../..";
import Action from "./Action";

export default z.object({
    // email address of the customer requesting the action link
    email: EmailAddress,
    // the sequence of actions to perform when the link is clicked
    actionSequence: Action.array(),
    // prompt and call-to-action text to display in the email
    prompt: z.object({
        heading: NonEmptyString.nullish(),
        paragraph: NonEmptyString,
    }),
    callToActionText: NonEmptyString,
    // redirect URLs
    successUrl: Url,
    failUrl: Url,
});
