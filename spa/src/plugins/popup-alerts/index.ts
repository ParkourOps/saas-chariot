import { type App } from "vue";
import { usePopupAlerts } from "./state/popup-alerts";
import PopupAlerts from "./components/PopupAlerts.vue";
import AlertLayout from "./components/AlertLayout.vue";

export default {
    install(app: App) {
        const popupAlerts = usePopupAlerts();
        app.component("PopupAlerts", PopupAlerts);
        // app.component("AlertLayout", AlertLayout);
        app.config.globalProperties.$showPopupAlert = popupAlerts.push;
    }
}

declare module "vue" {
    interface ComponentCustomProperties {
        $showPopupAlert: ReturnType<typeof usePopupAlerts>["push"];
    }
    interface GlobalComponents {
        PopupAlerts: typeof PopupAlerts,
        // AlertLayout: typeof AlertLayout,
    }
}
