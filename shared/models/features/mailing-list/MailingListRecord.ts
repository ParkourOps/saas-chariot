/*
    A Mailing List Record describes a mailing list and catalogues its subscribers.
    Mailing List Records are stored in the collection: mailing-list/{}
*/

import {z} from "zod";
import {EmailAddress, NonEmptyString} from "../..";

export default z.object({
    subscriberEmails: EmailAddress.array(),
    title: NonEmptyString,
    description: NonEmptyString.nullish(),
});
