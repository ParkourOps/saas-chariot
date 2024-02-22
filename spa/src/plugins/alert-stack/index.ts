import { type App } from "vue";
import { useAlertStack as _useAlertStack } from "./state";
import AlertStack from "./components/AlertStack.vue";
import Alert from "./components/Alert.vue";

export function useAlertStack() {
    const alertStack = _useAlertStack();
    return {
        show: alertStack.push,
    };
}

export default {
    install(app: App) {
        const alertStack = _useAlertStack();
        app.component("AlertStack", AlertStack);
        app.component("Alert", Alert);
        app.config.globalProperties.$showPopupAlert = alertStack.push;
    },
};

declare module "vue" {
    interface ComponentCustomProperties {
        $showPopupAlert: ReturnType<typeof _useAlertStack>["push"];
    }
    interface GlobalComponents {
        AlertStack: typeof AlertStack,
        Alert: typeof Alert,
    }
}
