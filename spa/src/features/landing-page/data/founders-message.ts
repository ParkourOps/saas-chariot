import type { Testimonial } from "../types/testimonial";
import avatar from "../assets/images/avatars/tej.jpg";

export default <Testimonial[]>([
    {
        name: "Tej Birring",
        jobTitle: "Founder & CEO",
        organisation: "SaaS Chariot | Parkour Ops",
        avatar: avatar,
        quote: [
            "As a software engineer and entrepreneur, I often found myself reinventing the wheel when building new products. Frustratingly, core capabilities like user management, payments, and notifications had to be rebuilt from scratch each time. I dreamt of a platform that could provide these universal SaaS building blocks straight out of the box.",

            "I built SaaS Chariot to empower makers and founders, like you and I. SaaS Chariot aims to handle the heavy lifting of core infrastructure so you can focus on creating exceptional user experiences. With just a few clicks, you can spin up a production-ready application with authentication, schema-validated database, secure internal APIs, and more. In SaaS Chariot, almost everything is designed to be customisable and extensible.",

            "My goal is to shave months off the development time of your most important projects, so you can test assumptions faster and hone in on the much sought-after product-market fit. I want to empower the next generation of technical entrepreneurs and product engineers to cost-effectively transform ideas into thriving digital businesses.",

            "The opportunities enabled by cloud infrastructure are immense, but it takes grit, vision, and focus, to build companies users love. By providing the picks and shovels for the next gold rush, SaaS Chariot lets you concentrate on crafting world-class products and services, instead of slogging away at application plumbing.",
            
            // "When you use SaaS Chariot, we make sure you spend more sprint cycles building captivating user workflows.",

            // "With the right foundation, your dreams are just a launch away.",
        ],
    },
]);


