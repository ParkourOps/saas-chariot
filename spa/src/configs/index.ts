import applicationConfig from "@/_shared_/data/application-config";
import firebaseConfig from "./firebase";
import hotjarConfig from "./hotjar";
import mixpanelConfig from "./mixpanel";
import tawkConfig from "./tawk";

export default {
    ...applicationConfig,
    firebase: firebaseConfig,
    hotjar: hotjarConfig,
    mixpanel: mixpanelConfig,
    tawk: tawkConfig,
} as const;
