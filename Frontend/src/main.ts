import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
