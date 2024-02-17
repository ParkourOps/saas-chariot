import { funcs } from "./firebase";
import { httpsCallable, type HttpsCallableOptions } from "firebase/functions";
import { type UnknownKeysParam, type ZodRawShape, type ZodTypeAny, type objectOutputType } from "zod";
import internalApiCall from "@/_shared_/libraries/internal-api-call";

// export function call<
//     // API call specification
//     CallName extends string,
//     CallDescription extends string,
//     CallRequiresAuth extends "AUTH_REQUIRED" | "NO_AUTH",
//     // request data
//     CallRequestDataShape extends ZodRawShape,
//     CallRequestDataUnknownKeys extends UnknownKeysParam,
//     CallRequestDataCatchAll extends ZodTypeAny,
//     // response data
//     CallResponseDataShape extends ZodRawShape,
//     CallResponseDataUnknownKeys extends UnknownKeysParam,
//     CallResponseDataCatchAll extends ZodTypeAny,
// >(
//     apiCall: ApiCall<
//         CallName,
//         CallDescription,
//         CallRequiresAuth,
//         // request data
//         CallRequestDataShape,
//         CallRequestDataUnknownKeys,
//         CallRequestDataCatchAll,
//         // response data
//         CallResponseDataShape,
//         CallResponseDataUnknownKeys,
//         CallResponseDataCatchAll
//     >,
//     requestData: objectOutputType<CallRequestDataShape, CallRequestDataCatchAll, CallRequestDataUnknownKeys>,
//     callOptions?: HttpsCallableOptions
// ) {
//         return httpsCallable(firebase.funcs, apiCall.name, callOptions)(requestData);
// }

function createCaller<
    // API call specification
    CallName extends string,
    CallDescription extends string,
    CallRequiresAuth extends "AUTH_REQUIRED" | "NO_AUTH",
    // request data
    CallRequestDataShape extends ZodRawShape,
    CallRequestDataUnknownKeys extends UnknownKeysParam,
    CallRequestDataCatchAll extends ZodTypeAny,
    // response data
    CallResponseDataShape extends ZodRawShape,
    CallResponseDataUnknownKeys extends UnknownKeysParam,
    CallResponseDataCatchAll extends ZodTypeAny,
>(
    apiCall: ReturnType<
        typeof internalApiCall.declare<CallName, CallDescription, CallRequiresAuth, CallRequestDataShape, CallRequestDataUnknownKeys, CallRequestDataCatchAll, CallResponseDataShape, CallResponseDataUnknownKeys, CallResponseDataCatchAll>
    >,
    callOptions?: HttpsCallableOptions,
) {
    return async function (requestData: objectOutputType<CallRequestDataShape, CallRequestDataCatchAll, CallRequestDataUnknownKeys>) {
        const rawSuccessResponse = (await httpsCallable(funcs, apiCall.name, callOptions)(requestData)).data;
        return apiCall.response.parse(rawSuccessResponse);
    };
}

export function useFuncs() {
    return {
        createCaller,
    };
}
