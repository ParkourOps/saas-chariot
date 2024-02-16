import { createRouter, createWebHistory } from "vue-router";
// import userOnly from './guards/user-only'
// import guestOnly from './guards/guest-only'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(/* to, from, savedPosition */) {
        // always scroll to top
        return { top: 0 };
    },
    routes: [
        {
            path: "/",
            name: "landing",
            component: () => import("@/pages/landing/Landing.vue"),
        },
        {
            path: "/privacy-policy",
            name: "privacyPolicy",
            component: () => import("@/pages/PrivacyPolicy.vue"),
        },
        {
            path: "/terms-and-conditions",
            name: "termsAndConditions",
            component: () => import("@/pages/TermsAndConditions.vue"),
        },
    ],
});

export default router;
