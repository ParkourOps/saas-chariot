import {z} from "zod";
import FixedPriceBase from "./FixedPriceBase";

export default z.object({
    type: z.literal("one_time_fixed_price_×_quantity"),
}).merge(FixedPriceBase);
