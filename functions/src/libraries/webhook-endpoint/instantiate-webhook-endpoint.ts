import {Request, onRequest} from "firebase-functions/v2/https";
import ServerlessFunctionError from "../serverless-function-error";
import uniqueId from "@/_shared_/libraries/unique-id";

export default function<
    WebhookEndpointName extends string,
    WebhookEndpointDescription extends string,
>(
    name: WebhookEndpointName,
    description: WebhookEndpointDescription,
    handler: (correlationId: string, request: Request) => Promise<void>
) {
    const correlationId = `webhookEndpoint:${name}:${uniqueId.create()}`;
    return onRequest(async (request, response) => {
        try {
            await handler(correlationId, request);
            response.status(200).send({});
        } catch (e) {
            if (e instanceof ServerlessFunctionError) {
                e.log();
                e.send(response);
            } else {
                const err = ServerlessFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    `An unknown error occurred in webhook handler, ${name}`
                );
                err.log();
                err.send(response);
            }
        }
    });
}
