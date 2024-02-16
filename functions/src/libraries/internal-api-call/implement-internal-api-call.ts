import {onCall} from "firebase-functions/v2/https";
import {UnknownKeysParam, ZodRawShape, ZodTypeAny, objectOutputType} from "zod";
import uniqueId from "@/_shared_/libraries/unique-id";
import internalApiCall from "@/_shared_/libraries/internal-api-call";
import ServerlessFunctionError from "../serverless-function-error";

type RequestAuth = {
    user: {
        id: string,
        email: string,
    }
};

type HandlerRequestAuth<CallRequiresAuth extends "AUTH_REQUIRED" | "NO_AUTH"> =
    CallRequiresAuth extends "AUTH_REQUIRED" ? RequestAuth : (RequestAuth | undefined)
;

export default function<
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
    specification: ReturnType<typeof internalApiCall.declare<
        CallName,
        CallDescription,
        CallRequiresAuth,
        CallRequestDataShape,
        CallRequestDataUnknownKeys,
        CallRequestDataCatchAll,
        CallResponseDataShape,
        CallResponseDataUnknownKeys,
        CallResponseDataCatchAll
    >>
) {
    return function(
        handler: (
            request: {
                correlationId: string,
                info: {
                    name: CallName,
                    description: CallDescription,
                },
                data: objectOutputType<
                    CallRequestDataShape,
                    CallRequestDataCatchAll,
                    CallRequestDataUnknownKeys
                >,
                auth: HandlerRequestAuth<CallRequiresAuth>
            }
        ) => Promise<objectOutputType<CallResponseDataShape, CallResponseDataCatchAll, CallResponseDataUnknownKeys>>
    ) {
        return onCall<
            objectOutputType<
                CallRequestDataShape,
                CallRequestDataCatchAll,
                CallRequestDataUnknownKeys
            >
        >(async (request) => {
            const correlationId = `apiCall:${specification.name}:${uniqueId.create()}`;
            try {
                // check if authorised
                if (
                    (specification.authRequired === "AUTH_REQUIRED") &&
                    (!request.auth || !request.auth.token.email || !request.auth.token.email_verified)
                ) {
                    throw ServerlessFunctionError.create(
                        correlationId,
                        "unauthenticated",
                        "Only authorised users with a verified email address can make this request.",
                        {
                            inputVariables: {
                                request: {
                                    auth: {
                                        token: request.auth?.token,
                                    },
                                },
                            },
                        }
                    );
                }
                // parse request
                const requestParseResult = specification.request.safeParse(request.data);
                if (!requestParseResult.success) {
                    throw ServerlessFunctionError.create(
                        correlationId,
                        "invalid-argument",
                        "Request is invalid. Could not parse request data.",
                        {
                            inputVariables: {
                                request: {
                                    data: request.data,
                                },
                            },
                            intermediateVariables: {
                                parseResult: {
                                    error: requestParseResult.error,
                                },
                            },
                        }
                    );
                }
                const requestData = requestParseResult.data;
                // call the handler
                const responseData = await handler(
                    {
                        correlationId,
                        info: {
                            name: specification.name,
                            description: specification.description,
                        },
                        data: requestData,
                        auth: specification.authRequired === "AUTH_REQUIRED" ?
                            (({
                                user: {
                                    id: request.auth?.uid ?? "",
                                    email: request.auth?.token.email ?? "",
                                },
                            }) as HandlerRequestAuth<CallRequiresAuth>) :
                            (request.auth ? ({
                                user: {
                                    id: request.auth?.uid ?? "",
                                    email: request.auth?.token.email ?? "",
                                },
                            }) : undefined as HandlerRequestAuth<CallRequiresAuth>),
                    },
                );
                const responseParseResult = specification.response.safeParse(responseData);
                if (!responseParseResult.success) {
                    throw ServerlessFunctionError.create(
                        correlationId,
                        "internal",
                        "Response is invalid. Could not parse response data.",
                        {
                            inputVariables: {
                                response: {
                                    data: responseData,
                                },
                            },
                            intermediateVariables: {
                                parseResult: {
                                    error: responseParseResult.error,
                                },
                            },
                        }
                    );
                } else {
                    return responseParseResult.data;
                }
            } catch (e) {
                if (e instanceof ServerlessFunctionError) {
                    e.log();
                    throw e.toHttpsError();
                } else {
                    const err = ServerlessFunctionError.createFromException(
                        correlationId,
                        e,
                        "internal",
                        `An unknown error occurred in API call, ${specification.name}`
                    );
                    err.log();
                    throw err.toHttpsError();
                }
            }
        });
    };
}
