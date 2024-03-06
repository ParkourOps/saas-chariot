import Offer from "../types/offer";

export default new Offer({
    descriptionParagraphs: [
        "Startup Package",
        "(covers up to 10 users)",
        "Please get in touch if your team is larger."
    ],
    items:     [
        {
            title: "SaaS Development Kit",
            features: [
                "Frontend",
                "Backend",
                "DevOps",
                "Extensive Developer Documentation",
                "Video Walkthroughs/Tutorials",
                "Video 'Deep Dives'",
                "Live Workshop Recordings"
            ],
            price: {
                oneTime: 499.99,
            },
            overridePrice: {
                oneTime: 399.99
            }
        },
        {
            title: "SaaS Knowledge Base (Updated Weekly)",
            price: {
                recurring: {
                    monthly: 39.99
                }
            },
            features: [
                "Notion Workspace: SaaS Business Development",
                "Content Library: SaaS Business Development",
                "Notion Workspace: Product Engineering",
                "Content Library: Product Engineering",
            ],
        },
        {
            title: "1-on-1 SaaS Strategy Consultation",
            features: [
                "30-Minute Video Call",
            ],
            alert: "*** LIMITED TIME ***",
            price: {
                oneTime: 99.99
            },
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
    overridePrice: {
        oneTime: 199.99,
        recurring: {
            monthly: 39.99,
        }
    }
});
