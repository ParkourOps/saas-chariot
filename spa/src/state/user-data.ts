import PurchasedItem from "@/_shared_/models/features/billing/PurchasedItem";
import UserProfile from "@/_shared_/models/features/user-authentication/UserProfile";
import subscribeToCollection from "@/libraries/firebase/subscribe-to-collection";
import subscribeToDoc from "@/libraries/firebase/subscribe-to-doc";

export default {
    userProfile: subscribeToDoc("User Profile", UserProfile, {
        base: "user",
        path: "",
    }),
    userPurchases: subscribeToCollection("User Purchases", PurchasedItem, {
        base: "customer",
        path: "purchase",
    }),
}
