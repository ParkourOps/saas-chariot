import getRouteUrl from "@/utilities/get-route-url";
import { defineStore } from "pinia";
import { ref } from "vue";
import { type RouteLocationRaw } from "vue-router/auto";
import {
    type User,
    isSignInWithEmailLink,
    onAuthStateChanged,
    signInWithEmailLink,
    signOut,
    getAuth,
    // signInWithEmailAndPassword,
    // createUserWithEmailAndPassword,
} from "firebase/auth";
import {app} from "./firebase";
import { useFuncs } from "./funcs";
import SendSignInLink from "@/_shared_/models/features/user-authentication/api/SendSignInLink";

const auth = getAuth(app);
const functions = useFuncs();

const errors = {
    signInFromDifferentDeviceNotAllowed: Error("Signing in from a different device is not allowed!"),
    failedToGetSignInLink: Error("Failed to get sign in link."),
    invalidSignInLink: Error("Invalid sign in link."),
} as const;

const LOCAL_STORAGE_KEY__EMAIL = "emailForSignIn";
function getStoredSignInEmail() {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY__EMAIL) ?? undefined;
}
function setStoredSignInEmail(email?: string) {
    if (email) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY__EMAIL, email);
    } else {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY__EMAIL);
    }
}

async function sendSignInLink(email: string, redirect: RouteLocationRaw) {
    const sendSignInLink = functions.createCaller(SendSignInLink);
    // store email for future use
    setStoredSignInEmail(email);
    // get route path
    const redirectUrl = getRouteUrl(redirect);
    // send the link
    try {
        await sendSignInLink({
            email,
            redirectUrl,
        });
    } catch (e) {
        console.error(e);
        throw errors.failedToGetSignInLink;
    }
}

async function catchSignInWithLinkAttempt() {
    // get address of current page as login link
    const signInLink = window.location.href;
    // try login if link is valid
    if (isSignInWithEmailLink(auth, signInLink)) {
        console.debug("Sign in attempt detected...");
        const email = getStoredSignInEmail();
        if (!email) {
            // TODO: user signing in from different device, should confirm email to prevent session fixation attacks
            throw errors.signInFromDifferentDeviceNotAllowed;
        }
        try {
            await signInWithEmailLink(auth, email, signInLink);
        } catch (e) {
            console.error(e);
            throw errors.invalidSignInLink;
        }
    }
}

async function logout() {
    setStoredSignInEmail();
    await signOut(auth);
}

// async function signInWithPassword(email: string, password: string) {
//     await signInWithEmailAndPassword(auth, email, password);
// }

// async function sendPasswordResetLink(email: string) {
// // TO DO
// }

// async function createUserWithPassword(email: string, password: string) {
//     await createUserWithEmailAndPassword(auth, email, password);
// }

// async function sendEmailVerificationLink(route: RouteLocationRaw) {
// // TODO
// }

export const useAuth = defineStore("Auth", () => {
    const activeUser = ref<User>();

    // Subscribe to changes
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            activeUser.value = undefined;
            console.debug("Logged out.");
        } else {
            activeUser.value = user;
            console.debug("Logged in: " + user.email);
        }
    });

    return {
        activeUser,
        signInWithLink: {
            sendLink: sendSignInLink,
            getStoredEmail: getStoredSignInEmail,
            catchAttempt: catchSignInWithLinkAttempt,
        },
        errors,
        logout,
    };
});
