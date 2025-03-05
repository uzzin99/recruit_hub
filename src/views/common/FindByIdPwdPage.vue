<template>
    <div class="find-container">
      <div v-if="isVisible" class="radio-group">
        <label class="radio-label">
          <input type="radio" v-model="selectedOption" value="id" class="radio-input" />
          <span class="custom-radio"></span> 아이디 찾기
        </label>
        <label class="radio-label">
          <input type="radio" v-model="selectedOption" value="pw" class="radio-input" />
          <span class="custom-radio"></span> 비밀번호 찾기
        </label>
        <!-- <label class="radio-label">
          <input type="radio" v-model="selectedOption" value="pwdReset" class="radio-input" />
          <span class="custom-radio"></span> 비밀번호 재설정
        </label> -->
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
        <input v-model="emailForPw" type="email" placeholder="이메일을 입력하세요" class="input-field"/>
        <button v-if="emailFlag == 'false'" @click="sendResetCode" class="btn-action">인증 코드 전송</button>

        <input v-if="emailFlag == 'success'" v-model="pwForCode" type="text" placeholder="인증코드를 입력하세요" class="input-field"/>
        <button v-if="emailFlag == 'success'" @click="checkCode" class="btn-action">인증 코드 확인</button>
        <p v-if="pwResetMessage" class="error-message">{{ pwResetMessage }}</p>
      </div>

      <div v-if="selectedOption == 'pwdReset'" class="form-section">
        <h3>비밀번호 재설정</h3>
        <input v-model="resetPwd.pwd" type="password" class="input-field" placeholder="비밀번호 입력" />
        <input v-model="resetPwd.confirmPwd" type="password" class="input-field" placeholder="비밀번호 확인 입력" />
        <button @click="pwdReset" class="btn-action">비밀번호 재설정</button>
        <p v-if="pwdErrorMessage" class="error-message">{{ pwdErrorMessage }}</p>
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
      errorMessage: "", // 에러 메시지 저장
      emailFlag: "false",
      isVisible: true,
      pwdErrorMessage: "",
      resetPwd: {
        pwd: "",
        confirmPwd: "",
        email: "",
      }
    };
  },
  methods: {
    async findId() {
      try {
        const response = await this.axios.post(""+process.env.VUE_APP_API_BASE_URL+"/auth/api/user/find-id", { 
          username: this.username, 
          phone: this.phone 
        });
        this.foundId = response.data.userid;
        this.foundEmail = response.data.email;
        this.errorMessage = ""; // 에러 메시지 초기화
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorMessage = error.response.data; // 에러 메시지 설정
        } else {
          this.errorMessage = '사용자 조회에 실패했습니다.'; // 일반적인 에러 메시지
        }
      }
    },
    // 🔹 비밀번호 찾기 (이메일로 인증 코드 전송)
    async sendResetCode() {
      if (!this.emailForPw) {
        this.pwResetMessage = "이메일을 입력해주세요.";
        return;
      }

      try {
        const response = await this.axios.post(
          ""+process.env.VUE_APP_API_BASE_URL+"/email/api/send-code",
          { email: this.emailForPw }
        );
        
        this.pwResetMessage = response.data.message;
        this.errorMessage = "";
        if(response.data.flag == "success") {
          this.emailFlag = "success";
          //alert("요청하신 인증코드를 전송했습니다.");
        }
      } catch (error) {
        this.errorMessage = "이메일 전송에 실패했습니다.";
      }
    },
    //인증코드 확인 후
    async checkCode() {
      if (!this.pwForCode) {
        this.pwForCode = "인증코드를 입력해주세요.";
        return;
      }

      try {
        this.axios.post(
          ""+process.env.VUE_APP_API_BASE_URL+"/email/api/check-code",
            { code: this.pwForCode, email: this.emailForPw }
        )
        .then(response => {
          this.pwResetMessage = response.data;
          this.selectedOption = "pwdReset";
          this.isVisible = false;
          this.email = this.emailForPw;
          
        })
        .catch(error => {
          if (error.response && error.response.status == 400) {
            this.pwResetMessage = "인증 코드가 올바르지 않습니다.";
          } else {
            this.pwResetMessage = "서버에 문제가 발생했습니다.";
          }
        });
      } catch (error) {
        this.pwResetMessage = '요청 실패';
      }
    },
    //비밀번호 재설정
    async pwdReset() {
      if (!this.resetPwd.pwd || !this.resetPwd.confirmPwd) {
        this.pwdErrorMessage = "비밀번호를 입력해주세요";
        return;
      }

      this.resetPwd.email = this.email;

      try {
        await this.axios.post(""+process.env.VUE_APP_API_BASE_URL+"/auth/api/user/pwd",
          this.resetPwd,
        )
        .then(response => {
          // 성공 처리
          this.pwdErrorMessage = response.data; 
          this.$router.push('/login');
          
        })
        .catch(error => {
          if (error.response && error.response.status == 400) {
            this.pwdErrorMessage = "인증 코드가 올바르지 않습니다.";
          } else {
            this.pwdErrorMessage = "서버에 문제가 발생했습니다.";
          }
        });
      } catch (error) {
        this.pwdErrorMessage = '요청 실패';
      }
    },  
  },
};
</script>
  
  