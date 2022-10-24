import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import '@fortawesome/fontawesome-free/css/all.css'
import roteador from '@/roteador/index.js'

createApp(App).use(roteador).mount('#app')
