import { handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";
import axios from "axios";

// actions
const GET_PROFILE = "GET_PROFILE";
const GET_RUNNING = "GET_RUNNING";
const GET_MYRUNNING = "GET_MYRUNNING";
const GET_INFORMATION = "GET_INFORMATION";
const EDIT_PROFILE = "EDIT_PROFILE";
const NUMBER_CHECK = "NUMBER_CHECK";
const GETNUMBER_CHECK = "GETNUMBER_CHECK";
const GET_EVALUATION = "GET_EVALUATION";
// const PATCH_EVALUATION = "PATCH_EVALUATION";


// //action creators
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

// export const patchEvaluation = (payload) => ({
//   type: PATCH_EVALUATION,
//   payload,
// });

  
//initialState
const initialState = {
  list: [],
  group:[],
  mygroup:[],
  phoneNumber: [],
  info: [],
  host:[],
  // evaluation:[],
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
        console.log(error);
        window.alert(error);
      }
    };
  };

//참여완료 그룹러닝
export const getRunningDB = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
        //console.log(userId);
        const { data } = await api.get(`/group/complete?userId=${userId}`);
        //console.log(data);
        dispatch(getRunning(data));
    } catch (error) {
        console.log(error);
        window.alert(error);
    }
  };
};

//내가만든 그룹러닝
export const getMyRunningDB = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
        //console.log(userId);
        const { data } = await api.get(`/group/mypage?userId=${userId}`);
        //console.log(data);
        dispatch(getMyRunning(data));
    } catch (error) {
        console.log(error);
        window.alert(error);
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
        window.alert(error);
    }
  };
};

//회원정보 수정
export const editProfileDB = (userId, nickname, image, bio, likeLocation, likeDistance, userLevel, phone, agreeSMS) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(
        userId, nickname, image, bio, likeLocation, likeDistance, userLevel, phone, agreeSMS
      );
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
     // console.log(data);
      history.push("/mypage");
    } catch (error) {
      console.log(error);
    }
  };
};

//핸드폰 인증
export const numberCheckMiddleware = (phone) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(phone);
        const { data } = await api.post(`/user/message`, {  
            tel: phone 
        });
        console.log(data);
        
    } catch (error) {
        console.log(error);
        window.alert(error);
    }
  };
};

//인증번호 인증
export const getNumberCheckMiddleware = (phone, numberCK) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(phone, numberCK);
        const { data } = await api.post(`/user/verify`, {  
            tel: phone,
            code: numberCK 
        });
        console.log(data);
      
    } catch (error) {
        console.log(error);
        window.alert(error);
    }
  };
};

//호스트 정보 
export const getEvaluationDB = (groupId, hostId, userId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(groupId,hostId,userId);
      let data
      if (hostId !== userId) {
        data = await api.get(`/group/evaluation/${groupId}`);
        console.log(data);
        dispatch(getEvaluation(data));
      }
      
    } catch (error) {
      console.log(error);
      //window.alert(error);
    }
  };
};

//호스트 평가 
// export const evaluationDB = (groupId, userId, point) => {
//   return async function (dispatch, getState, { history }) {
//     try {
//       console.log(groupId, userId);
//       const formData = new FormData();
      
//       formData.append("userId", userId);
//       formData.append("point", point);
  
//       const { data } = await api.patch(`/group/evaluation/${groupId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log(data);
//       history.push("/mypage");
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

//reducer

export default handleActions(
  {
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
      console.log(action.payload);
      draft.info = action.payload;
    }),

    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
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
        console.log(action.payload);
        draft.phoneNumber = action.payload;
      }),

      [GETNUMBER_CHECK]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.phoneNumber = action.payload;
      }),

      [GET_EVALUATION]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.host = action.payload;
      }),

      // [PATCH_EVALUATION]: (state, action) =>
      // produce(state, (draft) => {
      //   console.log(action.payload);
      //   draft.evaluation = action.payload;
      // }),
  },
  initialState
);
