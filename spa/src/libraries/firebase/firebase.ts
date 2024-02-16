// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import configs from "@/configs";
import { getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(configs.firebase);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const funcs = getFunctions(app);

(() => {
    const useEmulator = import.meta.env.VITE_FIREBASE_USE_EMULATOR.toLowerCase();
    if (/(true|yes|t|y)/.test(useEmulator)) {
        connectFunctionsEmulator(funcs, "127.0.0.1", 5001);
        console.debug("Connected to local Firebase emulator.");
    }
})();

export default { app, auth, db, analytics, funcs };
