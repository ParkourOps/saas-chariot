import {z} from "zod";
import {NonNegativeInteger} from "../../../";
import FixedPriceBase from "./FixedPriceBase";

export default z.object({
    type: z.literal("recurring_fixed_price_×_quantity"),
    interval: z.union([
        z.literal("day"),
        z.literal("week"),
        z.literal("month"),
        z.literal("year"),
    ]),
    intervalCount: NonNegativeInteger.min(1, "Interval count must be greater than or equal to one."),
}).merge(FixedPriceBase);
