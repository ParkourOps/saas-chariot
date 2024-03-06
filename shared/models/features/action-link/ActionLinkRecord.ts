import {z} from "zod";
import {NonEmptyString, DateTime} from "../..";
import ActionLinkRequest from "./ActionLinkRequest";

export default ActionLinkRequest
    .omit({
        prompt: true,
        callToAction: true,
    })
    .merge(z.object({
        // id of the generated action link
        id: NonEmptyString,
        // the key to use to create the token
        secretKey: NonEmptyString,
        // when the link is created
        created: DateTime,
        // when the link is clicked
        clicked: DateTime.nullish(),
        // after the link has been successfully handled
        completed: DateTime.nullish(),
        // status
        status: z.union([
            z.literal("pending"),
            // conclusion:
            z.literal("errored"),
            z.literal("done"),
        ]),
    }));
