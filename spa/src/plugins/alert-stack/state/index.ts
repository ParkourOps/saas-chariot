import type { NotificationType } from "../../types/notification-type";
import uniqueId from "@/_shared_/libraries/unique-id";
import { defineStore } from "pinia";
import { ref } from "vue";

type Alert = {
    type?: NotificationType;
    message: string;
    autoDismiss?: boolean;
};

type AlertRecord = Alert & {
    id: string;
};

const DURATION_MS = 3000;

export const useAlertStack = defineStore("AlertStack", () => {
    const alertStack = ref<AlertRecord[]>([]);

    function pop(id: string) {
        alertStack.value = alertStack.value.filter((n) => n.id !== id);
    }

    function push(notification: Alert) {
        const id = uniqueId.create();
        alertStack.value.push({
            id,
            ...notification,
        });
        if (notification.autoDismiss) {
            setTimeout(() => {
                pop(id);
            }, DURATION_MS);
        }
    }

    return {
        alertStack,
        pop,
        push,
    };
});
