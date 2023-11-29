import mixpanel from "mixpanel-browser";
import mixpanelConfigs from "@/configs/mixpanel";

mixpanel.init(mixpanelConfigs.projectToken, {
    debug: import.meta.env.DEV,
    persistence: "localStorage"
});

export default mixpanel;
