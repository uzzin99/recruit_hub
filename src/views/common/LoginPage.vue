<template>
  <div class="login-container">
    <h3>OAuth2 로그인페이지 입니다.</h3>
    <button @click="loginWithGoogle" class="btn-blue">Google 로그인</button>
    <button @click="loginWithKakao" class="btn-yellow">Kakao 로그인</button>
    <button @click="loginWithNaver" class="btn-green">Naver 로그인</button>
    <div v-if="user">
      <h3>로그인에 성공했습니다. 환영합니다.</h3>
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
    },

  },
  
};
</script>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 50px auto; /* 위아래 마진 추가 */
  padding: 30px; /* 패딩 값 증가 */
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-container h3 {
  margin-bottom: 30px; /* 제목 아래쪽 마진 증가 */
}

.login-container button {
  margin-bottom: 20px; /* 버튼 간 간격 증가 */
  width: 100%;
}

.btn-blue {
  background-color: #4285f4; /* Google 파란색 */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px; /* 버튼 모서리 둥글게 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
}

.btn-blue:hover {
  background-color: #357ae8; /* Hover 시 약간 더 진한 파란색 */
}

.btn-green {
  background-color: #00c73c; /* 네이버 초록색 */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px; /* 버튼 모서리 둥글게 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
}

.btn-green:hover {
  background-color: #00b335; /* Hover 시 약간 더 진한 초록색 */
}

.btn-yellow {
  background-color: #f7e01b; /* 카카오 노란색 */
  color: #3c1e1e; /* 카카오 로고 색상 */
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px; /* 버튼 모서리 둥글게 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
}

.btn-yellow:hover {
  background-color: #f0d408; /* Hover 시 약간 더 진한 노란색 */
}
</style>