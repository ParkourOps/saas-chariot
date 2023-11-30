import getFullPathOfRoute from "@/utilities/getFullPathOfRoute";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import { type User, isSignInWithEmailLink, onAuthStateChanged, sendSignInLinkToEmail, signInWithEmailLink, signOut } from "firebase/auth";
import firebase from "./firebase";

const auth = firebase.auth;

export const useAuth = defineStore("Auth", ()=>{
    const router = useRouter();
    const activeUser = ref<User>();
    const LOCAL_STORAGE_KEY_EMAIL = "emailForSignIn";

    async function sendLoginLink(email: string, linkRedirect: RouteLocationRaw) {
        // store email for future use
        window.localStorage.setItem(LOCAL_STORAGE_KEY_EMAIL, email);
        // get route path
        const redirectURL = getFullPathOfRoute(linkRedirect);
        // send the link
        await sendSignInLinkToEmail(auth, email, {
            url: redirectURL,
            // this must always be true:
            handleCodeInApp: true
        })
    }

    async function catchLoginAttempt() {
        // get address of current page as login link
        const signInLink = window.location.href;
        // try login if link is valid
        if (isSignInWithEmailLink(auth, signInLink)) {
            console.debug("Sign in attempt detected...");
            const email = window.localStorage.getItem(LOCAL_STORAGE_KEY_EMAIL);
            if (!email) {
                console.debug("Signing in from different device is not allowed or supported (yet).");
                // TODO: user signing in from different device, should confirm email to prevent session fixation attacks
                return;
            }
            await signInWithEmailLink(auth, email, signInLink);
        }
    }
    
    async function logout() {
        await signOut(auth);
        await router.push({name: 'getSignInLink'})
    }

    // Subscribe to changes
    onAuthStateChanged(auth, (user)=>{
        if (!user) {
            activeUser.value = undefined;
            console.debug("Logged out");
        } else {
            activeUser.value = user;
            console.debug("Logged in: " + user.email);
        }
    })
    
    return {
        activeUser,
        sendLoginLink,
        catchLoginAttempt,
        logout
    }
});
