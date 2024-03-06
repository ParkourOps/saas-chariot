import type { FlatCatalogue } from "../types/catalogue";
import type { RouterTyped } from "vue-router/auto";

export default <(router: RouterTyped) => FlatCatalogue>(()=>[
    {
        title: "Video Walkthroughs",
        description: "Benefit from thorough documentation and extensive video walkthroughs for a seamless product development journey. Get stuck? Ask questions at any time.",
        icon: "e-learning",
        // action: {
        //     text: "Syllabus",
        //     function(){
        //         router.push({ name: '/', hash: "#syllabus" });
        //     },
        // },
    },
    {
        title: "Vibrant Community",
        description: "Journey with a vibrant community of product engineers, designers, developers, creators, and founders. A space where collaborations flourish, ideas bloom, and rich exchange of knowledge propels collective growth.",
        icon: "team",
        // action: {
        //     text: "Testimonials",
        //     function: () => {
        //         router.push({ name: '/', hash: "#what-users-say" });
        //     },
        // },
    },
    {
        title: "Unwavering Product Focus",
        description: "Immerse yourself in the art of crafting remarkable products without the burden of navigating the nitty-gritty intricacies of end-to-end application architecture, infrastructure, and orchestration.",
        icon: "code-dev",
        // action: {
        //     text: "Examples",
        //     function: () => {},
        // },
    },
]);
