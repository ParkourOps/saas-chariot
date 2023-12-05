import { useAuth } from "@/libraries/firebase/use-auth";
import { useBusyStatus } from "@/state/busy-status";
import type { NavigationGuardWithThis } from "vue-router";

const navigationGuard : NavigationGuardWithThis<undefined> = (to, from, next) => {
    const auth = useAuth();
    const busy = useBusyStatus();
    busy.increment();

    function check() {
        busy.decrement();
        if (!auth.activeUser) {
            next();
        } else {
            next({ name: 'user' });
        }
    }

    setTimeout(check, 500);
};

export default navigationGuard;
