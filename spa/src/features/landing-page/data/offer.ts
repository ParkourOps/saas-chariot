import Offer from "../types/offer";

export default new Offer({
    items:     [
        {
            title: "SaaS Development Kit",
            features: [
                "Frontend",
                "Backend",
                "DevOps",
                "Developer Documentation",
                "Video Walkthroughs & Tutorials",
            ],
            price: {
                oneTime: 499.99,
                recurring: {
                    monthly: 49.99,
                }
                // recurring: {}
            },
            overridePrice: {
                recurring: {
                    monthly: 9.99
                },
            },
        },
        {
            title: "Complete SaaS Knowledge Base",
            alert: "*** Ends Soon ***",
            price: {
                recurring: {
                    monthly: 39.99
                }
            },
            features: [
                "Notion Workspace (Updated Daily)",
                "Content Library (Updated Daily)",
            ],
        },
        {
            title: "1-on-1 SaaS Strategy Consultation",
            features: [
                "30-Minute Video Call",
            ],
            alert: "*** Ends Soon ***",
            price: {
                oneTime: 99.99
            },
            // overridePrice: {},
        },
        {
            title: "SaaS Engineering Community",
            features: [
                "Slack Channel",
                "Members Directory (Opt-In)",
                "Access to Live Workshops",
            ],
            price: {
                recurring: {
                    monthly: 9.99
                },
            },
        },
    ],
    currencySymbol: "$",
    // overridePrice: {
    //     recurring: {
    //         yearly: 449.99,
    //     }
    // }
});
