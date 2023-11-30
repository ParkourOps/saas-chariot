import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import modalStack from './plugins/modal-stack';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(modalStack)

app.mount('#app')
