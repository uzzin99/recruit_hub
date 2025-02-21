<template>
  <div class="container">
    <h1>메인페이지</h1>
    <div v-if="user">
      <h2>환영합니다, {{ user.email }}님!</h2>
      <p>이름: {{ user.username }}</p>
      <button @click="logout">로그아웃</button>
    </div>
    <div v-else>
      <p>로그인이 필요합니다.</p>
      <router-link to="/login">
        <button class="btn-pink">로그인 페이지로 이동</button>
      </router-link>
    </div>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        user: null,
      };
    },
    async mounted() {
      this.fetchUser();
    },
    methods: {
      async fetchUser() {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
  
        try {
          const response = await this.$axios.get("http://localhost:8080/auth/api/user", {
            headers: { Authorization: `Bearer ${token}` }, // ✅ API 요청 시 JWT 포함
          });
          this.user = response.data;
        } catch (error) {
          console.error("유저 정보 가져오기 실패", error);
        }
      },
      logout() {
        localStorage.removeItem("accessToken");
        this.user = null;
      }
    }
  };
</script>
<style>
.container {
    text-align: center;
    margin-top: 50px;
}
.btn-pink {
  background-color: #fa9cd0;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.btn-pink:hover {
  background-color: #f87cc0;
}
</style>