import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import cardkeeperPlugin from './plugins/cardkeeper-client.js'
import {NSpin} from 'naive-ui'

const app = createApp(App)
app.component('NSpin', NSpin)
app.use(router)
    .use(cardkeeperPlugin)
    .mount('#app')