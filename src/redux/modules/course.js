import { handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";
import swal from "sweetalert";

//액션

const RESET_COURSE = "RESET_COURSE";
const ADD_COURSE = "ADD_COURSE";
const GET_COURSE = "GET_COURSE";
const DELETE_COURSE = "DELETE_COURSE";
const EDIT_COURSE = "EDIT_COURSE";
const GET_COURSE_DETAIL = "GET_COURSE_DETAIL";
const EDIT_COURSE_CONTENT = "EDIT_COURSE_CONTENT";

const LOADING = "LOADING";

//initialState
const initialState = {
  list: [],
  preferData: [],
  detail: {
    mapLatLng: [
      { lat: 37.498004414546934, lng: 127.02770621963765 },
      { lat: 37.6, lng: 127.4 },
    ],
  },
  paging: { page: 1, size: 3 },
  isLoading: false,
};

//액션생성함수
export const resetCourse = () => ({
  type: RESET_COURSE,
});

export const addCourse = (payload) => ({
  type: ADD_COURSE,
  payload,
});

export const getCourse = (feedList, paging) => ({
  type: GET_COURSE,
  feedList,
  paging,
});

export const getCourseDetail = (payload) => ({
  type: GET_COURSE_DETAIL,
  payload,
});

export const deleteCourse = (payload) => ({
  type: DELETE_COURSE,
  payload,
});

export const editCourse = (payload) => ({
  type: EDIT_COURSE,
  payload,
});

export const editCourseContent = (payload) => ({
  type: EDIT_COURSE_CONTENT,
  payload,
});

export const loading = (payload) => ({
  type: LOADING,
  payload,
});

//미들웨어
export const getCourseDB = (region = 0, sort = "new", page = 1, size = 3) => {
  return async function (dispatch, getState, { history }) {
    console.log(region, sort);

    try {
      const { data } = await api.get(
        `/course/all?region=${region}&sort=${sort}&page=${page}&size=${size}`
      );
      console.log(data);
      // console.log(data.data.length);
      // let paging = {
      //   page: data.data.length === size ? page + 1 : null,
      //   size: size,
      // };
      // console.log(paging);
      // dispatch(getGroup(data, paging));
    } catch (error) {
      console.log(error);
    }
  };
};

// export const getGroupDetailDB = (groupId) => {
//   return async function (dispatch, getState, { history }) {
//     try {
//       console.log(groupId);
//       const { data } = await api.get(`/group/detail/${groupId}`);
//       console.log(data.data);
//       dispatch(getGroupDetail(data.data));
//     } catch (error) {
//       console.log(error);
//       swal("해당 게시물이 존재하지 않습니다");
//     }
//   };
// };

// export const addGroupDB = (
//   mapLatLng,
//   thumbnail,
//   contents,
//   address,
//   distance
// ) => {
//   return async function (dispatch, getState, { history }) {
//     console.log(mapLatLng, thumbnail, contents, address, distance);
//     const formData = new FormData();
//     thumbnail?.map((e, idx) => {
//       return formData.append("thumbnail", e);
//     });
//     formData.append("title", contents.title);
//     formData.append("maxPeople", contents.maxPeople);
//     formData.append("date", contents.date);
//     formData.append("standbyTime", contents.standbyTime);
//     formData.append("startTime", contents.startTime);
//     formData.append("finishTime", contents.finishTime);
//     formData.append("parking", contents.parking);
//     formData.append("speed", contents.speed);
//     formData.append("baggage", contents.baggage);
//     formData.append("content", contents.content);
//     formData.append("thema", contents.theme);
//     formData.append("chattingRoom", contents.chattingRoom);
//     formData.append("location", address);
//     formData.append("distance", distance);
//     formData.append("mapLatLng", JSON.stringify(mapLatLng));
//     try {
//       const { data } = await api.post("/group", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log(data);
//       swal("게시물 등록 완료", "", "success");
//       console.log("1");
//       history.replace("/groupfeed");
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const deleteGroupDB = (groupId) => {
//   return function (dispatch, getState, { history }) {
//     console.log(groupId);
//     api
//       .delete(`/group/${groupId}`)
//       .then((res) => {
//         console.log(res);
//         swal("삭제 완료");

//         history.push("/groupfeed");
//       })

//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

// export const editGroupDB = (groupId, contents, thumbnailUrl, thumbnail) => {
//   return async function (dispatch, getState, { history }) {
//     try {
//       console.log(
//         groupId,
//         contents,
//         "url=>=>",
//         thumbnailUrl,
//         "새사진파일 =>=>",
//         thumbnail
//       );
//       const formData = new FormData();

//       thumbnail?.map((e, idx) => {
//         return formData.append("thumbnail", e);
//       });

//       thumbnailUrl?.map((e, idx) => {
//         return formData.append("thumbnailUrl", e);
//       });

//       formData.append("title", contents.title);
//       formData.append("maxPeople", contents.maxPeople);
//       formData.append("date", contents.date);
//       formData.append("standbyTime", contents.standbyTime);
//       formData.append("startTime", contents.startTime);
//       formData.append("finishTime", contents.finishTime);
//       formData.append("parking", contents.parking);
//       formData.append("speed", contents.speed);
//       formData.append("baggage", contents.baggage);
//       formData.append("content", contents.content);
//       formData.append("thema", contents.thema);

//       const { data } = await api.patch(`/group/${groupId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log(data.data);
//       history.push("/groupfeed");
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

//리듀서
export default handleActions(
  {
    // [RESET_GROUP]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list = [];
    //     draft.main = [];
    //     draft.preferData = [];
    //     draft.detail = {
    //       mapLatLng: [
    //         { lat: 37.498004414546934, lng: 127.02770621963765 },
    //         { lat: 37.6, lng: 127.4 },
    //       ],
    //     };
    //     draft.paging = { page: 1, size: 3, is_next: false };
    //     draft.isLoading = false;
    //   }),

    // [ADD_GROUP]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list.unshift(action.payload);
    //   }),
    // [GET_GROUP]: (state, action) =>
    //   produce(state, (draft) => {
    //     console.log(action);
    //     draft.preferData = action.feedList.preferData;
    //     draft.list.push(...action.feedList.data);
    //     draft.isLoading = false;
    //     if (action.paging) {
    //       draft.paging = action.paging;
    //     }
    //   }),
    // [GET_MAIN]: (state, action) =>
    //   produce(state, (draft) => {
    //     console.log(action);
    //     draft.preferData = action.feedList.preferData;
    //     draft.main = action.feedList.data;
    //     draft.isLoading = false;
    //   }),
    // [GET_GROUP_DETAIL]: (state, action) =>
    //   produce(state, (draft) => {
    //     // console.log(action.payload);
    //     draft.detail = action.payload;
    //   }),

    // [EDIT_GROUP_CONTENT]: (state, action) =>
    //   produce(state, (draft) => {
    //     console.log(action.payload);
    //     draft.detail.baggage = action.payload[0]?.baggage;
    //     draft.detail.content = action.payload[0]?.content;
    //     draft.detail.date = action.payload[0]?.date;
    //     draft.detail.finishTime = action.payload[0]?.finishTime;
    //     draft.detail.maxPeople = action.payload[0]?.maxPeople;
    //     draft.detail.parking = action.payload[0]?.parking;
    //     draft.detail.speed = action.payload[0]?.speed;
    //     draft.detail.standbyTime = action.payload[0]?.standbyTime;
    //     draft.detail.startTime = action.payload[0]?.startTime;
    //     draft.detail.thema = action.payload[0]?.theme;
    //     draft.detail.title = action.payload[0]?.title;
    //   }),

    // [APPLY_GROUP]: (state, action) =>
    //   produce(state, (draft) => {
    //     console.log(state);
    //     draft.list.map((e, i) => {
    //       if (action.payload.groupId === e.groupId) {
    //         e.applyState = action.payload.applyState;
    //         e.applyPeople = action.payload.applyPeople;
    //       }
    //     });
    //   }),

    // [APPLY_DETAIL]: (state, action) =>
    //   produce(state, (draft) => {
    //     console.log(state);
    //     draft.detail.applyState = action.payload.applyState;
    //     draft.detail.applyPeople = action.payload.applyPeople;
    //   }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState
);
