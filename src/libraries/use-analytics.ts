import mixpanel from "mixpanel-browser";
import mixpanelConfigs from "@/configs/mixpanel";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAnalytics = defineStore("Analytics", ()=>{
    const initialised = ref(false);

    function initialise() {
        mixpanel.init(mixpanelConfigs.projectToken, {
            debug: import.meta.env.DEV,
            persistence: "localStorage"
        });
        initialised.value = true;
        console.debug("Analytics initialised.");
    }
    
    function identify(userId?: string) {
        if (!initialised.value) {
            initialise();
        }

        if (userId) {
            mixpanel.identify(userId);
        } else {
            mixpanel.reset();
        }
    }

    return {
        identify
    }
});
