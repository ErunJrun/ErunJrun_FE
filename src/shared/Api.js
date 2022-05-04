import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "./Cookie";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { logoutDB } from "../redux/modules/user";

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
    const dispatch = useDispatch();

    console.log("토큰 인터셉터", error);

    if (response?.status === 401) {
      if (response?.data.token) {
        console.log(response);
        setCookie("accessToken", response.data.token);
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;

        return axios(originalRequest);
      } else {
        return dispatch(logoutDB());
      }
    }
    return Promise.reject(error);
  }
);
