import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/common/LoginPage.vue';
import LoginSuccess from '@/views/common/LoginSuccess.vue';

const routes = [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/login',
      component: LoginPage
      //component: () => import('../views/About.vue')
    },
    {
      path: '/oauth2/success',
      component: LoginSuccess
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });
  
  export default router;