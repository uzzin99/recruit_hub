<template>
  <div id="app">
    <HeaderPage></HeaderPage>
    
    <!-- 메인 콘텐츠 -->
    <main class="main-content">
      <router-view/>
    </main>
    <!-- //메인 콘텐츠 -->

    <FooterPage></FooterPage>
  </div>
</template>

<script>
import HeaderPage from '@/views/layout/HeaderPage.vue'
import FooterPage from '@/views/layout/FooterPage.vue'

export default {
  name: 'App',
  components: {
    HeaderPage,
    FooterPage,
  }
}
</script>