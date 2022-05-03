// import { apis, api } from "../../shared/Api";

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
    console.log(authorization_code);
    api
      .get(`user/kakao/callback?code=${authorization_code}`)
      .then((res) => {
        console.log(res);

        // const userId = res.data.userId;
        // const nickname = res.data.nickname;
        // const profileImageUrl = res.data.profileImageUrl;

        setCookie("accessToken", res.data.token, 0.5);
        setCookie("refreshToken", res.data.refreshToken, 1);

        // localStorage.setItem("userId", userId);
        // localStorage.setItem("nickname", nickname);
        // localStorage.setItem("profileImageUrl", profileImageUrl);

        dispatch(
          logIn({
            nickname: res.data.nickname,
            userId: res.data.userId,
            profileImageUrl: res.data.profileImageUrl,
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
        console.log(res);
        // const userId = res.data.userId;
        // const nickname = res.data.nickname;
        // const profileImageUrl = res.data.profileImageUrl;

        setCookie("accessToken", res.data.token, 0.5);
        setCookie("refreshToken", res.data.refreshToken, 1);

        // localStorage.setItem("userId", userId);
        // localStorage.setItem("nickname", nickname);
        // localStorage.setItem("profileImageUrl", profileImageUrl);

        dispatch(
          logIn({
            nickname: res.data.nickname,
            userId: res.data.userId,
            profileImageUrl: res.data.profileImageUrl,
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
    api
      .get("")
      .then((res) => {
        console.log(res);

        dispatch(
          logIn({
            email: res.data.email,
            nickname: res.data.nickname,
            userId: res.data.userId,
            profileImageUrl: res.data.profileImageUrl,
          })
        );
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
    localStorage.removeItem("profileImageUrl");

    dispatch(logOut());
    history.push("/");
  };
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user.nickname = action.payload.nickname;
        draft.user.userId = action.payload.userId;
        draft.user.profileImageUrl = action.payload.profileImageUrl;
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user.nickname = null;
        draft.user.userId = null;
        draft.user.profileImageUrl = null;
        draft.is_login = false;
      }),
  },
  initialState
);
