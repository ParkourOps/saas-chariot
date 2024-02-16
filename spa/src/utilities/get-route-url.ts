import type { RouteLocationRaw } from "vue-router";
import router from "@/router";

export default function (route: RouteLocationRaw) {
    const _route = router.resolve(route);
    return window.location.origin + _route.href;
}
