/*
    A Mailing List Record describes a mailing list and catalogues its subscribers.
    Mailing List Records are stored in the collection: mailing-list/{}
*/
import {z} from "zod";
import {NonEmptyString} from "../..";

export default z.object({
    path: NonEmptyString,
    title: NonEmptyString.nullish(),
    description: NonEmptyString.nullish(),
});

// import {z} from "zod";
// import MailingListRecord from "@/_shared_/models/features/mailing-list/MailingListRecord";
// import {mailingList} from "@/document-collections";

// const MailingListSpec = MailingListRecord.omit({subscriberEmails: true});
// type MailingListSpec = z.infer<typeof MailingListSpec>;
// type MailingListDirectory = {
//     [key: string]: MailingListSpec,
// };

// const declareMailingLists = async (directory: MailingListDirectory) => {
//     for (const [key, val] of Object.entries(directory)) {
//         await mailingList.setDoc(undefined, [key], {
//             title: val.title,
//             description: val.description,
//             subscriberEmails: [],
//         });
//     }
// };

// declareMailingLists({
//     "kbozgt": {
//         title: "Waiting List",
//     },
// });
