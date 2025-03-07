// import { defineStore } from "pinia";
// import api from "@/api"; // API 호출 모듈 (axios)

// export const useUserStore = defineStore("user", {
//   state: () => ({
//     user: null, // 유저 정보 저장
//   }),
//   actions: {
//     async fetchUser() {
//       try {
//         const response = await api.get("/user/api/userInfo");
//         this.user = response.data;
//         console.log("11111"+this.user)
//       } catch (error) {
//         console.error("유저 정보를 가져오는 데 실패했습니다.", error);
//       }
//     },
//     setUser(userData) {
//       this.user = userData;
//     },
//     logout() {
//       this.user = null;
//     },
//   },
//   persist: true, // 새로고침해도 유지
// });