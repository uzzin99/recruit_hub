<template>
  <div id="app">
    <HeaderPage></HeaderPage>
    <router-view></router-view>
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