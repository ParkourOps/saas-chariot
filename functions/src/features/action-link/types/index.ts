import Action from "@/_shared_/models/features/action-link/Action";
import ServerlessFunctionError from "@/libraries/serverless-function-error";
import {z} from "zod";

export type Action = z.infer<typeof Action>;
export type ActionType = Action["type"];
export type ActionOfType<T extends ActionType> = Extract<Action, { type: T }>;

export type ActionHandlerResult =
    {
        success: true,
        redirectUrl?: string,
    } | {
        success: false,
        error: ServerlessFunctionError,
    };

export type ActionHandler<T extends ActionType> =
    (correlationId: string, email: string, action: ActionOfType<T>) => Promise<ActionHandlerResult>;
