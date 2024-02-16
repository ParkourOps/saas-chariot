import getRouteUrl from "@/utilities/get-route-url";
import { defineStore } from "pinia";
import { ref } from "vue";
import { type RouteLocationRaw } from "vue-router";
import {
    type User,
    isSignInWithEmailLink,
    onAuthStateChanged,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    applyActionCode as _applyActionCode,
} from "firebase/auth";
import firebase from "./firebase";

const auth = firebase.auth;

export default defineStore("Auth", () => {
    const activeUser = ref<User>();
    const LOCAL_STORAGE_KEY_EMAIL = "emailForSignIn";

    async function sendLoginLink(email: string, linkRedirect: RouteLocationRaw) {
        // store email for future use
        window.localStorage.setItem(LOCAL_STORAGE_KEY_EMAIL, email);
        // get route path
        const redirectURL = getRouteUrl(linkRedirect);
        // send the link
        await sendSignInLinkToEmail(auth, email, {
            url: redirectURL,
            // this must always be true:
            handleCodeInApp: true,
        });
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
    }

    async function signInWithPassword(email: string, password: string) {
        await signInWithEmailAndPassword(firebase.auth, email, password);
    }

    async function sendPasswordResetLink(email: string) {
        await sendPasswordResetEmail(firebase.auth, email);
    }

    async function createUserWithPassword(email: string, password: string) {
        await createUserWithEmailAndPassword(firebase.auth, email, password);
    }

    async function sendEmailVerificationLink(route: RouteLocationRaw) {
        if (!activeUser.value) {
            console.error("User must be signed in to send email verification link.");
            return;
        }
        await sendEmailVerification(activeUser.value, {
            url: getRouteUrl(route),
        });
    }

    async function applyActionCode(actionCode: string) {
        return await _applyActionCode(firebase.auth, actionCode);
    }

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
            sendLoginLink,
            catchLoginAttempt,
        },
        signInWithPassword: {
            createUserWithPassword,
            signInWithPassword,
            sendPasswordResetLink,
        },
        logout,
        sendEmailVerificationLink,
        applyActionCode,
    };
});
