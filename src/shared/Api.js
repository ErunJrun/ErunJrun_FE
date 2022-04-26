import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "./Cookie";
import { history } from "../redux/configureStore";
import { logIn, _loginCheckFX } from "../redux/modules/user";

// axios.defaults.withCredentials = true;

export const api = axios.create({
  // 실제 베이스 유알엘
  baseURL: process.env.BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const atoken = getCookie("ACCESS_TOKEN");
  const rtoken = getCookie("REFRESH_TOKEN");

  config.headers.common["Authorization"] = `Bearer ${atoken}`;
  config.headers.common["reAuthorization"] = `Bearer ${rtoken}`;

  return config;
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const { config, response } = error;

//     const originalRequest = config;
//     // const dispatch = useDispatch();

//     // if (status == undefined) {
//     //   return dispatch(_loginCheckFX());
//     // }

//     if (response?.status === 401) {
//       if (response?.data.atoken) {
//         console.log(response);
//         setCookie("ACCESS_TOKEN", response.data.atoken);
//         originalRequest.headers.Authorization = `Bearer ${response.data.atoken}`;
//         return axios(originalRequest);
//       } else {
//         deleteCookie("ACCESS_TOKEN");
//         deleteCookie("REFRESH_TOKEN");
//         localStorage.removeItem("userId");
//         window.alert("로그인 후 이용해 주세요");
//         return history.push("/login");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export const apis = {
  login: (email, password) =>
    api.post("/api/users/login", { email: email, password: password }),

  signup: (email, nickname, password) =>
    api.post("/api/users/signup", {
      email: email,
      nickname: nickname,
      password: password,
    }),

  loginCheck: () => api.get("/api/users/auth"),

  //댓글
  getComment: (postId) => api.get(`/api/comment/${postId}`, {}),

  addComment: (postId, content) =>
    api.post(`/api/comments/${postId}`, { content: content }),

  // deleteComment: (commentId) => api.delete(`/api/comment/${commentId}`, {}),
};
