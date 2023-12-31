import { type AllowedComponentProps, type App, type Component, type VNodeProps, reactive, markRaw } from "vue";
import ModalVue from "./components/Modal.vue";
import ModalStackVue from "./components/ModalStack.vue";
import makeUUID from "@/utilities/makeUUID";

type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never;

type Modal = Component;

const modalStack = reactive(new Map<string, {
    component: Modal,
    props: any,
    resolve: (value?: unknown) => void
}>())

type ComponentArg<C extends Modal> = C | (()=>Promise<{default: C}>);

async function showModal<C extends Modal>(component: ComponentArg<C>, props: ComponentProps<C>) {
    let _component : Modal;
    if (typeof component === "function") {
        // dynamic import (returns promise)
        const imported = await (component as ()=>Promise<{default: C}>)();
        _component = markRaw(imported.default);
    } else {
        // regular import
        _component = markRaw(component)
    }

    return new Promise((resolve)=>{
        modalStack.set(makeUUID(), {
            component: _component,
            props,
            resolve: (value?: unknown) => resolve(value)
        }); 
    });
}

function concludeModal(id: string, value?: any) {
    const modalContext = modalStack.get(id);
    if (!modalContext) {
        console.error(`Could not conclude modal; did not find: ${id}`);
        return;
    };
    modalContext.resolve(value);
    modalStack.delete(id);
}

export function useModalStack() {
    return {
        showModal,
        concludeModal,
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
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $showModal: typeof showModal
    }
}
