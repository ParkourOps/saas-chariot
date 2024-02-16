import {z} from "zod";
import OneTimeFixedPriceByQuantity from "./OneTimeFixedPriceByQuantity";
import RecurringFixedPriceByQuantity from "./RecurringFixedPriceByQuantity";

export default z.discriminatedUnion("type", [
    OneTimeFixedPriceByQuantity,
    RecurringFixedPriceByQuantity,
]);
