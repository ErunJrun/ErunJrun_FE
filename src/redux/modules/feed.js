import { handleActions, createAction } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";
import axios from "axios";

//액션

const RESET_GROUP = "RESET_GROUP";
const ADD_GROUP = "ADD_GROUP";
const GET_GROUP = "GET_GROUP";
const GET_MAIN = "GET_MAIN";
const DELETE_GROUP = "DELETE_GROUP";
const EDIT_GROUP = "EDIT_GROUP";
const GET_GROUP_DETAIL = "GET_GROUP_DETAIL";
const EDIT_GROUP_CONTENT = "EDIT_GROUP_CONTENT";
const APPLY_GROUP = "APPLY_GROUP";
const APPLY_DETAIL = "APPLY_DETAIL";
const LOADING = "LOADING";

//initialState
const initialState = {
  list: [],
  main: [],
  preferData: [],
  detail: {
    mapLatLng: [
      { lat: 37.498004414546934, lng: 127.02770621963765 },
      { lat: 37.6, lng: 127.4 },
    ],
  },
  paging: { page: 1, size: 3, is_next: false },
  isLoading: false,
};

//액션생성함수
export const resetGroup = () => ({
  type: RESET_GROUP,
});

export const addGroup = (payload) => ({
  type: ADD_GROUP,
  payload,
});

export const getGroup = (feedList) => ({
  type: GET_GROUP,
  feedList,
});

export const getMain = (feedList) => ({
  type: GET_MAIN,
  feedList,
});

export const getGroupDetail = (payload) => ({
  type: GET_GROUP_DETAIL,
  payload,
});

export const deleteGroup = (payload) => ({
  type: DELETE_GROUP,
  payload,
});

export const editGroup = (payload) => ({
  type: EDIT_GROUP,
  payload,
});

export const editGroupContent = (payload) => ({
  type: EDIT_GROUP_CONTENT,
  payload,
});

export const applyGroup = (payload) => ({
  type: APPLY_GROUP,
  payload,
});

export const applyDetail = (payload) => ({
  type: APPLY_DETAIL,
  payload,
});

export const loading = (payload) => ({
  type: LOADING,
  payload,
});

//미들웨어
export const getGroupDB = (category, page = 1, size = 3) => {
  return async function (dispatch, getState, { history }) {
    console.log(category, page, size);
    const _paging = getState().feed.paging;
    if (!_paging.page) {
      return;
    }

    dispatch(loading(true));

    try {
      let region = "";
      category.region ? (region = category.region) : (region = "");

      let time = "";
      category?.filterTime?.map((value) => {
        time += value + "/";
      });
      time = time.substring(-1);

      let distance = "";
      category?.filterDistance?.map((value) => {
        distance += value + "/";
      });
      distance = distance.substring(-1);

      let startDate = "";
      if (category.startDate === "NaN-NaN-NaN" || category.startDate === "") {
        startDate = "";
      } else {
        startDate = category.startDate + "/";
      }

      let endDate = "";
      category.endDate !== "NaN-NaN-NaN"
        ? (endDate = category.endDate)
        : (endDate = "");

      let theme = "";
      category?.filterTheme?.map((value) => {
        theme += value + "/";
      });
      theme = theme.substring(-1);

      let finish = category?.finish;

      const { data } = await api.get(
        `/group/all?date=${startDate}${endDate}&region=${region}&time=${time}&distance=${distance}&finish=${finish}&thema=${theme}&size=${size}&page=${page}`
      );
      console.log(data);
      console.log(data.data.length);
      let paging = {
        page: data.data.length === size ? page + 1 : null,
        size: size,
        is_next: data.data.length === size ? true : false,
      };
      console.log(paging);
      dispatch(getGroup(data, paging));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMainDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get(`/group/main`);
      console.log(data);
      dispatch(getMain(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGroupDetailDB = (groupId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(groupId);
      const { data } = await api.get(`/group/detail/${groupId}`);
      console.log(data.data);
      dispatch(getGroupDetail(data.data));
    } catch (error) {
      console.log(error);
      window.alert("해당 게시물이 존재하지 않습니다");
    }
  };
};

export const addGroupDB = (
  mapLatLng,
  thumbnail,
  contents,
  address,
  distance
) => {
  return async function (dispatch, getState, { history }) {
    console.log(mapLatLng, thumbnail, contents, address, distance);
    const formData = new FormData();
    thumbnail?.map((e, idx) => {
      return formData.append("thumbnail", e);
    });
    formData.append("title", contents.title);
    formData.append("maxPeople", contents.maxPeople);
    formData.append("date", contents.date);
    formData.append("standbyTime", contents.standbyTime);
    formData.append("startTime", contents.startTime);
    formData.append("finishTime", contents.finishTime);
    formData.append("parking", contents.parking);
    formData.append("speed", contents.speed);
    formData.append("baggage", contents.baggage);
    formData.append("content", contents.content);
    formData.append("thema", contents.theme);
    formData.append("chattingRoom", contents.chattingRoom);
    formData.append("location", address);
    formData.append("distance", distance);
    formData.append("mapLatLng", JSON.stringify(mapLatLng));
    try {
      const { data } = await api.post("/group", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      window.alert("게시물 등록 완료");
      console.log("1");
      history.replace("/groupfeed");
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteGroupDB = (groupId) => {
  return function (dispatch, getState, { history }) {
    console.log(groupId);
    api
      .delete(`/group/${groupId}`)
      .then((res) => {
        console.log(res);
        window.alert("삭제 완료");

        history.push("/groupfeed");
      })

      .catch((error) => {
        console.log(error);
      });
  };
};

export const editGroupDB = (groupId, contents, thumbnailUrl, thumbnail) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(
        groupId,
        contents,
        "url=>=>",
        thumbnailUrl,
        "새사진파일 =>=>",
        thumbnail
      );
      const formData = new FormData();

      thumbnail?.map((e, idx) => {
        return formData.append("thumbnail", e);
      });

      thumbnailUrl?.map((e, idx) => {
        return formData.append("thumbnailUrl", e);
      });

      formData.append("title", contents.title);
      formData.append("maxPeople", contents.maxPeople);
      formData.append("date", contents.date);
      formData.append("standbyTime", contents.standbyTime);
      formData.append("startTime", contents.startTime);
      formData.append("finishTime", contents.finishTime);
      formData.append("parking", contents.parking);
      formData.append("speed", contents.speed);
      formData.append("baggage", contents.baggage);
      formData.append("content", contents.content);
      formData.append("thema", contents.thema);

      const { data } = await api.patch(`/group/${groupId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data.data);
      history.push("/groupfeed");
    } catch (error) {
      console.log(error);
    }
  };
};

export const applyGroupDB = (groupId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(groupId);
      const { data } = await api.post(`/group/${groupId}/apply`);
      console.log(data.data);

      const applyData = {
        groupId: groupId,
        applyState: data.data.applyState,
        applyPeople: data.data.applyPeople,
      };

      dispatch(applyGroup(applyData));
    } catch (error) {
      console.log(error);
      console.log("안녕", error.message);
    }
  };
};

export const applyDetailDB = (groupId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(groupId);
      const { data } = await api.post(`/group/${groupId}/apply`);
      console.log(data.data);

      const applyData = {
        groupId: groupId,
        applyState: data.data.applyState,
        applyPeople: data.data.applyPeople,
      };
      window.alert("신청이 완료되었습니다.");
      dispatch(getGroupDetailDB(groupId));
      dispatch(applyDetail(applyData));
    } catch (error) {
      console.log(error);
      console.log("안녕2", error.message);
    }
  };
};

//리듀서
export default handleActions(
  {
    [RESET_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [];
        draft.main = [];
        draft.preferData = [];
        draft.detail = {
          mapLatLng: [
            { lat: 37.498004414546934, lng: 127.02770621963765 },
            { lat: 37.6, lng: 127.4 },
          ],
        };
        draft.paging = { page: 1, size: 3, is_next: false };
        draft.isLoading = false;
      }),

    [ADD_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload);
      }),
    [GET_GROUP]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        draft.preferData = action.feedList.preferData;
        draft.list.push(...action.feedList.data);
        draft.isLoading = false;

        if (action.paging) {
          draft.paging = action.paging;
        }
      }),
    [GET_MAIN]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        draft.preferData = action.feedList.preferData;
        draft.main = action.feedList.data;
        draft.isLoading = false;
      }),
    [GET_GROUP_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload);
        draft.detail = action.payload;
      }),

    [EDIT_GROUP_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.detail.baggage = action.payload[0]?.baggage;
        draft.detail.content = action.payload[0]?.content;
        draft.detail.date = action.payload[0]?.date;
        draft.detail.finishTime = action.payload[0]?.finishTime;
        draft.detail.maxPeople = action.payload[0]?.maxPeople;
        draft.detail.parking = action.payload[0]?.parking;
        draft.detail.speed = action.payload[0]?.speed;
        draft.detail.standbyTime = action.payload[0]?.standbyTime;
        draft.detail.startTime = action.payload[0]?.startTime;
        draft.detail.thema = action.payload[0]?.theme;
        draft.detail.title = action.payload[0]?.title;
      }),

    [APPLY_GROUP]: (state, action) =>
      produce(state, (draft) => {
        console.log(state);
        draft.list.map((e, i) => {
          if (action.payload.groupId === e.groupId) {
            e.applyState = action.payload.applyState;
            e.applyPeople = action.payload.applyPeople;
          }
        });
      }),

    [APPLY_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        console.log(state);
        draft.detail.applyState = action.payload.applyState;
        draft.detail.applyPeople = action.payload.applyPeople;
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState
);
