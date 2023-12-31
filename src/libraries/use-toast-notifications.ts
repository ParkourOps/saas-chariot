import type { NotificationType } from "@/types/notification-type";
import makeUUID from "@/utilities/makeUUID";
import { defineStore } from "pinia";
import { ref } from "vue";

type ToastNotification = {
    type?: NotificationType,
    title?: string,
    message: string
}

type ToastNotificationRecord = ToastNotification & {
    id: string
};

const DURATION_MS = 3000;

export const useToastNotifications = defineStore("Toast Notifications", ()=>{
    const toasts = ref<ToastNotificationRecord[]>([]);
    
    function pop(id: string) {
        toasts.value = toasts.value.filter((n) => n.id !== id);
    }

    function push(notification: ToastNotification) {
        const id = makeUUID();
        toasts.value.push({
            id,
            ...notification
        });
        setTimeout(()=>{
            pop(id);
        }, DURATION_MS);
    }

    return {
        toasts,
        pop,
        push
    }
});

