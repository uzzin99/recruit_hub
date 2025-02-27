<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form class="login-form">
      <input type="text" placeholder="아이디" class="input-field">
      <input type="password" placeholder="비밀번호" class="input-field">
    </form>
      <div class="options">
        <label>
          <input type="checkbox" class="checkbox"> 아이디 저장
        </label>
        <router-link to="/findByIdPwd"><a href="#" class="forgot-password">아이디/비밀번호 찾기</a></router-link>
      </div>

      <button class="btn-login">로그인</button>

      <div class="separator">간편로그인</div>

      <div class="social-login">
        <button @click="loginWithNaver" class="btn-naver">네이버 로그인</button>
        <button @click="loginWithKakao" class="btn-kakao">카카오 로그인</button>
        <button @click="loginWithGoogle" class="btn-google">구글 로그인</button>
      </div>

      <div class="register-link">
        아직 회원이 아니신가요? <router-link to="/join">회원가입</router-link>
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
  methods: {
    loginWithGoogle() {
      const backendUrl = ""+process.env.VUE_APP_API_BASE_URL+"/oauth2/authorization/google";
      window.location.href = backendUrl;
    },
    loginWithKakao() {
      const backendUrl = ""+process.env.VUE_APP_API_BASE_URL+"/oauth2/authorization/kakao";
      window.location.href = backendUrl;
    },
    loginWithNaver() {
      const backendUrl = ""+process.env.VUE_APP_API_BASE_URL+"/oauth2/authorization/naver";
      window.location.href = backendUrl;
    }
  },
  
};
</script>
