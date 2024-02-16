import { type TieredCatalogue } from "../types/tiered-catalogue";
import columnIcon from "../assets/icons/ColumnIcon.vue";

const catalogue: TieredCatalogue = [
    {
        title: "Foundation",
        description: "Fundamental aspects of digital product engineering.",
        items: [
            {
                title: "Prerequisites",
                description: "Recognise the essential knowledge required before embarking upon digital product development, accompanied by enumeration of invaluable learning resources to build individual and team skillset.",
            },
            {
                title: "Methodology",
                description: "Acquire a basic understanding of the technical framework underlying digital product development.",
                features: [
                    {
                        text: "Product Architecture",
                    },
                    {
                        text: "Third-Party Systems",
                    },
                    {
                        text: "Foundational Security",
                    },
                    {
                        text: "Development Process",
                    },
                ],
            },
            {
                title: "Getting Started",
                description: "Commence development of a digital product.",
                features: [
                    {
                        text: "Initiating a Project",
                    },
                    {
                        text: "Codebase Structure",
                    },
                    {
                        text: "(Local) Development Workflow",
                    },
                    {
                        text: "Version Control and Release Management",
                    },
                ],
            },
        ],
    },
    {
        title: "Aesthetics and Appeal",
        description: "Crafting an exceptional user experience.",
        items: [
            {
                title: "Brand Identity",
                description: "Bring your product to life by materialisng your brand essence into the look and feel of your product.",
                icon: columnIcon,
                features: [
                    {
                        text: "Logo",
                    },
                    {
                        text: "Colour Pallete",
                    },
                    {
                        text: "Typefaces",
                    },
                    {
                        text: "Iconography",
                    },
                    {
                        text: "Visual Style",
                    },
                    {
                        text: "Email Templates",
                    },
                ],
            },
            {
                title: "Tone and Messaging",
                description: "Make your customers feel at ease by ensuring all product interactions are consistently on-brand.",
                features: [
                    {
                        text: "Copy (App Text)",
                    },
                    {
                        text: "In-App Notifications",
                    },
                    {
                        text: "Email Notifications",
                    },
                    {
                        text: "SMS Notifications",
                    },
                ],
            },
            // {

            // }
        ],
    },
    {
        title: "Core Features",
        description: "The primary building blocks of digital products.",
        items: [
            {
                title: "In-App Notifications",
                description: "Notify users inside the application.",
                features: [
                    {
                        text: "Local Alerts",
                    },
                    {
                        text: "Synced Alerts",
                    },
                ],
            },
            {
                title: "Messaging",
                description: "Interact with users through channels outside the applications.",
                features: [
                    {
                        text: "Email",
                    },
                    {
                        text: "SMS",
                    },
                    {
                        text: "WhatsApp",
                        badge: "comingSoon",
                    },
                    {
                        text: "WeChat",
                        badge: "comingSoon",
                    },
                ],
            },
            {
                title: "Data",
                description: "Store, access, and validate data.",
            },
            {
                title: "File",
                description: "Store, access, and validate files.",
            },
            {
                title: "Functional Modals",
                description: "Modal-driven workflows.",
            },
            {
                title: "API",
                description: "",
                features: [],
            },
        ],
    },
    {
        title: "Ecommerce",
        description: "Present product and service offers; collect payments in exchange.",
        items: [
            {
                title: "Product Catalogue",
                description: "Choosing the right template for your product based on architecture.",
                icon: columnIcon,
                features: [
                    {
                        text: "Product Listings",
                    },
                    {
                        text: "Categorisation and Organisation",
                    },
                    {
                        text: "Advanced Search and Filtering",
                        badge: "comingSoon",
                    },
                    {
                        text: "User Ratings and Reviews",
                        badge: "comingSoon",
                    },
                ],
            },
            {
                title: "Brand Identity",
                description: "Materialising ",
                icon: columnIcon,
                features: [
                    {
                        text: "Colour Scheme",
                    },
                    {
                        text: "Typefaces",
                    },
                    {
                        text: "Iconography",
                    },
                ],
            },
            // {

            // }
        ],
    },
];

export default catalogue;
