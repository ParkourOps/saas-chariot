import {z} from "zod";
import { NonEmptyString, DateTime } from "../..";
import ActionLinkRequest from "./ActionLinkRequest";

export default ActionLinkRequest
    .omit({
        prompt: true,
        callToActionText: true,
    })
    .merge(z.object({
        // id of the generated action link
        id: NonEmptyString,
        // the key to use to create the token
        secretKey: NonEmptyString,
        // when the link is created
        created: DateTime,
        // when the link is clicked, it becomes invalid (i.e. when `clicked` is set)
        clicked: DateTime.nullish(),
        // status
        completed: z.object({
            dateTime: DateTime.nullish(),
            completedStatus: z.union([
                z.literal("errored"),
                z.literal("done"),
            ])
        }).nullish()
    }
));
