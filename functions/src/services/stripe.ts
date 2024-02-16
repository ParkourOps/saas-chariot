import service from "@/libraries/service";
import serverlessConfig from "@/serverless-config";
import Stripe from "stripe";

type ExpandedPrice = Stripe.Price & {
    product: Stripe.Product;
}

type ExpandedLineItem = Stripe.LineItem & {
    product: Stripe.Product;
}

type ExpandedInvoice = Stripe.Invoice & {
    charge: Stripe.Charge;
}

const stripeService = service.instantiate(
    "Stripe",
    "Third-party service for accepting payments.",
    function() {
        return new Stripe(serverlessConfig.services.stripe.secretKey);
    }
);

export const getCheckoutSessionItems = stripeService.instantiateServiceFunction(
    async (provider, correlationId, checkoutSessionId: string) => {
        // get line items
        const lineItems : Stripe.LineItem[] = [];
        try {
            for await (const item of provider().checkout.sessions.listLineItems(checkoutSessionId)) {
                lineItems.push(item);
            }
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    "Could not retrieve order items.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                        inputVariables: {
                            checkoutSessionId,
                        },
                    },
                ),
            };
        }
        // populate with product info
        const items : ExpandedLineItem[] = [];
        for (const item of lineItems) {
            const productId = item.price?.product;
            if (!productId || typeof productId !== "string") {
                return {
                    success: false,
                    error: service.ServiceFunctionError.create(
                        correlationId,
                        "internal",
                        "Could not retrieve product information for order item, invalid product identity received.",
                        {
                            service: {
                                name: "Stripe",
                                description: "Third-party service for accepting payments.",
                            },
                            inputVariables: {
                                checkoutSessionId,
                                productId,
                            },
                            intermediateVariables: {
                                lineItems,
                            },
                        }
                    ),
                };
            }
            let product;
            try {
                product = await provider().products.retrieve(productId);
            } catch (e) {
                return {
                    success: false,
                    error: service.ServiceFunctionError.createFromException(
                        correlationId,
                        e,
                        "internal",
                        "Could not retrieve product information for order item.",
                        {
                            service: {
                                name: "Stripe",
                                description: "Third-party service for accepting payments.",
                            },
                            inputVariables: {
                                checkoutSessionId,
                                productId,
                            },
                            intermediateVariables: {
                                lineItems,
                            },
                        }
                    ),
                };
            }
            items.push({
                ...item,
                product,
            });
        }
        return {
            success: true,
            data: items,
        };
    }
);

// https://stripe.com/docs/webhooks#webhooks-def
export const parseEvent = stripeService.instantiateServiceFunction(
    async (provider, correlationId, data: string | Buffer, signature: string) => {
        try {
            const event = provider().webhooks.constructEvent(data, signature, serverlessConfig.services.stripe.webhookSigningSecretKey);
            return {
                success: true,
                data: event,
            };
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    "Could not parse Stripe event.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                    }
                ),
            };
        }
    }
);

export const getProduct = stripeService.instantiateServiceFunction(
    async (provider, correlationId, productId: string) => {
        let product: Stripe.Product;
        try {
            product = await provider().products.retrieve(productId);
            if (!product.active) {
                return {
                    success: false,
                    error: service.ServiceFunctionError.create(
                        correlationId,
                        "invalid-argument",
                        "The requested product must be active.",
                        {
                            service: {
                                name: "Stripe",
                                description: "Third-party service for accepting payments.",
                            },
                            inputVariables: {
                                productId,
                            },
                            intermediateVariables: {
                                product,
                            },
                        }
                    ),
                };
            }
            return {
                success: true,
                data: product,
            };
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    "An error occurred while attempting to fetch product information.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                        inputVariables: {
                            productId,
                        },
                    }
                ),
            };
        }
    }
);

export const getPrice = stripeService.instantiateServiceFunction(
    async (provider, correlationId, priceId: string) => {
        let price: ExpandedPrice;
        try {
            const _price = await provider().prices.retrieve(priceId, {
                expand: ["product"],
            });
            if (typeof _price.product !== "object" || _price.product.object !== "product" || _price.product.deleted) {
                return {
                    success: false,
                    error: service.ServiceFunctionError.create(
                        correlationId,
                        "internal",
                        "An error occurred while attempting to get product and price information.",
                        {
                            service: {
                                name: "Stripe",
                                description: "Third-party service for accepting payments.",
                            },
                            inputVariables: {
                                priceId,
                            },
                            intermediateVariables: {
                                price: _price,
                            },
                        }
                    ),
                };
            } else {
                price = _price as ExpandedPrice;
            }
            if (!price.active) {
                return {
                    success: false,
                    error: service.ServiceFunctionError.create(
                        correlationId,
                        "invalid-argument",
                        "",
                        {
                            service: {
                                name: "Stripe",
                                description: "Third-party service for accepting payments.",
                            },
                            inputVariables: {
                                priceId,
                            },
                            intermediateVariables: {
                                price,
                            },
                        }
                    ),
                };
            }
            return {
                success: true,
                data: price,
            };
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    "An error occurred while attempting to fetch price information.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                        inputVariables: {
                            priceId,
                        },
                    }
                ),
            };
        }
    }
);

export const getCustomer = stripeService.instantiateServiceFunction(
    async (provider, correlationId, customerId: string) => {
        try {
            const customer = await provider().customers.retrieve(customerId);
            if (customer.deleted) {
                return {
                    success: false,
                    error: service.ServiceFunctionError.create(
                        correlationId,
                        "invalid-argument",
                        "Could not retrieve customer details, customer has been deleted.",
                        {
                            service: {
                                name: "Stripe",
                                description: "Third-party service for accepting payments.",
                            },
                            inputVariables: {
                                customerId,
                            },
                        }
                    ),
                };
            }
            return {
                success: true,
                data: customer,
            };
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    "Could not retrieve customer details.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                        inputVariables: {
                            customerId,
                        },
                    }
                ),
            };
        }
    }
);

export const getCustomerByEmail = stripeService.instantiateServiceFunction(
    async (provider, correlationId, email: string) => {
        try {
            const searchResult = await provider().customers.search({
                query: `email:"${email}"`,
            });
            const customers = searchResult.data;
            if (customers.length < 1) {
                return {
                    success: true,
                    data: null,
                };
            } else if (customers.length > 1) {
                return {
                    success: false,
                    error: service.ServiceFunctionError.create(
                        correlationId,
                        "internal",
                        "Intervention required: Duplicate entries exist for customer",
                        {
                            service: {
                                name: "Stripe",
                                description: "Third-party service for accepting payments.",
                            },
                            inputVariables: {
                                email,
                            },
                        }
                    ),
                };
            } else {
                return {
                    success: true,
                    data: customers[0],
                };
            }
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    "An error occurred while attempting to fetch customer information.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                        inputVariables: {
                            email,
                        },
                    }
                ),
            };
        }
    }
);

export const createCustomer = stripeService.instantiateServiceFunction(
    async (provider, correlationId, customerInfo: { userId: string, email: string}) => {
        try {
            const result = await provider().customers.create({
                email: customerInfo.email,
                metadata: {
                    userId: customerInfo.userId,
                },
            });
            return {
                success: true,
                data: result as Stripe.Customer,
            };
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    "Could not create customer.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                        inputVariables: {
                            userId: customerInfo.userId,
                            email: customerInfo.email,
                        },
                    }
                ),
            };
        }
    }
);

export const getCheckoutUrl = stripeService.instantiateServiceFunction(
    async (
        provider,
        correlationId,
        orderItems: Array<{ priceId: string, quantity: number }>,
        successUrl: string,
        cancelUrl?: string,
        subscriptionSettings?: {
            trialPeriodInDays?: number,
            missingPaymentBehaviour: Stripe.Subscription.TrialSettings.EndBehavior.MissingPaymentMethod
        },
        customerId?: string,
    ) => {
        const customer = customerId ? await provider().customers.retrieve(customerId) : undefined;
        if (customerId && customer?.deleted) {
            return {
                success: false,
                error: service.ServiceFunctionError.create(
                    correlationId,
                    "invalid-argument",
                    "Customer has been deleted.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                        inputVariables: {
                            customerId,
                            orderItems,
                            subscriptionSettings,
                        },
                    }
                ),
            };
        }
        const containsSubscriptionItem = await (async ()=>{
            for (const i of orderItems) {
                const price = await provider().prices.retrieve(i.priceId);
                if (price.type === "recurring") {
                    return true;
                }
            }
            return false;
        })();
        if (containsSubscriptionItem && !subscriptionSettings) {
            return {
                success: false,
                error: service.ServiceFunctionError.create(
                    correlationId,
                    "invalid-argument",
                    "Subscription settings required to create subscription orders.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                        inputVariables: {
                            customerId,
                            orderItems,
                            subscriptionSettings,
                        },
                        intermediateVariables: {
                            customer,
                        },
                    }
                ),
            };
        }
        try {
            const checkoutSession = await provider().checkout.sessions.create({
                customer: customerId,
                customer_creation: "always",
                metadata: (customer && !customer.deleted) ? {
                    userId: customer.metadata.userId,
                } : undefined,
                line_items: orderItems.map((i)=>({
                    price: i.priceId,
                    quantity: i.quantity,
                })),
                mode: containsSubscriptionItem ? "subscription" : "payment",
                success_url: successUrl,
                cancel_url: cancelUrl,
                subscription_data: (containsSubscriptionItem && subscriptionSettings) ? {
                    trial_period_days: subscriptionSettings.trialPeriodInDays,
                    trial_settings: {
                        end_behavior: {
                            missing_payment_method: subscriptionSettings.missingPaymentBehaviour,
                        },
                    },
                } : undefined,
            });
            if (!checkoutSession.url) {
                return {
                    success: false,
                    error: service.ServiceFunctionError.create(
                        correlationId,
                        "internal",
                        "An error occurred while attempting to create a checkout session URL.",
                        {
                            service: {
                                name: "Stripe",
                                description: "Third-party service for accepting payments.",
                            },
                            inputVariables: {
                                customerId,
                                orderItems,
                                subscriptionSettings,
                            },
                            intermediateVariables: {
                                customer,
                            },
                        }
                    ),
                };
            }
            return {
                success: true,
                data: {
                    checkoutUrl: checkoutSession.url,
                },
            };
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    "An error occurred while attempting to create a checkout session URL.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                        inputVariables: {
                            customerId,
                            orderItems,
                            subscriptionSettings,
                        },
                        intermediateVariables: {
                            customer,
                        },
                    }
                ),
            };
        }
    }
);

export const getInvoice = stripeService.instantiateServiceFunction(
    async (
        provider,
        correlationId,
        invoiceId: string,
    ) => {
        try {
            const invoice = await provider().invoices.retrieve(invoiceId, {
                expand: [
                    "charge",
                ],
            });
            return {
                success: true,
                data: invoice as ExpandedInvoice,
            };
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    "Could not retrieve invoice.",
                    {
                        service: {
                            name: "Stripe",
                            description: "Third-party service for accepting payments.",
                        },
                        inputVariables: {
                            invoiceId,
                        },
                    }
                ),
            };
        }
    }
);
