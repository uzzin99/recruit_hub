import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // 백엔드 API 주소
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 : JWT 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 : accessToken 만료 시 자동 갱신
// api.interceptors.response.use{
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status == 401) {
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//       }
//     }
//   }

  
// }

export default api;