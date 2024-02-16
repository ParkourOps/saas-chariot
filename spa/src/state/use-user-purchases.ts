import subscribeToCollection from "@/libraries/firebase/subscribe-to-collection";
import PurchasedItem from "@/_shared_/models/features/billing/PurchasedItem";

export default subscribeToCollection("User Purchases", PurchasedItem, {
    base: "customer",
    path: "purchase",
});
