import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import cardkeeperPlugin from './plugins/cardkeeper-client.js'

const app = createApp(App).use(router)
app.use(router).use(cardkeeperPlugin).mount('#app')