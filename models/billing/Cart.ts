import Count from "@m/Count";
import NonEmptyString from "@m/NonEmptyString";
import { z } from "zod";

export default z.array(z.object({
    priceId: NonEmptyString,
    quantity: Count
}));
