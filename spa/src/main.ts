import "@/assets/styles/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import modalStack from "@/plugins/modal-stack";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(modalStack);

// register global components
import { registerComponents } from "@/components";
registerComponents(app);

// import configs from "@/configs";

// add tawk.to (Tawk messenger)
// import TawkMessenger from '@tawk.to/tawk-messenger-vue-3'
// app.use(TawkMessenger, {
//     propertyId: configs.tawk.propertyId,
//     widgetId: configs.tawk.widgetId
// });

// mount
app.mount("#app");
