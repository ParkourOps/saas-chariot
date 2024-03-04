import { useAuth } from "@/libraries/firebase/auth";
import { useIndicators } from "@/state/indicators";
import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to/*, from, savedPosition*/) {
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

router.beforeEach(async (to, from)=>{
    const auth = useAuth();
    const indicators = useIndicators();
    const token = indicators.registerPendingAction();

    const getSignInStatus = new Promise((resolve) => {
        setInterval(()=>{
            if (auth.activeUser === null) {
                token.unregisterPendingAction();
                resolve(false);
            } else if (typeof auth.activeUser === "object") {
                token.unregisterPendingAction();
                resolve(true);
            }
        }, 100);

    });

    if (to.meta.requiresAuth) {
        const signInStatus = await getSignInStatus;
        if (!signInStatus) {
            console.debug("UNAUTHORISED");
            return {
                path: "/app/sign-in/",
            };
        }
    }
});

export default router;

declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth?: boolean,
    }
    interface RouteQuery {

    }
};
