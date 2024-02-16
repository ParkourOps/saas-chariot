import uniqueId from "@/_shared_/libraries/unique-id";
import {onRequest} from "firebase-functions/v2/https";
import ActionLinkRecord from "@/_shared_/models/features/action-link/ActionLinkRecord";
import hash from "@/_shared_/libraries/hash";
import DateTime from "@/_shared_/libraries/date-time";
import handleAction from "./libraries/handle-action";
import {ActionHandlerResult} from "./types";
import ServerlessFunctionError from "@/libraries/serverless-function-error";
import firestore from "@/libraries/firestore";
import {z} from "zod";
import withSchema from "@/_shared_/libraries/with-schema";

type ActionLinkRecordStatus = z.infer<typeof ActionLinkRecord>["status"];
async function concludeActionLinkRecord(actionLinkId: string, status: Exclude<ActionLinkRecordStatus, "pending">) {
    const db = firestore.get();
    const docPath = `action-link/${actionLinkId}`;
    const UpdateActionLinkRecord = ActionLinkRecord.pick({completed: true, status: true});
    const updateData = withSchema.declareConst(UpdateActionLinkRecord, {
        completed: DateTime.utcNow().toJSON(),
        status,
    });
    return await db.doc(docPath).update(updateData);
}

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
        await concludeActionLinkRecord(actionLinkId, "errored");
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
    // append 'clicked' time, shows that link has been clicked
    await db.doc(docPath).update({
        clicked: DateTime.utcNow().toJSON(),
    });
    // verify customer's email address
    await db.doc(`customer/${actionLinkRecord.email}`).set({
        emailVerified: true,
    }, {merge: true});
    // if actions specified, cycle through them all
    let result: ActionHandlerResult | undefined;
    for (const a of actionLinkRecord.actionSequence) {
        result = await handleAction(correlationId, actionLinkRecord.email, a);
        // return fail if any action fails
        if (!result.success) {
            result.error.log();
            await concludeActionLinkRecord(actionLinkId, "errored");
            return response.redirect(actionLinkRecord.failUrl);
        }
    }
    // if all actions were successful, conclude successful
    await concludeActionLinkRecord(actionLinkId, "done");
    // success; redirect to appropriate link
    if (result && result.success && result.redirectUrl) {
        return response.redirect(result.redirectUrl);
    } else {
        return response.redirect(actionLinkRecord.successUrl);
    }
});
