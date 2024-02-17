import { type AllowedComponentProps, type App, type Component, type VNodeProps, reactive, markRaw, computed } from "vue";
import ModalVue from "./components/Modal.vue";
import ModalStackVue from "./components/ModalStack.vue";
import uniqueId from "@/_shared_/libraries/unique-id";
import ModalHeaderVue from "./components/ModalHeader.vue";
import ModalActionsVue from "./components/ModalActions.vue";

type ComponentProps<C extends Component> = C extends new (...args: any) => any ? Omit<InstanceType<C>["$props"], keyof VNodeProps | keyof AllowedComponentProps> : never;

type Modal = Component;

export const modalStack = reactive(
    new Map<
        string,
        {
            component: Modal;
            props: any;
            resolve: (value?: unknown) => void;
        }
    >(),
);

type ComponentArg<C extends Modal> = C | (() => Promise<{ default: C }>);

async function showModal<C extends Modal>(component: ComponentArg<C>, props: ComponentProps<C>) {
    let _component: Modal;
    if (typeof component === "function") {
        // dynamic import (returns promise)
        const imported = await (component as () => Promise<{ default: C }>)();
        _component = markRaw(imported.default);
    } else {
        // regular import
        _component = markRaw(component);
    }

    return new Promise((resolve) => {
        modalStack.set(uniqueId.create(), {
            component: _component,
            props,
            resolve: (value?: unknown) => resolve(value),
        });
    });
}

export function concludeModal(id: string, value?: any) {
    const modalContext = modalStack.get(id);
    if (!modalContext) {
        console.error(`Could not conclude modal; did not find: ${id}`);
        return;
    }
    modalContext.resolve(value);
    modalStack.delete(id);
}

const numModals = computed(()=>modalStack.size);

export function useModalStack() {
    return {
        showModal,
        numModals
    };
}

export default {
    install(app: App) {
        app.component("ModalStack", ModalStackVue);
        // eslint-disable-next-line vue/multi-word-component-names
        app.component("Modal", ModalVue);
        app.component("ModalHeader", ModalHeaderVue);
        app.component("ModalActions", ModalActionsVue);
        app.config.globalProperties.$showModal = showModal;
    },
};

declare module "vue" {
    interface ComponentCustomProperties {
        $showModal: typeof showModal;
    }
    interface GlobalComponents {
        ModalStack: typeof ModalStackVue;
        Modal: typeof ModalVue;
        ModalHeader: typeof ModalHeaderVue;
        ModalActions: typeof ModalActionsVue;
    }
}
