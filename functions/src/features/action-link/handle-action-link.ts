import uniqueId from "@/_shared_/libraries/unique-id";
import {onRequest} from "firebase-functions/v2/https";
import hash from "@/_shared_/libraries/hash";
import DateTime from "@/_shared_/libraries/date-time";
import handleAction from "./libraries/handle-action";
import {ActionHandlerResult} from "./types";
import {actionLink, customer} from "@/document-collections";
import ActionLinkRecord from "@/_shared_/models/features/action-link/ActionLinkRecord";
import {z} from "zod";
import ServiceFunctionError from "@/libraries/service/service-function-error";
import {error} from "firebase-functions/logger";

type ActionLinkRecordStatus = z.infer<typeof ActionLinkRecord>["status"];

async function concludeActionLinkRecord(correlationId: string, actionLinkId: string, status: Exclude<ActionLinkRecordStatus, "pending">) {
    // ensure action link record exists
    await actionLink.docExists(correlationId, [actionLinkId], {
        throwOn: "not-found",
        message: "Could not handle action link. Could not find any record of this action link.",
    });
    // update action link record with new status
    await actionLink.mergeDoc(correlationId, [actionLinkId], {
        completed: DateTime.utcNow().toJSON(),
        status,
    });
}

export default onRequest(async (request, response)=>{
    try {
        // generate correlation ID
        const correlationId = `apiCall:handleActionLink:${uniqueId.create()}`;
        // get ID of the action link record
        const actionLinkId = request.query["id"];
        // get the token
        const token = request.query["token"];
        // check validity of the request based on presence of query params
        if (typeof actionLinkId !== "string" || typeof token !== "string") {
            response.status(500).send("The action link you clicked is invalid.");
            return;
        }
        // retrieve record for the action link request
        const actionLinkRecord = await actionLink.readDoc(correlationId, [actionLinkId]);
        // validate request using token
        const requestValid = (token === hash.create(actionLinkRecord)); // && !actionLinkRecord.clicked;
        if (!requestValid) {
            response.status(500).send("The action link you clicked is either invalid or has expired.");
            return;
        }
        // append 'clicked' time, shows that link has been clicked
        await actionLink.mergeDoc(correlationId, [actionLinkId], {
            clicked: DateTime.utcNow().toJSON(),
        });
        // verify customer's email address
        await customer.mergeDoc(correlationId, [actionLinkRecord.email], {
            email: actionLinkRecord.email,
            emailVerified: true,
        });
        // if actions specified, cycle through them all
        let result: ActionHandlerResult | undefined;
        for (const a of actionLinkRecord.actionSequence) {
            result = await handleAction(correlationId, actionLinkRecord.email, a);
            // return fail if any action fails
            if (!result.success) {
                result.error.log();
                await concludeActionLinkRecord(correlationId, actionLinkId, "errored");
                response.redirect(actionLinkRecord.failUrl);
                return;
            }
        }
        // if all actions were successful, conclude successful
        await concludeActionLinkRecord(correlationId, actionLinkId, "done");
        // success; redirect to appropriate link
        if (result && result.success && result.redirectUrl) {
            response.redirect(result.redirectUrl);
        } else {
            response.redirect(actionLinkRecord.successUrl);
        }
    } catch (e) {
        if (e instanceof ServiceFunctionError) {
            e.log();
            response.status(500).send("Could not process action link.");
        } else if (e instanceof Error) {
            error(e.message);
            response.status(500).send("Could not process action link.");
        } else {
            error(e);
            response.status(500).send("Could not process action link.");
        }
    }
});
