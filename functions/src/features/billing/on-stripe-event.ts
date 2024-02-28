import PurchasedItem from "@/_shared_/models/features/billing/PurchasedItem";
import {parseEvent, getCheckoutSessionItems, getInvoice} from "@/services/stripe";
import Stripe from "stripe";
import withSchema from "@/_shared_/libraries/with-schema";
import DateTime from "@/_shared_/libraries/date-time";
import ServerlessFunctionError from "@/libraries/serverless-function-error";
import webhookEndpoint from "@/libraries/webhook-endpoint";
import {customerPurchase} from "@/document-collections";

// async function handleChargeRefunded(correlationId: string, event: Stripe.ChargeRefundedEvent) {
//         if (typeof event.data.object.invoice === "object") {
//             event.data.object.invoice.id
//         }
// }

async function handleCheckoutSessionCompleted(correlationId: string, event: Stripe.CheckoutSessionCompletedEvent) {
    const checkoutSession = event.data.object;

    // Validate checkout session
    if (
        typeof checkoutSession.customer_details?.email !== "string" ||
        typeof checkoutSession.customer !== "string" ||
        typeof checkoutSession.invoice !== "string"
    ) {
        return ServerlessFunctionError.create(
            correlationId,
            "internal",
            "Could not process checkout session completed event: checkout session missing customer information.",
            {
                inputVariables: {
                    event,
                },
            }
        ).log();
    }

    // Retrieve invoice/charge for the checkout session and validate
    const getInvoiceResult = await getInvoice(
        correlationId,
        checkoutSession.invoice,
    );
    if (!getInvoiceResult.success) {
        return ServerlessFunctionError.create(
            correlationId,
            "internal",
            "Could not process checkout session completed event: could not retrieve invoice.",
            {
                inputVariables: {
                    event,
                },
            }
        ).log();
    }
    const invoice = getInvoiceResult.data;
    // if (!invoice.hosted_invoice_url || !invoice.invoice_pdf) {
    //     return FunctionError.create(
    //         correlationId,
    //         "internal",
    //         "Could not process checkout session event: invoice missing links.",
    //         {
    //             inputVariables: {
    //                 event,
    //             }
    //         }
    //     );
    // }

    // Retrieve checkout session items and validate
    const getCheckoutSessionItemsResult = await getCheckoutSessionItems(correlationId, checkoutSession.id);
    if (!getCheckoutSessionItemsResult.success) {
        return ServerlessFunctionError.create(
            correlationId,
            "internal",
            "Could not process checkout session completed event: could not retrieve checkout session items.",
            {
                inputVariables: {
                    event,
                },
            }
        ).log();
    }
    // if (!getCheckoutSessionItemsResult.data.every((item)=>(
    //     item.price &&
    //     item.quantity
    // ))) {
    //     return FunctionError.create(
    //         correlationId,
    //         "internal",
    //         "Could not process checkout session completed event:
    //          checkout session items missing price or quantity information.",
    //         {
    //             inputVariables: {
    //                 event,
    //             },
    //         }
    //     ).log();
    // };

    // Create an entry for each item
    const items = getCheckoutSessionItemsResult.data;
    for (const item of items) {
        const price = item.price;
        const product = item.product;
        const documentData = withSchema(PurchasedItem).instantiateConst({
            // customer information:
            customer: {
                id: checkoutSession.customer,
                email: checkoutSession.customer_details.email,
            },
            // product and price of quantity purchased:
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                images: product.images,
                features: product.features
                    .filter((f)=>(f.name && typeof f.name === "string"))
                    .map((f)=>f.name as string),
                statementDescriptor: product.statement_descriptor,
                created: DateTime.utcFromDate(new Date(product.created * 1000)).toJSON(),
                updated: DateTime.utcFromDate(new Date(product.created * 1000)).toJSON(),
                metadata: product.metadata,
            },
            price: (!price) ? undefined : (price.type === "recurring" && price.recurring) ?
                {
                    id: price.id,
                    transformQuantity: price.transform_quantity ? {
                        divideBy: price.transform_quantity.divide_by,
                        round: price.transform_quantity.round,
                    } : undefined,
                    created: DateTime.utcFromDate(new Date(price.created * 1000)).toJSON(),
                    metadata: price.metadata,
                    type: "recurring_fixed_price_×_quantity",
                    unitPrice: price.unit_amount ?? 0,
                    currencyCode: price.currency,
                    interval: price.recurring.interval,
                    intervalCount: price.recurring.interval_count,
                } :
                {
                    id: price.id,
                    transformQuantity: price.transform_quantity ? {
                        divideBy: price.transform_quantity.divide_by,
                        round: price.transform_quantity.round,
                    } : undefined,
                    created: DateTime.utcFromDate(new Date(price.created * 1000)).toJSON(),
                    metadata: price.metadata,
                    type: "one_time_fixed_price_×_quantity",
                    unitPrice: price.unit_amount ?? 0,
                    currencyCode: price.currency,
                },
            quantity: item.quantity,
            // invoice
            invoice: {
                id: invoice.id,
                webpageUrl: invoice.hosted_invoice_url,
                pdfUrl: invoice.invoice_pdf,
                created: DateTime.utcFromDate(new Date(invoice.created * 1000)).toJSON(),
                metadata: invoice.metadata ?? {},
                charge: {
                    id: invoice.charge.id,
                    refunded: invoice.charge.refunded,
                    paid: invoice.charge.paid,
                    created: DateTime.utcFromDate(new Date(invoice.charge.created * 1000)).toJSON(),
                    metadata: invoice.charge.metadata,
                },
            },
        });

        // Create the document
        customerPurchase.setDoc(correlationId, [documentData.customer.email], documentData);
    }
}


/*
    Note: do not throw unless Stripe webhook server should be made aware
          of a failure, resulting in deletion of webhook registery.
*/
export default webhookEndpoint.instantiate(
    "onStripeEvent",
    "Handle ",
    async (correlationId, request) => {
        // extract signature
        const signature = request.headers["stripe-signature"];
        if (!signature || typeof signature !== "string") {
            throw ServerlessFunctionError.create(
                correlationId,
                "invalid-argument",
                "Could not handle Stripe event, signature is invalid."
            );
        }
        // parse event
        const parseResult = await parseEvent(correlationId, request.rawBody, signature);
        if (!parseResult.success) {
            throw parseResult.error;
        }
        const event = parseResult.data;
        // handle event
        switch (event.type) {
        case "checkout.session.completed":
            return await handleCheckoutSessionCompleted(correlationId, event);
        // case "charge.refunded":
            // return await handleChargeRefunded(correlationId, event);
        default:
            // do nothing.
        }
    }
);
