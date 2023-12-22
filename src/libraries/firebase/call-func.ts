import firebase from "./firebase";
import { httpsCallable, type HttpsCallableOptions } from "firebase/functions";

export function callFunc(name: string, data?: unknown, options?: HttpsCallableOptions) {
    return httpsCallable(firebase.funcs, name, options)(data);
}
