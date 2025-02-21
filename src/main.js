// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// createApp(App).use(router).mount('#app')
import { createApp } from 'vue';
import App from './App.vue'; // ✅ App.vue가 정상적으로 import되었는지 확인
import router from './router'; // ✅ router import 확인
import axios from 'axios';

const app = createApp(App); // ✅ Vue 3에서 createApp 사용

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true; // 쿠키 인증 정보 포함

app.config.globalProperties.$axios = axios;

app.use(router); // ✅ Vue Router 적용
app.mount('#app'); // ✅ #app 요소에 마운트