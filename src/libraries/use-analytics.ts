import hotjar from '@hotjar/browser';
import mixpanel, { type Dict } from "mixpanel-browser";
import mixpanelConfigs from "@/configs/mixpanel";
import hotjarConfigs from '@/configs/hotjar';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAnalytics = defineStore("Analytics", ()=>{
    const initialised = ref(false);

    function initialise() {
        // initialise Mixpanel
        mixpanel.init(mixpanelConfigs.projectToken, {
            debug: import.meta.env.DEV,
            persistence: "localStorage"
        });
        // initialise Hotjar
        hotjar.init(parseInt(hotjarConfigs.siteId), parseInt(hotjarConfigs.version), {
            debug: import.meta.env.DEV
        });
        // report success
        initialised.value = true;
        console.debug("Analytics initialised.");
    }
    
    function identify(userId?: string) {
        if (!initialised.value) {
            initialise();
        }

        if (userId) {
            mixpanel.identify(userId);
            hotjar.identify(userId, {});
        } else {
            mixpanel.reset();
            hotjar.identify(null, {});
        }
    }

    function trackEvent(eventName: string, properties?: Dict) {
        mixpanel.track(eventName, properties);
        hotjar.event(eventName);
    }

    return {
        identify,
        trackEvent
    }
});
