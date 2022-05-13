import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "./Cookie";

import { history } from "../redux/configureStore";

// axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  // console.log("액세스", token, "리프레쉬", refreshToken);

  config.headers.common["Authorization"] = `Bearer ${token}`;
  config.headers.common["reAuthorization"] = `Bearer ${refreshToken}`;

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response.data.token) {
      // access token이 재발급 된 상태,
      console.log(response);
      setCookie("accessToken", response.data.token, 1);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      originalRequest.headers.Authorization = `Bearer ${response.data.token}`;

      return axios(originalRequest);
    }

    if (response.data.success === false) {
      window.alert(response.data.message);
    }

    // else {
    //   console.log(response);
    //   deleteCookie("accessToken");
    //   deleteCookie("refreshToken");
    //   localStorage.removeItem("userId");
    //   localStorage.removeItem("nickname");
    //   localStorage.removeItem("profileUrl");
    //   window.alert("로그인 시간이 만료되었습니다.");
    //   console.log("리프레쉬토큰 만료");
    //   history.push("/login");
    // }

    return Promise.reject(error);
  }
);
