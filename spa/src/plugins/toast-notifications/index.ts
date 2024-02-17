import {type App} from "vue";
import { useToastNotifications as _useToastNotifications } from "./state/toast-notifications";
import ToastNotifications from "./components/ToastNotifications.vue";

export function useToastNotifications() {
    const toastNotifications = _useToastNotifications();
    return {
        show: toastNotifications.push,
    }
}

export default {
    install(app: App) {
        const toastNotifications = _useToastNotifications();
        app.component("ToastNotifications", ToastNotifications);
        app.config.globalProperties.$showToastNotification = toastNotifications.push;
    }
}

declare module "vue" {
    interface ComponentCustomProperties {
        $showToastNotification: ReturnType<typeof _useToastNotifications>["push"];
    }
    interface GlobalComponents {
        ToastNotifications: typeof ToastNotifications
    }
}
