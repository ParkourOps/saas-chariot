import type { FlatCatalogue } from "../types/flat-catalogue";
import ELearningIcon from "../assets/icons/ELearningIcon.vue";
import TeamIcon from "../assets/icons/TeamIcon.vue";
import CodeDevelopmentIcon from "../assets/icons/CodeDevelopmentIcon.vue";

const catalogue: FlatCatalogue = [
    {
        title: "Video Walkthroughs",
        description: "Benefit from thorough documentation and extensive video walkthroughs for a seamless development journey. Stuck? Ask questions any time.",
        icon: ELearningIcon,
        action: {
            name: "Syllabus",
            function: () => {},
        },
    },
    {
        title: "Vibrant Community",
        description: "Journey with a vibrant community of designers, developers, creators, and founders, where collaboration flourishes, ideas bloom, and a rich exchange of knowledge propels collective growth.",
        icon: TeamIcon,
        action: {
            name: "Testimonials",
            function: () => {},
        },
    },
    {
        title: "Unwavering Product Focus",
        description: "Immerse yourself in the art of crafting remarkable product features without the burden of navigating the nitty-gritty intricacies of end-to-end application infrastructure.",
        icon: CodeDevelopmentIcon,
        action: {
            name: "Examples",
            function: () => {},
        },
    },
];

export default catalogue;
