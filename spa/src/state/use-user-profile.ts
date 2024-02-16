import subscribeToDoc from "@/libraries/firebase/subscribe-to-doc";
import UserProfile from "@/_shared_/models/features/user-authentication/UserProfile";

export default subscribeToDoc("User Profile", UserProfile, {
    base: "user",
    path: "",
});
