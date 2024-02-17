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

export const usePopupAlerts = defineStore("Popup Alerts", () => {
    const alerts = ref<AlertRecord[]>([]);

    function pop(id: string) {
        alerts.value = alerts.value.filter((n) => n.id !== id);
    }

    function push(notification: Alert) {
        const id = uniqueId.create();
        alerts.value.push({
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
        alerts,
        pop,
        push,
    };
});
