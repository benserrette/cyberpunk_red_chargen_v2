/**
 * Application entry point that mounts the Vue app.
 *
 * This file wires up global concerns (Pinia, router, base styles) before
 * mounting the root App component that coordinates the UI.
 */
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
