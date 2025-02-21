<template>
  <div>
    <h1>로그인 성공! 잠시만 기다려 주세요...</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getTokenFromURL();
  },
  methods: {
    getTokenFromURL() {
      // ✅ URL에서 JWT 추출
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        localStorage.setItem("accessToken", token);
        window.history.replaceState({}, document.title, "/oauth2/success"); // ✅ URL에서 토큰 제거
        this.$router.push("/"); // ✅ 홈으로 이동
      } else {
        console.error("JWT를 찾을 수 없습니다.");
        this.$router.push("/login"); // 로그인 페이지로 이동
      }
    }
  }
};
</script>