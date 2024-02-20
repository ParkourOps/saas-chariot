import Offer from "../types/offer";

export default new Offer(
    [
        {
            title: "SaaS Template",
            price: 199.99,
        },
        {
            title: "SaaS Knowledge Base",
            highlight: "limitedTime",
            price: 299.99,
            newPrice: 199.99,
            subtitles: [
                "(Ever-Expanding) Notion Workspace",
                "Searchable Content Library",
            ],
        },
        {
            title: "1-on-1 SaaS Strategy Consultation",
            subtitles: [
                "30-Minute Video Call",
            ],
            highlight: "limitedTime",
            price: 49.99,
            newPrice: "FREE",
        },
        {
            title: "SaaS Engineering Community",
            subtitles: [
                "*Exclusive* Slack Channel",
                "*Exclusive* Opt-In Members Directory",
                "*Exclusive* Live Webinars",
                "*Exclusive* Live Interactive Workshops",
            ],
            price: "FREE",
        },
    ],
    "$",
);
