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
import { useUserStore } from "@/stores/user";

export default {
  setup() {
    const userStore = useUserStore();

    const logout = () => {
      localStorage.removeItem("accessToken");
      userStore.setUser(null); // 사용자 정보 초기화
      this.$router.push("/login");
    };

    userStore.fetchUser().catch((error) => {
      console.error("유저 정보를 가져오는 데 실패했습니다.", error);
    });

    return {
      user: userStore.user,
      logout,
    };
  },
};

  //import api from "@/api";

  // export default {
  //   data() {
  //     return {
  //       user: null,
  //     };
  //   },
  //   async created() {
  //     try {
  //       const response = await api.get("/user/api/userInfo"); // 유저 정보 API 호출
  //       this.user = response.data;
  //     } catch (error) {
  //       console.error("유저 정보를 가져오는 데 실패했습니다.", error);
  //     }
  //   },
  //   methods: {
  //   logout() {
  //       localStorage.removeItem('accessToken');
  //       this.$router.push('/login');
  //     },
  //   },
  // };
</script>
