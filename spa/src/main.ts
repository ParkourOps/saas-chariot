import "@/assets/styles/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import modals from "@/plugins/modal-stack";
import toasts from "./plugins/toast-stack";
import alerts from "./plugins/alert-stack";
import reactiveUserInterface from "./plugins/reactive-user-interface";

import { createHead } from "@unhead/vue";
const head = createHead();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(head);
app.use(modals);
app.use(toasts);
app.use(alerts);
app.use(reactiveUserInterface);

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
