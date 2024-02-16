import useAuth from "@/libraries/firebase/use-auth";
import useBusyCounter from "@/state/use-busy-counter";
import type { NavigationGuardWithThis } from "vue-router";

const navigationGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
    const auth = useAuth();
    const busy = useBusyCounter();
    busy.increment();

    function check() {
        busy.decrement();
        if (auth.activeUser) {
            next();
        } else {
            next({ name: "signIn" });
        }
    }
    setTimeout(check, 500);
};

export default navigationGuard;
