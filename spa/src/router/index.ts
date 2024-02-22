import { useAuth } from "@/libraries/firebase/auth";
import { useIndicators } from "@/state/indicators";

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

router.beforeEach(async (to, from)=>{
    const auth = useAuth();
    const indicators = useIndicators();

    const getSignInStatus = new Promise((resolve) => {
        const token = indicators.registerPendingAction();
        setTimeout(()=>{
            const isSignedIn = !!auth.activeUser;
            token.unregisterPendingAction();
            resolve(isSignedIn);
        }, 500);
    });

    if (to.meta.requiresAuth) {
        const signInStatus = await getSignInStatus;
        if (!signInStatus) {
            return {
                path: "/app/sign-in/"
            };
        }
    }
});

export default router;

declare module 'vue-router' {
    interface RouteMeta {
        // must be declared by every route
        requiresAuth?: boolean
    }
};
