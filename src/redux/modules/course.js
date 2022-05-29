import { handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";
import swal from "sweetalert";

//액션

const RESET_COURSE = "RESET_COURSE";
const ADD_COURSE = "ADD_COURSE";
const GET_COURSE = "GET_COURSE";
const GET_COURSE_REGION = "GET_COURSE_REGION";

const DELETE_COURSE = "DELETE_COURSE";
const EDIT_COURSE = "EDIT_COURSE";
const GET_COURSE_DETAIL = "GET_COURSE_DETAIL";
const EDIT_COURSE_CONTENT = "EDIT_COURSE_CONTENT";

const LOADING = "LOADING";
const BOOKMARK = "BOOKMARK";
const BOOKMARK_DETAIL = "BOOKMARK_DETAIL";
const BOOKMARK_RANKING = "BOOKMARK_RANKING";
const STAR_POINT = "STAR_POINT";
const PATCH_STAR_POINT = "PATCH_STAR_POINT";

//initialState
const initialState = {
  list: [],
  starPoint: [],
  rankingFeed: [],
  preferData: "",
  detail: {
    mapLatLng: [
      { lat: 37.498004414546934, lng: 127.02770621963765 },
      { lat: 37.6, lng: 127.4 },
    ],
  },
  paging: { page: 1, size: 6 },
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

export const getCourse = (courseList, paging) => ({
  type: GET_COURSE,
  courseList,
  paging,
});

export const getCourseRegion = (courseList, paging) => ({
  type: GET_COURSE,
  courseList,
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

export const bookmark = (payload) => ({
  type: BOOKMARK,
  payload,
});

export const bookmarkDetail = (payload) => ({
  type: BOOKMARK_DETAIL,
  payload,
});

export const bookmarkRanking = (payload) => ({
  type: BOOKMARK_RANKING,
  payload,
});

export const starPoint = (payload) => ({
  type: STAR_POINT,
  payload,
});

// export const patchStarPoint = (payload) => ({
//   type: PATCH_STAR_POINT,
//   payload,
// });

//미들웨어
export const getCourseDB = (region = 0, sort = "new", page = 1, size = 6) => {
  return async function (dispatch, getState, { history }) {
    const _paging = getState().course.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));

    try {
      const { data } = await api.get(
        `/course/all?region=${region}&sort=${sort}&page=${page}&size=${size}`
      );
      console.log(data);
      let paging = {
        page: data.data.feed.length === size ? page + 1 : null,
        size: size,
      };
      console.log(paging);
      dispatch(getCourse(data, paging));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const getCourseRegionDB = (
  region = 0,
  sort = "new",
  page = 1,
  size = 6
) => {
  return async function (dispatch, getState, { history }) {
    const _paging = getState().course.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));

    try {
      const { data } = await api.get(
        `/course/all?region=${region}&sort=${sort}&page=${page}&size=${size}`
      );
      console.log(data);
      let paging = {
        page: data.data.feed.length === size ? page + 1 : null,
        size: size,
      };
      console.log(paging);
      dispatch(getCourseRegion(data, paging));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const bookmarkDB = (courseId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(courseId);
      const { data } = await api.patch(`/course/${courseId}/bookmark`);
      console.log(data);

      let bookmarkState = {
        bookmark: data.data.bookmark,
        courseId: courseId,
      };

      dispatch(bookmark(bookmarkState));
    } catch (error) {
      console.log(error);
    }
  };
};

export const bookmarkDetailDB = (courseId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(courseId);
      const { data } = await api.patch(`/course/${courseId}/bookmark`);
      console.log(data);

      dispatch(bookmarkDetail(data.data.bookmark));
    } catch (error) {
      console.log(error);
    }
  };
};

export const bookmarkRankingDB = (courseId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(courseId);
      const { data } = await api.patch(`/course/${courseId}/bookmark`);
      console.log(data);

      let bookmarkState = {
        bookmark: data.data.bookmark,
        courseId: courseId,
      };

      dispatch(bookmarkRanking(bookmarkState));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCourseDetailDB = (courseId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(courseId);
      const { data } = await api.get(`/course/detail/${courseId}`);
      console.log(data.data);
      dispatch(getCourseDetail(data.data));
    } catch (error) {
      console.log(error);
      swal("해당 게시물이 존재하지 않습니다");
    }
  };
};

export const getStarPointDB = (courseId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(courseId);
      const { data } = await api.get(`/course/${courseId}/starPoint`);
      console.log(data.data);
      dispatch(starPoint(data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const patchStarPointDB = (courseId, myStarPoint) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(courseId, myStarPoint);
      const { data } = await api.patch(`/course/${courseId}/starPoint`, {
        myStarPoint: myStarPoint,
      });

      const newData = {
        myStarPoint: myStarPoint,
        starPeople: data.data.starPeople,
        starPoint: data.data.starPoint,
      };
      dispatch(starPoint(newData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addCourseDB = (
  mapLatLng,
  courseImage,
  contents,
  address,
  distance
) => {
  return async function (dispatch, getState, { history }) {
    console.log(mapLatLng, courseImage, contents, address, distance);
    const formData = new FormData();
    courseImage?.map((e, idx) => {
      return formData.append("courseImage", e);
    });
    formData.append("title", contents.title);
    formData.append("totalTime", contents.totalTime);
    formData.append("parking", contents.parking);
    formData.append("baggage", contents.baggage);
    formData.append("content", contents.content);
    formData.append("thema", contents.theme);
    formData.append("location", address);
    formData.append("distance", distance);
    formData.append("mapLatLng", JSON.stringify(mapLatLng));
    try {
      const { data } = await api.post("/course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      swal("게시물 등록 완료", "", "success");
      console.log("1");
      history.replace("/courseFeed/0");
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCourseDB = (courseId) => {
  return function (dispatch, getState, { history }) {
    console.log(courseId);
    api
      .delete(`/course/${courseId}`)
      .then((res) => {
        console.log(res);
        swal("삭제 완료");

        history.push("/courseFeed/0");
      })

      .catch((error) => {
        console.log(error);
      });
  };
};

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
    [RESET_COURSE]: (state, action) =>
      produce(state, (draft) => {
        // draft.rankingFeed = [];
        draft.list = [];
        draft.main = [];
        draft.starPoint = [];
        draft.preferData = [];
        draft.detail = {
          mapLatLng: [
            { lat: 37.498004414546934, lng: 127.02770621963765 },
            { lat: 37.6, lng: 127.4 },
          ],
        };
        draft.paging = { page: 1, size: 6 };
        draft.isLoading = false;
      }),

    [GET_COURSE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        draft.rankingFeed = action.courseList.data.rankingFeed;
        draft.preferData = action.courseList.preferData;
        draft.list.push(...action.courseList.data.feed);
        draft.isLoading = false;
        if (action.paging) {
          draft.paging = action.paging;
        }
      }),

    [GET_COURSE_REGION]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        draft.list.push(...action.courseList.data.feed);
        draft.isLoading = false;
        if (action.paging) {
          draft.paging = action.paging;
        }
      }),

    [STAR_POINT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.starPoint = action.payload;
      }),

    [BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        console.log(state);
        const newList = state.list.map((e) => {
          if (action.payload.courseId === e.courseId) {
            if (action.payload.bookmark === true) {
              return { ...e, bookmark: true };
            } else {
              return { ...e, bookmark: false };
            }
          } else {
            return e;
          }
        });
        draft.list = newList;
      }),

    [BOOKMARK_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail.bookmark = action.payload;
      }),

    [BOOKMARK_RANKING]: (state, action) =>
      produce(state, (draft) => {
        const newList = state.rankingFeed.map((e) => {
          if (action.payload.courseId === e.courseId) {
            if (action.payload.bookmark === true) {
              return { ...e, bookmark: true };
            } else {
              return { ...e, bookmark: false };
            }
          } else {
            return e;
          }
        });
        draft.rankingFeed = newList;
      }),

    [GET_COURSE_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.detail = action.payload;
      }),

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

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState
);
