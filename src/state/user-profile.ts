import { subscribeToDoc } from "@/libraries/firebase/subscribe-to-doc";
import UserProfile from "@m/UserProfile";

export const useUserProfile = subscribeToDoc("User Profile", UserProfile);
