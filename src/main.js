import { createApp } from 'vue';
import App from './App.vue'; // ✅ App.vue가 정상적으로 import되었는지 확인
import router from './router'; // ✅ router import 확인
import axios from 'axios'
import './assets/css/login.css'
import './assets/css/layout.css'

const app = createApp(App); // ✅ Vue 3에서 createApp 사용
app.use(router); // ✅ Vue Router 적용
app.mount('#app'); // ✅ #app 요소에 마운트
app.config.globalProperties.axios = axios; 