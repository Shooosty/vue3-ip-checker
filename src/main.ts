import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'


const pinia = createPinia()
const app = createApp(App)

app.use(createPinia())
app.use(VueAxios, axios)
app.use(router)
app.use(ElementPlus)

pinia.use(piniaPluginPersistedstate)

app.mount('#app')
