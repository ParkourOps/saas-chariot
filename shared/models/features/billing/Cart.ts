import {z} from "zod";
import { NonEmptyString, NonNegativeInteger } from "../..";

export default z.object({
    priceId: NonEmptyString,
    quantity: NonNegativeInteger,
}).array();
