<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form class="login-form">
      <input v-model="userid" type="text" placeholder="아이디를 입력하세요" class="input-field" ref="inputUseridElement">
      <input v-model="password" type="password" placeholder="비밀번호를 입력하세요" class="input-field" ref="inputPwdElement">
    </form>
    <div class="options">
      <label>
        <input type="checkbox" class="checkbox"> 아이디 저장
      </label>
      <router-link to="/findByIdPwd"><a href="#" class="forgot-password">아이디/비밀번호 찾기</a></router-link>
    </div>
    <div  class="error-message"></div>
    <button @click="login" class="btn-login">로그인</button>
    

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
//import { useUserStore } from "@/stores/user";

 export default {
  data() {
    return {
      user: null,
      message: '',
      userid: '',
      password: ''
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
    },

    async login() {
      //const userStore = useUserStore();
      if (!this.userid) {
        this.$refs.inputUseridElement.focus();
      } else if (!this.pwd) {
        this.$refs.inputPwdElement.focus();
      }

      try {
        const response = await this.axios.post(
          '' + process.env.VUE_APP_API_BASE_URL + '/auth/api/sign-in',
          {username : this.userid, password : this.password}
        );
        
        const token = response.data.accessToken;
        localStorage.setItem("accessToken", token);
        
        this.$router.push('/');

        this.message = '로그인 성공!';

        
      } catch (error) {
        if (error.response) {
          this.message = error.response.data;
        } else {
          this.message = '요청 실패';
        }
      }
    },
  }
};
</script>
