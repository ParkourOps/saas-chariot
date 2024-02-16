import {NonNegativeInteger, NonEmptyString} from "../../..";
import {z} from "zod";
import PriceBase from "./PriceBase";

const FixedPriceBase = z.object({
    unitPrice: NonNegativeInteger,
    currencyCode: NonEmptyString, // ISO 4217, lowercase
}).merge(PriceBase);

export default FixedPriceBase;
