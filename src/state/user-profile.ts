import { subscribeToDoc } from "@/libraries/firebase/subscribe-to-doc";
import UserProfile from "@/models/user/UserProfile";

export const useUserProfile = subscribeToDoc("User Profile", UserProfile);
