import axios from "axios";
import { api } from "../../shared/Api";

import { produce } from "immer";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import { handleActions } from "redux-actions";

// Action
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_RECOMMEND = "GET_RECOMMEND";
const FOLLOWING_USER = "FOLLOWING_USER";
const SEARCH_USER = "SEARCH_USER";

// Action creators
export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logOut = (payload) => ({
  type: LOG_OUT,
  payload,
});

// 초기값
const initialState = {
  isLogin: false,
  user: {
    nickname: null,
    userId: null,
    profileImageUrl: null,
  },
};

// 미들웨어
export const kakaoLogin = (authorization_code) => {
  return (dispatch, getState, { history }) => {
    api
      .get(`user/kakao/callback?code=${authorization_code}`)
      .then((res) => {
        const userId = res.data.userId;
        const nickname = res.data.nickname;
        const profileUrl = res.data.profileUrl;

        setCookie("accessToken", res.data.token, 0.5);
        setCookie("refreshToken", res.data.refreshToken, 1);

        localStorage.setItem("userId", userId);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("profileUrl", profileUrl);

        dispatch(
          logIn({
            nickname: nickname,
            userId: userId,
            profileUrl: profileUrl,
          })
        );
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const naverLoginDB = (code, state) => {
  return (dispatch, getState, { history }) => {
    console.log(code, state);
    api
      .get(`user/naver/callback?code=${code}&state=${state}`)
      .then((res) => {
        const userId = res.data.userId;
        const nickname = res.data.nickname;
        const profileUrl = res.data.profileUrl;

        setCookie("accessToken", res.data.token, 2);
        setCookie("refreshToken", res.data.refreshToken, 2);

        localStorage.setItem("userId", userId);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("profileUrl", profileUrl);

        dispatch(
          logIn({
            nickname: nickname,
            userId: userId,
            profileUrl: profileUrl,
          })
        );
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    console.log("로그인 체크 DB");
    api
      .get("/user/auth")
      .then((res) => {
        console.log(res);
        if (res.data) {
          dispatch(
            logIn({
              nickname: res.data.nickname,
              userId: res.data.userId,
              profileUrl: res.data.profileUrl,
            })
          );
        } else {
          dispatch(logoutDB());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(logoutDB());
      });
  };
};

export const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");
    localStorage.removeItem("profileUrl");

    dispatch(logOut());
    window.alert("로그아웃 시간이 만료되었습니다.");
    history.push("/login");
  };
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user.nickname = action.payload.nickname;
        draft.user.userId = action.payload.userId;
        draft.user.profileUrl = action.payload.profileImageUrl;
        draft.isLogin = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user.nickname = null;
        draft.user.userId = null;
        draft.user.profileUrl = null;
        draft.isLogin = false;
      }),
  },
  initialState
);
