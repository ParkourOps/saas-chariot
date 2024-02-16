import Offer from "../types/offer";

export default new Offer(
    [
        {
            title: "SaaS Template",
            subtitles: ["Derisked frontend and backend asd asd a application infrastructure.", "Downloadable ZIP file."],
            highlight: "limitedTime",
            price: 99.99,
        },
        {
            title: "Knowledge Base (Engineering)",
            price: 100.0,
            newPrice: "FREE",
        },
        {
            title: "Knowledge Base (B2B and B2C SaaS)",
            price: 100.0,
            newPrice: "FREE",
            highlight: "limitedTime",
        },
        {
            title: "Strategy Consultation",
            highlight: "limitedTime",
            price: 499.99,
            newPrice: "FREE",
        },
    ],
    "$",
);
