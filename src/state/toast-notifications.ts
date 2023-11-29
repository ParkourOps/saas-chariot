import type { Colour } from "@/types/colour";
import makeUUID from "@/utilities/makeUUID";
import { defineStore } from "pinia";
import { ref } from "vue";

type ToastNotification = {
    colour?: Colour,
    title?: string,
    message: string
}

type ToastNotificationRecord = ToastNotification & {
    id: string
};

const DURATION_MS = 3000;

export const useToastNotification = defineStore("Toast Notification", ()=>{
    const notifications = ref<ToastNotificationRecord[]>([]);
    
    function pop(id: string) {
        notifications.value = notifications.value.filter((n) => n.id !== id);
    }

    function push(notification: ToastNotification) {
        const id = makeUUID();
        notifications.value.push({
            id,
            ...notification
        });
        setTimeout(()=>{
            pop(id);
        }, DURATION_MS);
    }

    return {
        notifications,
        pop,
        push
    }
});

