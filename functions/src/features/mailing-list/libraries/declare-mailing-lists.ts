import {z} from "zod";
import MailingListRecord from "@/_shared_/models/features/mailing-list/MailingListRecord";

const MailingListSpec = MailingListRecord.omit({subscriberEmails: true});
type MailingListSpec = z.infer<typeof MailingListSpec>;
type MailingListDirectory = {
    [key: string]: MailingListSpec,
};

const declareMailingLists = (directory: MailingListDirectory) => directory;

export default declareMailingLists;
