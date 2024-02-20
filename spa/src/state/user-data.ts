import PurchasedItem from "@/_shared_/models/features/billing/PurchasedItem";
import UserProfile from "@/_shared_/models/features/user-authentication/UserProfile";
import {useDb}from "@/libraries/firebase/db";

const db = useDb();

export default {
    userProfile: db.subscribeToDoc("User Profile", UserProfile, {
        base: "user",
        path: "",
    }),
    userPurchases: db.subscribeToCollection("User Purchases", PurchasedItem, {
        base: "customer",
        path: "purchase",
    }),
};
