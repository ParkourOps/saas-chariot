import { subscribeToDoc } from "@/libraries/firebase";
import UserProfile from "@/models/user/UserProfile";

export const useUserProfile = subscribeToDoc("User Profile", UserProfile);
