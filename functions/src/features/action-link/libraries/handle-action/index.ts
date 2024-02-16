import ServerlessFunctionError from "@/libraries/serverless-function-error";
import {actionHandlerIssueResource, actionHandlerSubscribeToMailingList, actionHandlerUnsubscribeFromMailingList} from "./action-handlers";
import {Action, ActionHandlerResult} from "../../types";

export default async function(
    correlationId: string,
    email: string,
    action: Action,
) : Promise<ActionHandlerResult> {
    switch (action.type) {
    case "issueResource":
        return actionHandlerIssueResource(correlationId, email, action);
    case "subscribeToMailingList":
        return actionHandlerSubscribeToMailingList(correlationId, email, action);
    case "unsubscribeFromMailingList":
        return actionHandlerUnsubscribeFromMailingList(correlationId, email, action);
    default:
        return {
            success: false,
            error: ServerlessFunctionError.create(
                correlationId,
                "invalid-argument",
                "Could not handle action. Unknown action type.",
                {
                    inputVariables: {
                        email,
                        action,
                    },
                }
            ),
        };
    }
}
