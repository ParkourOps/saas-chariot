import hotjar from "@hotjar/browser";
import mixpanel, { type Dict } from "mixpanel-browser";
import configs from "@/configs";
import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("Analytics", () => {
    const initialised = ref(false);

    function initialise() {
        // initialise Mixpanel
        mixpanel.init(configs.mixpanel.projectToken, {
            debug: import.meta.env.DEV,
            persistence: "localStorage",
        });
        // initialise Hotjar
        hotjar.init(parseInt(configs.hotjar.siteId), parseInt(configs.hotjar.version), {
            debug: import.meta.env.DEV,
        });
        // report success
        initialised.value = true;
        console.debug("Analytics initialised.");
    }

    function setIdentity(userId?: string) {
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
        setIdentity: (userId: string) => setIdentity(userId),
        resetIdentity: () => setIdentity(),
        trackEvent,
    };
});
