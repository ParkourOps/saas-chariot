import { type App } from "vue";
import { useAlertStack } from "./state";
import AlertStack from "./components/AlertStack.vue";
import Alert from "./components/Alert.vue";

export default {
    install(app: App) {
        const alertStack = useAlertStack();
        app.component("AlertStack", AlertStack);
        app.component("Alert", Alert);
        app.config.globalProperties.$showPopupAlert = alertStack.push;
    }
}

declare module "vue" {
    interface ComponentCustomProperties {
        $showPopupAlert: ReturnType<typeof useAlertStack>["push"];
    }
    interface GlobalComponents {
        AlertStack: typeof AlertStack,
        Alert: typeof Alert,
    }
}
