<template>
  <div class="register-container">
    <h2>회원가입</h2>
    <form @submit.prevent="register">
      <div>
        <input type="text" placeholder="아이디" v-model="user.userid" class="input-field" />
      </div>
      <div>
        <input type="text" placeholder="이름" v-model="user.username" class="input-field" />
      </div>
      <div>
        <input type="password" placeholder="비밀번호" v-model="user.password" class="input-field" />
      </div>
      <div>
        <input type="email" placeholder="이메일" v-model="user.email" class="input-field" />
      </div>
      <button type="submit" class="btn-register">회원가입</button>
    </form>
    <div v-if="message" class="error-message">{{ message }}</div>
    <div class="login-link">
      <a href="/login">이미 계정이 있으신가요? 로그인</a>
    </div>
  </div>
</template>
  
<script>
//import axios from 'axios';

export default {
  data() {
    return {
      user: {
        userid: '',
        username: '',
        password: '',
        email: '',
      },
      message: '',
    };
  },
  methods: {
    async register() {
      // 오류 메시지 초기화
      this.message = '';

      // 각 입력 필드별 null 체크 및 오류 메시지 설정
      if (!this.user.userid) {
        this.message = '아이디를 입력해주세요.';
      } else if (!this.user.username) {
        this.message = '이름을 입력해주세요.';
      } else if (!this.user.password) {
        this.message = '비밀번호를 입력해주세요.';
      } else if (!this.user.email) {
        this.message = '이메일을 입력해주세요.';
      }

      // 하나라도 오류가 있으면 회원가입 요청 중단
      if (this.message) {
        return;
      }

      try {
        const response = await this.axios.post(
          '' + process.env.VUE_APP_API_BASE_URL + '/auth/api/join',
          this.user,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        this.message = response.data;
        // 회원가입 성공 후 처리 (예: 로그인 페이지로 이동)
        this.$router.push('/login');
      } catch (error) {
        if (error.response) {
          this.message = error.response.data;
        } else {
          this.message = '요청 실패';
        }
      }
    },
  },
};
</script>