import { type AllowedComponentProps, type App, type Component, type VNodeProps, reactive, markRaw } from "vue";
import ModalVue from "./components/Modal.vue";
import ModalStackVue from "./components/ModalStack.vue";
import makeUUID from "@/utilities/makeUUID";

type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never;

const modalStack = reactive(new Map<string, {
    component: Component,
    props: any
}>())

type ComponentArg<T> = T | (()=>Promise<{default: T}>);

async function showModal<T extends Component>(component: ComponentArg<T>, props: ComponentProps<T>) {
    if (typeof component === "function") {
        const imported = await (component as ()=>Promise<{default: T}>)();
        modalStack.set(makeUUID(), {
            component: markRaw(imported.default),
            props
        }); 
    } else {
        modalStack.set(makeUUID(), {
            component: markRaw(component),
            props
        }); 
    }
}

function hideModal(id: string) {
    modalStack.delete(id);
}

export function useModalStack() {
    return {
        showModal,
        hideModal,
        modalStack,
    }
}

export default {
    install(app: App) {
        app
            .component("ModalStack", ModalStackVue)
            .component("Modal", ModalVue)
        ;
        app.config.globalProperties.$showModal = showModal;
        app.config.globalProperties.$hideModal = hideModal;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $showModal: typeof showModal
        $hideModal: typeof hideModal
    }
}
