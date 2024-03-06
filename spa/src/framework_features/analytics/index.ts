import hotjar from "@hotjar/browser";
import mixpanel, { type Dict } from "mixpanel-browser";
import configs from "@/configs";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { TrackableEventName, TrackableEventProps, TrackableEvents } from "./data/trackable-events";
import trackableEvents from "./data/trackable-events";

export const useAnalytics = defineStore("Analytics", () => {
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

    function _trackEvent(eventName: string, properties?: Dict) {
        mixpanel.track(eventName, properties);
        hotjar.event(eventName);
    }

    const trackEvent = <TName extends TrackableEventName>(eventName: TName) => (...eventArgs: Parameters<TrackableEvents[TName]>) => {
        const eventProps = (trackableEvents[eventName] as (...args: unknown[])=>TrackableEventProps<TName>)(...(eventArgs as unknown[]));
        _trackEvent(eventName, eventProps);
    };

    return {
        setIdentity: (userId: string) => setIdentity(userId),
        resetIdentity: () => setIdentity(),
        trackEvent,
    };
});
