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

export const getRecommend = (payload) => ({
  type: GET_RECOMMEND,
  payload,
});

export const followingUser = (payload) => ({
  type: FOLLOWING_USER,
  payload,
});

export const searchUser = (payload) => ({
  type: SEARCH_USER,
  payload,
});

// 초기값
const initialState = {
  list: [],
};

// 미들웨어

// export const _loginFX = (email, password) => {
//   console.log("로그인 정보", email, password);
//   return function (dispatch, getState, { history }) {
//     apis
//       .login(email, password)
//       .then((res) => {
//         console.log(res);

//         if (res.data.result === false) {
//           history.replace("/login");
//           return window.alert(res.data.message);
//         }

//         setCookie("ACCESS_TOKEN", res.data.atoken, 1);
//         setCookie("REFRESH_TOKEN", res.data.rtoken, 1);
//         localStorage.setItem("userId", res.data.userId);

//         dispatch(
//           logIn({
//             email: res.data.email,
//             nickname: res.data.nickname,
//             userId: res.data.userId,
//             profileImageUrl: res.data.profileImageUrl,
//           })
//         );
//         history.replace("/");
//       })

//       .catch((error) => {
//         console.log(error);
//         // alert(error.response.data.message);
//       });
//   };
// };

// export const kakaoLogin = (code) => {
//   return function (dispatch, getState, { history }) {
//     console.log(code);
//     axios
//       .get("http://localhost:3000/login/kakao?code=${code}")
//       .then((res) => {
//         console.log("카카오 로그인 성공", res);
//         // const token = res.data.token;
//         // const userId = res.data.userId;
//         // const snsId = res.data.snsId;
//         // localStorage.setItem("token", token); //예시로 로컬에 저장
//         // localStorage.setItem("userId", userId);
//         // localStorage.setItem("snsId", snsId);
//         // localStorage.setItem("newChat", "false");
//         // localStorage.setItem("mainNotice", "false");
//         // dispatch(checkUserDB());
//         // window.location.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
//       })
//       .catch((err) => {
//         console.log("카카오 로그인 에러", err);
//         // window.alert("로그인에 실패하였습니다.");
//         // window.location.replace("/"); // 로그인 실패하면 로그인화면으로 보내기
//       });
//   };
// };

export const kakaoLogin = (authorization_code) => {
  return async (dispatch, getState, { history }) => {
    console.log(authorization_code);
    await api
      .get(`user/kakao/callback?code=${authorization_code}`)
      .then((res) => {
        console.log(res);
        // const accessToken = "Bearer " + res.data.token;
        // setCookie('is_login', `${accessToken}`);
        // const {nickname} = jwt_decode(res.data.token);
        history.replace("/");
        // dispatch(setKakao(
        //     {nickname: nickname}
        // ))
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const naverLoginDB = (code, state) => {
  return async (dispatch, getState, { history }) => {
    console.log(code, state);
    await api
      .get(`user/naver/callback?code=${code}&state=${state}`)
      .then((res) => {
        console.log(res);
        // const accessToken = "Bearer " + res.data.token;
        // setCookie('is_login', `${accessToken}`);
        // const {nickname} = jwt_decode(res.data.token);
        history.replace("/");
        // dispatch(setKakao(
        //     {nickname: nickname}
        // ))
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, draft, action.payload);
        draft.user = action.payload;
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, draft, action.payload);
        draft.user = null;
        draft.is_login = false;
      }),

    [GET_RECOMMEND]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.recommend = action.payload;
      }),

    [SEARCH_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.search_user = action.payload;
      }),

    [FOLLOWING_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, action.payload);
        draft.recommend.map((e) => {
          if (action.payload === e.userId) {
            return (e.following_edit = !e.following_edit);
          }
        });
      }),
  },
  initialState
);
