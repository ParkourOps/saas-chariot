import {useAuth} from "@/libraries/firebase/auth";
import {useIndicators} from "@/state/indicators";
import type { NavigationGuardWithThis } from "vue-router/auto";

const navigationGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
    const auth = useAuth();
    const indicators = useIndicators();
    const token = indicators.registerPendingAction();

    function check() {
        token.unregisterPendingAction();
        if (auth.activeUser) {
            next();
        } else {
            next({ name: "signIn" });
        }
    }
    setTimeout(check, 500);
};

export default navigationGuard;
