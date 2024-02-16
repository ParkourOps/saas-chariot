
import {z} from "zod";
import {NonEmptyString, EmailAddress, NonNegativeInteger} from "../../../";
import CatalogueItem from "../CatalogueItem";
import PriceOption from "../PriceOption";
import Invoice from "./Invoice";
import Subscription from "./Subscription";

export default CatalogueItem
    .omit({priceOptions: true})
    .merge(z.object({
        price: PriceOption.nullish(),
        quantity: NonNegativeInteger.nullish(),
        invoice: Invoice,
        subscription: Subscription.nullish(), // limiting type inference
        customer: z.object({
            id: NonEmptyString,
            email: EmailAddress,
        }),
    }));
