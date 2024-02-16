import {getDownloadLink} from "@/services/resource-delivery";
import serverlessConfig from "@/serverless-config";
import {ActionHandler, ActionType} from "../../types";
import firestore from "@/libraries/firestore";
import ServerlessFunctionError from "@/libraries/serverless-function-error";
import deliverableResources from "@/data/deliverable-resources";
import mailingLists from "@/data/mailing-lists";

const instantiateActionHandler = <T extends ActionType>(type: T) => (handler: ActionHandler<T>) => handler;

export const actionHandlerIssueResource = instantiateActionHandler("issueResource")(async (correlationId, email, action)=>{
    if (!Object.keys(deliverableResources).includes(action.resourceKey)) {
        return {
            success: false,
            error: ServerlessFunctionError.create(
                correlationId,
                "not-found",
                "Could not find requested resource.",
                {
                    inputVariables: {
                        email,
                        action,
                    },
                }
            ),
        };
    }
    const resourceEntry = deliverableResources[action.resourceKey as keyof typeof deliverableResources];
    const getDownloadLinkResult = await getDownloadLink(
        correlationId,
        resourceEntry.path,
        serverlessConfig.services.resourceDelivery.downloadLink.activeForMins
    );
    if (!getDownloadLinkResult.success) {
        return {
            success: false,
            error: getDownloadLinkResult.error,
        };
    }
    return {
        success: true,
        redirectUrl: getDownloadLinkResult.data,
    };
});

export const actionHandlerSubscribeToMailingList = instantiateActionHandler("subscribeToMailingList")(async (correlationId, email, action)=>{
    if (!Object.keys(mailingLists).includes(action.mailingListKey)) {
        return {
            success: false,
            error: ServerlessFunctionError.create(
                correlationId,
                "not-found",
                "Could not find requested mailing list.",
                {
                    inputVariables: {
                        email,
                        action,
                    },
                }
            ),
        };
    }
    const mailingListEntry = mailingLists[action.mailingListKey as keyof typeof mailingLists];
    const db = firestore.get();
    const docPath = `mailing-list/${action.mailingListKey}`;
    const doc = await db.doc(docPath).get();
    try {
        if (doc.exists) {
            await db.doc(docPath).update({
                subscriberEmails: firestore.FieldValue.arrayUnion(email),
            });
        } else {
            await db.doc(docPath).create({
                title: mailingListEntry.title,
                subscriberEmails: [email],
            });
        }
        return {
            success: true,
        };
    } catch (e) {
        return {
            success: false,
            error: ServerlessFunctionError.createFromException(
                correlationId,
                e,
                "internal",
                "Could not subscribe customer to mailing list.",
                {
                    inputVariables: {
                        email,
                        action,
                    },
                    intermediateVariables: {
                        docPath,
                    },
                }
            ),
        };
    }
});

export const actionHandlerUnsubscribeFromMailingList = instantiateActionHandler("unsubscribeFromMailingList")(async (correlationId, email, action)=>{
    const db = firestore.get();
    const docPath = `mailing-list/${action.mailingListKey}`;
    const doc = await db.doc(docPath).get();
    try {
        if (doc.exists) {
            await db.doc(docPath).update({
                subscriberEmails: firestore.FieldValue.arrayRemove(email),
            });
        }
        return {
            success: true,
        };
    } catch (e) {
        return {
            success: false,
            error: ServerlessFunctionError.createFromException(
                correlationId,
                e,
                "internal",
                "Could not subscribe customer to mailing list.",
                {
                    inputVariables: {
                        email,
                        action,
                    },
                    intermediateVariables: {
                        docPath,
                    },
                }
            ),
        };
    }
});
