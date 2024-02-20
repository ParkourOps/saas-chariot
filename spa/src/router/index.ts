import { createRouter, createWebHistory } from "vue-router/auto";
// import userOnly from './guards/user-only'
// import guestOnly from './guards/guest-only'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to /* from, savedPosition */) {
        if (to.hash) {
            // If anchored element, scroll to position.
            return {
                el: to.hash,
                behavior: "smooth",
                top: 55,
            };
        } else {
            // Always scroll to top if no anchor specified.
            return { top: 0 };
        }
    },
});

export default router;
