// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import configs from "@/configs";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const app = initializeApp(configs.firebase);
export const funcs = getFunctions(app);

(() => {
    const useEmulator = import.meta.env.VITE_FIREBASE_USE_EMULATOR.toLowerCase();
    if (/(true|yes|t|y)/.test(useEmulator)) {
        connectFunctionsEmulator(funcs, "127.0.0.1", 5001);
        console.debug("Connected to local Firebase emulator.");
    }
})();
