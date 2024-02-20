import {type App} from "vue";
import { useToastStack as _useToastStack } from "./state";
import ToastStack from "./components/ToastStack.vue";

export function useToastStack() {
    const toastStack = _useToastStack();
    return {
        show: toastStack.push,
    };
}

export default {
    install(app: App) {
        const toastStack = _useToastStack();
        app.component("ToastStack", ToastStack);
        app.config.globalProperties.$showToastNotification = toastStack.push;
    },
};

declare module "vue" {
    interface ComponentCustomProperties {
        $showToastNotification: ReturnType<typeof _useToastStack>["push"];
    }
    interface GlobalComponents {
        ToastStack: typeof ToastStack
    }
}
