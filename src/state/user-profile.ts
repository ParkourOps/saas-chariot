import { subscribeToDoc } from "@/libraries/firebase/subscribe-to-doc";
import UserProfile from "@m/user/Profile";

export const useUserProfile = subscribeToDoc("User Profile", UserProfile);
