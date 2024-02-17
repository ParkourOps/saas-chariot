import { createRouter, createWebHistory } from "vue-router/auto";
// import userOnly from './guards/user-only'
// import guestOnly from './guards/guest-only'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(/* to, from, savedPosition */) {
        // always scroll to top
        return { top: 0 };
    },
});

export default router;
