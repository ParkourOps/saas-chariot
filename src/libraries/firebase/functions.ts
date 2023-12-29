import type { ApiCall } from "@m/apis/define-api-call";
import firebase from "./firebase";
import { httpsCallable, type HttpsCallableOptions } from "firebase/functions";
import { z } from "zod";

export function callFunc<
    A extends z.ZodRawShape,
    B extends z.UnknownKeysParam,
    C extends z.ZodTypeAny,
    D,
    E extends z.ZodRawShape,
    F extends z.UnknownKeysParam,
    G extends z.ZodTypeAny,
    H
>(apiCall: ApiCall<A,B,C,D,E,F,G,H>, requestData: D, callOptions?: HttpsCallableOptions) {
    return httpsCallable(firebase.funcs, apiCall.name, callOptions)(requestData);
}

export function funcCaller<
    A extends z.ZodRawShape,
    B extends z.UnknownKeysParam,
    C extends z.ZodTypeAny,
    D,
    E extends z.ZodRawShape,
    F extends z.UnknownKeysParam,
    G extends z.ZodTypeAny,
    H
>(apiCall: ApiCall<A,B,C,D,E,F,G,H>, callOptions?: HttpsCallableOptions) {
    return (requestData: D) => httpsCallable(firebase.funcs, apiCall.name, callOptions)(requestData);
}
