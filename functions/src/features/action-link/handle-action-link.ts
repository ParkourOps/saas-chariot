import uniqueId from "@/_shared_/libraries/unique-id";
import {onRequest} from "firebase-functions/v2/https";
import ActionLinkRecord from "@/_shared_/models/features/action-link/ActionLinkRecord";
import hash from "@/_shared_/libraries/hash";
import DateTime from "@/_shared_/libraries/date-time";
import handleAction from "./libraries/handle-action";
import {ActionHandlerResult} from "./types";
import ServerlessFunctionError from "@/libraries/serverless-function-error";
import firestore from "@/libraries/firestore";

export default onRequest(async (request, response)=>{
    // generate correlation ID
    const correlationId = `apiCall:handleActionLink:${uniqueId.create()}`;
    // get id of the action link record
    const actionLinkId = request.query["id"];
    // get the token
    const token = request.query["token"];
    // check validity of the request based on presence of query params
    if (typeof actionLinkId !== "string" || typeof token !== "string") {
        return ServerlessFunctionError.create(
            correlationId,
            "invalid-argument",
            "Could not handle action link. Invalid query parameters.",
            {
                inputVariables: {
                    id: actionLinkId,
                    token,
                },
            }
        ).send(response);
    }
    // retrieve record for the action link request
    const db = firestore.get();
    const docPath = `action-link/${actionLinkId}`;
    const doc = (await db.doc(docPath).get()).data();
    if (!doc) {
        return ServerlessFunctionError.create(
            correlationId,
            "not-found",
            "Could not handle action link. Could not find any record of this action link.",
            {
                inputVariables: {
                    id: actionLinkId,
                    token,
                },
            }
        ).send(response);
    }
    const parseResult = ActionLinkRecord.safeParse(doc);
    if (!parseResult.success) {
        return ServerlessFunctionError.create(
            correlationId,
            "internal",
            "Could not handle action link. Record is invalid.",
            {
                inputVariables: {
                    id: actionLinkId,
                    token,
                },
            }
        ).send(response);
    }
    const actionLinkRecord = parseResult.data;
    // validate request using token
    const requestValid = (token === hash.create(actionLinkRecord)); // && !actionLinkRecord.clicked;
    if (!requestValid) {
        return ServerlessFunctionError.create(
            correlationId,
            "invalid-argument",
            "Could not handle action link. Token is invalid.",
            {
                inputVariables: {
                    id: actionLinkId,
                    token,
                },
            }
        ).send(response);
    }
    // update clicked time
    await db.doc(docPath).update({
        clicked: DateTime.utcNow().toJSON(),
    });
    // if no actions specified, return success (it's just the right thing to do)
    if (actionLinkRecord.actionSequence.length < 1) {
        return response.redirect(actionLinkRecord.successUrl);
    }
    // if actions specified, cycle through them all
    let result: ActionHandlerResult | undefined;
    for (const a of actionLinkRecord.actionSequence) {
        result = await handleAction(correlationId, actionLinkRecord.email, a);
        // return fail if any action fails
        if (!result.success) {
            result.error.log();
            return response.redirect(actionLinkRecord.failUrl);
        }
    }
    // all actions were successful, delete record
    await db.doc(docPath).delete();
    // respond with redirect
    if (result && result.success && result.redirectUrl) {
        return response.redirect(result.redirectUrl);
    } else {
        return response.redirect(actionLinkRecord.successUrl);
    }
});
