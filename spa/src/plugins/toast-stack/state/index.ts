import type { NotificationType } from "@/types";
import uniqueId from "@/_shared_/libraries/unique-id";
import { defineStore } from "pinia";
import { ref } from "vue";

type ToastNotification = {
    type?: NotificationType;
    title?: string;
    message: string;
};

type ToastNotificationRecord = ToastNotification & {
    id: string;
};

const DURATION_MS = 3000;

export const useToastStack = defineStore("Toast Stack", () => {
    const toastStack = ref<ToastNotificationRecord[]>([]);

    function pop(id: string) {
        toastStack.value = toastStack.value.filter((n) => n.id !== id);
    }

    function push(notification: ToastNotification) {
        const id = uniqueId.create();
        toastStack.value.push({
            id,
            ...notification,
        });
        setTimeout(() => {
            pop(id);
        }, DURATION_MS);
    }

    return {
        toastStack,
        pop,
        push,
    };
});
