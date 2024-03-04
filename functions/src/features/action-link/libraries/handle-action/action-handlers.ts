import {getDownloadLink} from "@/services/resource-delivery";
import {ActionHandler, ActionType} from "../../types";
import ServerlessFunctionError from "@/libraries/serverless-function-error";
import deliverableResources from "@/features/resource-delivery/data/deliverable-resources";
import mailingLists from "@/features/mailing-list/data/mailing-lists";
import {mailingList} from "@/document-collections";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const instantiateActionHandler = <T extends ActionType>(type: T) => (handler: ActionHandler<T>) => handler;

export const actionHandlerIssueResource = instantiateActionHandler("issueResource")(
    async (correlationId, email, action)=>{
        const resourceEntry = deliverableResources[action.resourceKey];
        if (!resourceEntry) {
            return {
                success: false,
                error: ServerlessFunctionError.create(
                    correlationId,
                    "not-found",
                    "Could not issue resource. Could not find requested resource.",
                    {
                        inputVariables: {
                            email,
                            action,
                        },
                    }
                ),
            };
        }
        if (resourceEntry.type === "cloud") {
            const getDownloadLinkResult = await getDownloadLink(
                correlationId,
                resourceEntry.path,
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
        } else if (resourceEntry.type === "external") {
            return {
                success: true,
                redirectUrl: resourceEntry.url,
            };
        } else {
            return {
                success: false,
                error: ServerlessFunctionError.create(
                    correlationId,
                    "invalid-argument",
                    "Could not issue resource. Invalid resource type.",
                    {
                        inputVariables: {
                            email,
                            action,
                        },
                    },
                ),
            };
        }
    });

export const actionHandlerSubscribeToMailingList = instantiateActionHandler("subscribeToMailingList")(
    async (correlationId, email, action)=>{
        const mailingListKey = action.mailingListKey;
        // find mailing list spec
        const mailingListSpec = mailingLists[mailingListKey];
        if (!mailingListSpec) {
            return {
                success: false,
                error: ServerlessFunctionError.create(
                    correlationId,
                    "not-found",
                    "Could not subscribe to mailing list. Could not find requested mailing list.",
                    {
                        inputVariables: {
                            email,
                            action,
                        },
                    }
                ),
            };
        }
        //
        const mailingListExists = mailingList.docExists(correlationId, [mailingListKey]);
        if (!mailingListExists) {
            await mailingList.createDoc(
                correlationId,
                [mailingListKey],
                {
                    title: mailingListSpec.title,
                    description: mailingListSpec.description,
                    subscriberEmails: [email],
                }
            );
        } else {
            await mailingList.appendToArrayInDoc(correlationId, [mailingListKey], {
                subscriberEmails: {
                    type: "union",
                    elements: [
                        email,
                    ],
                },
            });
        }
        return {
            success: true,
        };
    });

export const actionHandlerUnsubscribeFromMailingList = instantiateActionHandler("unsubscribeFromMailingList")(
    async (correlationId, email, action)=>{
        const mailingListKey = action.mailingListKey;
        const mailingListExists = mailingList.docExists(correlationId, [mailingListKey]);
        if (!mailingListExists) {
            return {
                success: true,
            };
        } else {
            await mailingList.appendToArrayInDoc(correlationId, [mailingListKey], {
                "subscriberEmails": {
                    type: "remove",
                    elements: [email],
                },
            });
            return {
                success: true,
            };
        }
    });
