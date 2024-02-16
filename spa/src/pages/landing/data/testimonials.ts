import type { Testimonial } from "../types/testimonials";
import avatarGilgamesh from "../assets/images/avatars/gilgamesh.jpg";

const testimonial: Testimonial[] = [
    {
        name: "Gilgamesh",
        jobTitle: "Founder & CEO",
        organisation: "Babylon Corp.",
        avatar: avatarGilgamesh,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie, est vitae aliquam venenatis, dolor tellus imperdiet sem, a dignissim libero nulla quis ante. Cras blandit convallis dictum.",
    },
    // {
    //     name: "Gil Gamesh",
    //     occupation: "Founder & CEO, Mesopotamia Corp.",
    //     avatar: avatarGilgamesh,
    //     quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie, est vitae aliquam venenatis, dolor tellus imperdiet sem, a dignissim libero nulla quis ante. Cras blandit convallis dictum."
    // }
];

export default testimonial;
