import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import PhosphorIcons from "@phosphor-icons/vue"
import ChatApp from './components/ChatBox.vue';

createApp(ChatApp).mount('#app');

const app = createApp(App)

app.use(PhosphorIcons)

app.use(router)

app.mount('#app')
