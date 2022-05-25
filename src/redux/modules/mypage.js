import { handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";
import { deleteCookie } from "../../shared/Cookie";
import swal from "sweetalert";
import axios from "axios";

// actions
const RESET_INFORMATION = "RESET_INFORMATION";
const GET_PROFILE = "GET_PROFILE";
const GET_RUNNING = "GET_RUNNING";
const GET_MYRUNNING = "GET_MYRUNNING";
const GET_INFORMATION = "GET_INFORMATION";
const EDIT_PROFILE = "EDIT_PROFILE";
const NUMBER_CHECK = "NUMBER_CHECK";
const GETNUMBER_CHECK = "GETNUMBER_CHECK";
const GET_EVALUATION = "GET_EVALUATION";
const PATCH_EVALUATION = "PATCH_EVALUATION";
const GET_ATTEND = "GET_ATTEND";
const PATCH_ATTEND = "PATCH_ATTEND";
const DELETE_USER = "DELETE_USER";

//action creators
export const resetProfile = (payload) => ({
  type: RESET_INFORMATION,
  payload,
});

export const getProfile = (payload) => ({
  type: GET_PROFILE,
  payload,
});

export const getRunning = (payload) => ({
  type: GET_RUNNING,
  payload,
});

export const getMyRunning = (payload) => ({
  type: GET_MYRUNNING,
  payload,
});

export const getInformation = (payload) => ({
  type: GET_INFORMATION,
  payload,
});

export const editProfile = (payload) => ({
  type: EDIT_PROFILE,
  payload,
});

export const numberCheck = (payload) => ({
  type: NUMBER_CHECK,
  payload,
});

export const getNumberCheck = (payload) => ({
  type: GETNUMBER_CHECK,
  payload,
});

export const getEvaluation = (payload) => ({
  type: GET_EVALUATION,
  payload,
});

export const patchEvaluation = (payload) => ({
  type: PATCH_EVALUATION,
  payload,
});

export const getAttend = (payload) => ({
  type: GET_ATTEND,
  payload,
});

export const patchAttend = (payload) => ({
  type: PATCH_ATTEND,
  payload,
});

export const deleteUser = (payload) => ({
  type: DELETE_USER,
  payload,
});

//initialState
const initialState = {
  list: [],
  group: [],
  mygroup: [],
  phoneNumber: [],
  info: [],
  host: [],
  evaluation: [],
  attend: [],
  att: [],
};

// middleware actions

//프로필 가져오기
export const getProfileDB = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
      //console.log(userId);
      const { data } = await api.get(`/auth/info/${userId}`);
      //console.log(data.data);
      dispatch(getProfile(data.data));
    } catch (error) {
      // console.log(error);
    }
  };
};

//참여완료 그룹 러닝
export const getRunningDB = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get(`/group/complete?userId=${userId}`);
      dispatch(getRunning(data));
    } catch (error) {
      // console.log(error);
    }
  };
};

//내가만든 그룹 러닝
export const getMyRunningDB = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get(`/group/mypage?userId=${userId}`);
      dispatch(getMyRunning(data));
    } catch (error) {
      // console.log(error);
    }
  };
};

//회원정보 수정페이지 기본값
export const getInformationDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get(`/auth/updateUser`);
      dispatch(getInformation(data.data));
    } catch (error) {
      // console.log(error);
    }
  };
};

//회원정보 수정
export const editProfileDB = (
  userId,
  nickname,
  image,
  bio,
  likeLocation,
  likeDistance,
  userLevel,
  phone,
  agreeSMS
) => {
  return async function (dispatch, getState, { history }) {
    try {
      const formData = new FormData();

      formData.append("nickname", nickname);
      formData.append("image", image);
      formData.append("bio", bio);
      formData.append("likeLocation", likeLocation);
      formData.append("likeDistance", likeDistance);
      formData.append("userLevel", userLevel);
      formData.append("phone", phone);
      formData.append("agreeSMS", agreeSMS);
      const { data } = await api.patch(`/auth/updateUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history.push(`/mypage/${userId}`);
    } catch (error) {
      // console.log(error);
    }
  };
};

//핸드폰 인증
export const numberCheckMiddleware = (phone) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.post(`/user/message`, {
        tel: phone,
      });
      swal("인증번호가 발송 되었습니다");
    } catch (error) {
      // console.log(error);
      swal(error.message);
    }
  };
};

//인증번호 인증
export const getNumberCheckMiddleware = (phone, numberCK) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.post(`/user/verify`, {
        tel: phone,
        code: numberCK,
      });
      swal(data.message);
    } catch (error) {
      // console.log(error);
      swal(error.message);
    }
  };
};

//호스트 정보
export const getEvaluationDB = (groupId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get(`/group/evaluation/${groupId}`);
      dispatch(getEvaluation(data));
    } catch (error) {
      // console.log(error);
    }
  };
};

// 호스트 평가
export const evaluationDB = (groupId, hostId, point, evaluationCategory, userId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const formData = new FormData();

      formData.append("hostId", hostId);
      formData.append("point", point);
      formData.append("evaluationCategory", evaluationCategory);

      const { data } = await api.patch(
        `/group/evaluation/${groupId}`,
        {
          hostId: hostId,
          point: point,
          evaluationCategory: evaluationCategory,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      swal("호스트 평가가 완료되었습니다!");
      history.push(`/mypage/${userId}`);
    } catch (error) {
      // console.log(error);
    }
  };
};

//출석체크 리스트
export const getAttendDB = (groupId, userId, hostId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get(`/group/attendance/${groupId}`);
      dispatch(getAttend(data));
    } catch (error) {
      // console.log(error);
      swal(error.message);
    }
  };
};

// 출석체크
export const patchAttendDB = (groupId, userId, id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const formData = new FormData();

      localStorage.removeItem("from");

      formData.append("attendance", userId);

      const { data } = await api.patch(
        `/group/attendance/${groupId}`,
        { attendance: userId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      swal("출석체크가 완료되었습니다!");
      history.push(`/mypage/${id}`);
    } catch (error) {
      // console.log(error);
    }
  };
};

//회원 탈퇴
export const deleteUserDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.delete(`/user/delete`);
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      localStorage.clear();

      swal("회원탈퇴에 성공하였습니다");

      history.push("/login");
      dispatch(deleteUser());
    } catch (error) {
      // console.log(error);
    }
  };
};

//reducer

export default handleActions(
  {
    [RESET_INFORMATION]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [];
        draft.group = [];
        draft.mygroup = [];
        draft.info = [];
      }),

    [GET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload;
      }),

    [GET_RUNNING]: (state, action) =>
      produce(state, (draft) => {
        draft.group = action.payload;
      }),

    [GET_MYRUNNING]: (state, action) =>
      produce(state, (draft) => {
        draft.mygroup = action.payload;
      }),

    [GET_INFORMATION]: (state, action) =>
      produce(state, (draft) => {
        draft.info = action.payload;
      }),

    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.nickname;
        draft.list = action.payload.image;
        draft.list = action.payload.bio;
        draft.list = action.payload.likeLocation;
        draft.list = action.payload.likeDistance;
        draft.list = action.payload.userLevel;
        draft.list = action.payload.phone;
        draft.list = action.payload.agreeSMS;
      }),

    [NUMBER_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.phoneNumber = action.payload;
      }),

    [GETNUMBER_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.phoneNumber = action.payload;
      }),

    [GET_EVALUATION]: (state, action) =>
      produce(state, (draft) => {
        draft.host = action.payload;
      }),

    [PATCH_EVALUATION]: (state, action) =>
      produce(state, (draft) => {
        draft.evaluation = action.hostId;
        draft.evaluation = action.point;
        draft.evaluation = action.evaluationCategory;
      }),

    [GET_ATTEND]: (state, action) =>
      produce(state, (draft) => {
        draft.attend = action.payload;
      }),

    [PATCH_ATTEND]: (state, action) =>
      produce(state, (draft) => {
        draft.att = action.attendance;
      }),

    [DELETE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user.nickname = null;
        draft.user.userId = null;
        draft.user.profileUrl = null;
        draft.isLogin = false;
        draft.firstLogin = false;
      }),
  },
  initialState
);
