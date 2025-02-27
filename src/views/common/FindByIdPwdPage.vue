<template>
    <div class="find-container">
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" v-model="selectedOption" value="id" class="radio-input" />
          <span class="custom-radio"></span> 아이디 찾기
        </label>
        <label class="radio-label">
          <input type="radio" v-model="selectedOption" value="pw" class="radio-input" />
          <span class="custom-radio"></span> 비밀번호 찾기
        </label>
      </div>
      
      <div v-if="selectedOption == 'id'" class="form-section">
        <div v-if="!foundId && !foundEmail">
            <h3 v-if="!foundId && !foundEmail">아이디 찾기</h3>
            <input v-model="username" type="text" class="input-field" placeholder="이름 입력" />
            <input v-model="phone" type="tel" class="input-field" placeholder="전화번호 입력" />
            <button @click="findId" class="btn-action">아이디 찾기</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
        <div v-if="foundId && foundEmail">
            <p class="result-text">회원님의 아이디: {{ foundId }}</p>
            <p class="result-text">회원님의 이메일: {{ foundEmail }}</p>
            <router-link to="/login"><button class="btn-action">로그인 페이지로 이동</button></router-link>
        </div>
      </div>
      
      <div v-if="selectedOption == 'pw'" class="form-section">
        <h3>비밀번호 찾기</h3>
        <input v-model="emailForPw" type="email" class="input-field" placeholder="가입한 이메일 입력" />
        <button @click="resetPassword" class="btn-action">비밀번호 재설정 메일 발송</button>
        <p v-if="pwResetMessage" class="result-text">{{ pwResetMessage }}</p>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      selectedOption: "id",
      username: "",
      phone: "",
      email: "",
      foundId: null,
      foundEmail: null,
      emailForPw: "",
      pwResetMessage: "",
      errorMessage: "" // 에러 메시지 저장
    };
  },
  methods: {
    async findId() {
      try {
        const response = await this.axios.post(""+process.env.VUE_APP_API_BASE_URL+"/auth/api/user/find-id", { 
          username: this.username, 
          phone: this.phone 
        });
        console.log("user :: " +response.data)
        this.foundId = response.data.userid;
        this.foundEmail = response.data.email;
        this.errorMessage = ""; // 에러 메시지 초기화
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorMessage = error.response.data; // 에러 메시지 설정
        } else {
          console.error('사용자 조회 실패:', error);
          this.errorMessage = '사용자 조회에 실패했습니다.'; // 일반적인 에러 메시지
        }
      }
    },
    async resetPassword() {
      try {
        //await this.axios.post(""+process.env.VUE_APP_API_BASE_URL+"/auth/api/resetPassword", { email: this.emailForPw });
        console.log("mail :: " + this.emailForPw);
        const response = await this.axios.post(""+process.env.VUE_APP_API_BASE_URL+"/email/api/send-code", { email: this.emailForPw });
        this.pwResetMessage = response.data;
      } catch (error) {
        alert("이메일 전송에 실패했습니다.");
      }
    },
  },
};
</script>
  
  