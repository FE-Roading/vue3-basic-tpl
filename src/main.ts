import { createApp } from 'vue'
import router from './router'
// @ts-ignore
import App from './App.vue'
import { store } from "@/store"

import './style.css'

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
