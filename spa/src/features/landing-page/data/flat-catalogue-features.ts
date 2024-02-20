import { ref } from "vue";
import type { TieredCatalogue } from "../types/catalogue";
import instantiateObject from "@/_shared_/utilities/instantiate-object";

export default ref(instantiateObject<TieredCatalogue>([
    {
        title: "Infrastructure",
        description: "Leverage foundational tried-and-tested infrastructure for developing and operating your digital product or service.",
        items: [
            {
                title: "Serverless Architecture",
                description: "No need to maintain (real or virtual) machines, containers, or clusters.",
                features: [
                    {
                        text: "Scalable",
                    },
                    {
                        text: "Secure",
                    },
                    {
                        text: "Reliable & Available (min. 99.5% SLA)",
                    },
                ],
            },
            {
                title: "Single Codebase",
                description: "By default, all code resides in a single cohesive fully-typed codebase.",
                // features: [
                //     {
                //         text: "Single-Page Application (SPA)",
                //     },
                //     {
                //         text: "Serverless Functions (SFs)",
                //     },
                //     {
                //         text: "Shared Code"
                //     }
                // ]
            },
            {
                title: "Continuous Integration & Deployment",
                description: "Develop application entirely on a local environment ∴ no resource bottlenecks. Detect bugs early and release frequently.",
                features: [
                    {
                        text: "Local Dev Environment (emulated)",
                    },
                    {
                        text: "Local Dev Environment (on Staging)",
                    },
                    {
                        text: "Staging Environment",
                    },
                    {
                        text: "Production Environment",
                    },
                    {
                        text: "Code Review",
                    },
                    {
                        text: "Release Management",
                    },
                    {
                        text: "Faster Dev Cycle & Time to Market",
                    },
                ],
            },
            {
                title: "Automated Testing",
                description: "Ensure thorough, consistent, and repeatable testability of modules, features, and the application as a whole. Confirm every release satisfies requirements.",
                features: [
                    {
                        text: "Unit Tests",
                    },
                    {
                        text: "Functional Tests",
                    },
                    {
                        text: "End-to-End Tests",
                    },
                    {
                        text: "Test Reporting",
                    },
                    {
                        text: "Code Quality ∝ Product Quality",
                    },
                ],
            },
            {
                title: "Automated Reporting",
                description: "Audit application for performance, accessibility, and SEO issues.",
            },
            {
                title: "Real-Time Event Logging",
                description: "Access a centralised log of all application events for effortless debugging.",
                features: [
                    {
                        text: "Staging Log",
                    },
                    {
                        text: "Production Log",
                    },
                ],
            },
        ],
    },

    {
        title: "Brand Expression",
        description: "Enliven your digital product of service by baking in an exceptional experience of your brand essence.",
        items: [
            {
                title: "Themes",
                description: "Define colour scheme(s), fonts, and visual properties. Add icon packs, icons, and other brand assets.",
            },
            {
                title: "Animations",
                description: "Add visual effects to almost every element on the user interface.",
                features: [
                    {
                        text: "Transition-Triggered",
                    },
                    {
                        text: "Scroll-Triggered",
                    },
                    {
                        text: "Reactive Data-Triggered",
                    },
                    {
                        text: "Event-Triggered",
                    },
                ],
            },
            {
                title: "Email Templates",
                description: "Transactional emails may use templates. Adjust the default template to match brand. If required, add additional templates.",
                features: [
                    {
                        text: "Responsive",
                    },
                    {
                        text: "Email Client-Friendly",
                    },
                    {
                        text: "MJML Syntax",
                    },
                ],
            },
            {
                title: "Search Engine Optimisation",
                description: "Use built-in library to optimise pages for search engine indexing, crawling; and social media sharing.",
            },
        ],
    },

    {
        title: "Commerce",
        description: "",
        items: [

        ],
    },

    {
        title: "Business Logic",
        description: "sd",
        items: [
            {
                title: "Scrupulous Data Validation",
                description: "Ensure all data used throughout the application conform to predefined schema definitions.",
                features: [
                    {
                        text: "Development-Time Data Type Suggestions",
                    },
                    {
                        text: "Compile-Time Data Type Validation",
                    },
                    {
                        text: "Run-Time Data Validation",
                    },
                ],
            },
            {
                title: "NoSQL Database",
                description: "Store schema-validated data as documents in (nestable) document collections.",
            },
            {
                title: "Object Storage",
                description: "Manually or programmatically upload, download, and delete files in cloud object storage.",
            },
            {
                title: "Real-Time Data Sync",
                description: "Use real-time data synchronisation to ensure data inside application is always up-to-date.",
                features: [
                    {
                        text: "One-Way Subscription (Read-Only)",
                    },
                    {
                        text: "Two-Way Subscription (Read-and-Write)",
                    },
                ],
            },
            {
                title: "",
                description: "",
            },
            {
                title: "User Authentication & Authorisation",
                description: "",
            },
        ],
    },

    {
        title: "User Workflows",
        description: "sd",
        items: [
            {
                title: "Schema-Enforced",
                description: "Ensure all data used by the application conforms to predefined schemas.",
            },
        ],
    },

    // {
    //     title: "Customer Understading",
    //     description: ""
    // }
    // {
    //     title: "Automated Testing"
    // },

    // {

    // },

    // {
    //     title: "Brand Expression",
    // },
    // {
    //     title: "User Authentication and Authorisation"
    // },
    // {
    //     title: "User Analytics"
    // },

    // {
    //     title: "User Conversations and Feedback Capturing"
    // },
    // {
    //     title: "Data Storage and Validation"
    // },
    // {
    //     title: "File Storage and Validation"
    // },

    // {
    //     title: "Search Engine Optimisation (SEO)"
    // },
    // {
    //     title: "Modal-Based Workflows"
    // },
    // {
    //     title: "Transactional Emails",
    //     features: [
    //         "Templated",
    //         "Text-Only"
    //     ]
    // },

    // {
    //     title: ""
    // },
    // {
    //     title: "In-App Notifications"
    // },
    // {
    //     title: "Billing and Subscription Management"
    // },


    // {
    //     title: "Advanced Reporting"
    // },
    // {},

    // {

    // },
    // {

    // },
    // {

    // },
]));
