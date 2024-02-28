import UserProfile from "@/_shared_/models/features/user-authentication/UserProfile";
import {DocumentCollection} from "@/libraries/document-collection";
import ActionLinkRecord from "./_shared_/models/features/action-link/ActionLinkRecord";
import PurchasedItem from "./_shared_/models/features/billing/PurchasedItem";
// import MailingListRecord from "./_shared_/models/features/mailing-list/MailingListRecord";
// import DeliverableResourceRecord from "./_shared_/models/features/resource-delivery/DeliverableResourceRecord";

export const customer = DocumentCollection.declare("customer/{}", UserProfile);
export const customerPurchase = DocumentCollection.declare("customer/{}/purchase/{}", PurchasedItem);

export const actionLink = DocumentCollection.declare("action-link/{}", ActionLinkRecord);

// export const mailingList = DocumentCollection.declare("mailing-list/{}", MailingListRecord);
// export const deliverableResource = DocumentCollection.declare("deliverable-resource/{}", DeliverableResourceRecord);
