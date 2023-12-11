import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import modalStack from './plugins/modal-stack'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(modalStack)

// add tawk.to (Tawk messenger)
import TawkMessenger from '@tawk.to/tawk-messenger-vue-3';
import tawkConfigs from './configs/tawk'
app.use(TawkMessenger, {
    propertyId: tawkConfigs.propertyId,
    widgetId: tawkConfigs.widgetId
})

// mount
app.mount('#app')
