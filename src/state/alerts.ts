import type { Colour } from "@/types/colour";
import makeUUID from "@/utilities/makeUUID";
import { defineStore } from "pinia";
import { ref } from "vue";

type Alert = {
    type?:  "info"      |
            "success"   |
            "warning"   |
            "error"     ;
    message: string;
    autoDismiss?: boolean;
}

type AlertRecord = Alert & {
    id: string
};

const DURATION_MS = 3000;

export const useAlerts = defineStore("Alerts", ()=>{
    const alerts = ref<AlertRecord[]>([]);
    
    function pop(id: string) {
        alerts.value = alerts.value.filter((n) => n.id !== id);
    }

    function push(notification: Alert) {
        const id = makeUUID();
        alerts.value.push({
            id,
            ...notification
        });
        if (notification.autoDismiss) {
            setTimeout(()=>{
                pop(id);
            }, DURATION_MS);
        }
    }

    return {
        alerts,
        pop,
        push
    }
});

