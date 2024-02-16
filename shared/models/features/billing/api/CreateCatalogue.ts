import {z} from "zod";
import {NonEmptyString} from "../../../";
import internalApiCall from "../../../../libraries/internal-api-call";
import CatalogueItem from "../../billing/CatalogueItem";

export default internalApiCall.declare(
    "createCatalogue",
    "Get a list of products and their respective prices to present to customers.",
    "NO_AUTH",
    z.object({
        items: z.object({
            productId: NonEmptyString,
            offers:
                z.object({
                    priceId: NonEmptyString,
                    annotation: z.object({
                        name: NonEmptyString,
                        description: NonEmptyString.nullish(),
                    }).nullish(),
                }).array(),
        }).array(),
    }),
    z.object({
        catalogueItems: CatalogueItem.array(),
    }),
);
