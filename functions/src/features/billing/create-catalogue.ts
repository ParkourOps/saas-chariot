import CreateCatalogue from "@/_shared_/models/features/billing/api/CreateCatalogue";
import CatalogueItem from "@/_shared_/models/features/billing/CatalogueItem";
import {getProduct, getPrice} from "../../services/stripe";
import DateTime from "@/_shared_/libraries/date-time";
import {z} from "zod";
import internalApiCall from "@/libraries/internal-api-call";
import ServerlessFunctionError from "@/libraries/serverless-function-error";
type CatalogueItem = z.infer<typeof CatalogueItem>;

export default internalApiCall.implement(CreateCatalogue)(async (request)=>{
    const catalogueItems : CatalogueItem[] = [];
    // populate
    for (const i of request.data.items) {
        // get product info
        const productInfoResult = await getProduct(request.correlationId, i.productId);
        if (!productInfoResult.success) {
            throw productInfoResult.error;
        }
        const productInfo = productInfoResult.data;
        // make catalogue item
        const item : CatalogueItem = {
            product: {
                id: productInfo.id,
                name: productInfo.name,
                description: productInfo.description,
                images: productInfo.images,
                features: productInfo.features
                    .filter((f)=>(f.name && typeof f.name === "string"))
                    .map((f)=>f.name as string),
                unitLabel: productInfo.unit_label,
                statementDescriptor: productInfo.statement_descriptor,
                created: DateTime.utcFromDate(new Date(productInfo.created * 1000)).toJSON(),
                updated: DateTime.utcFromDate(new Date(productInfo.updated * 1000)).toJSON(),
                metadata: productInfo.metadata,
            },
            priceOptions: [],
        };
        // populate price info
        for (const o of i.offers) {
            const priceInfoResult = await getPrice(request.correlationId, o.priceId);
            if (!priceInfoResult.success) {
                throw priceInfoResult.error;
            }
            const priceInfo = priceInfoResult.data;
            if (priceInfo.billing_scheme !== "per_unit" || !priceInfo.unit_amount) {
                throw ServerlessFunctionError.create(
                    request.correlationId,
                    "invalid-argument",
                    "Unsupported price: Price is not charged per unit",
                    {
                        inputVariables: {
                            request: {
                                data: request.data,
                            },
                            productId: i.productId,
                            priceId: o.priceId,
                        },
                    }
                );
            }
            if (priceInfo.type === "recurring" && priceInfo.recurring) {
                item.priceOptions.push({
                    type: "recurring_fixed_price_×_quantity",
                    id: priceInfo.id,
                    name: o.annotation?.name,
                    description: o.annotation?.description,
                    transformQuantity: priceInfo.transform_quantity ? {
                        divideBy: priceInfo.transform_quantity.divide_by,
                        round: priceInfo.transform_quantity.round,
                    } : undefined,
                    created: DateTime.utcFromDate(new Date(productInfo.created * 1000)).toJSON(),
                    metadata: priceInfo.metadata,
                    unitPrice: priceInfo.unit_amount,
                    currencyCode: priceInfo.currency,
                    interval: priceInfo.recurring.interval,
                    intervalCount: priceInfo.recurring.interval_count,
                });
            } else {
                item.priceOptions.push({
                    type: "one_time_fixed_price_×_quantity",
                    id: priceInfo.id,
                    name: o.annotation?.name,
                    description: o.annotation?.description,
                    transformQuantity: priceInfo.transform_quantity ? {
                        divideBy: priceInfo.transform_quantity.divide_by,
                        round: priceInfo.transform_quantity.round,
                    } : undefined,
                    created: DateTime.utcFromDate(new Date(productInfo.created * 1000)).toJSON(),
                    metadata: priceInfo.metadata,
                    unitPrice: priceInfo.unit_amount,
                    currencyCode: priceInfo.currency,
                });
            }
        }
        // add item
        catalogueItems.push(item);
    }
    // return
    return {
        catalogueItems,
    };
});
