import { handleActions, createAction } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";
import axios from "axios";

//액션

const ADD_GROUP = "ADD_GROUP";
const GET_GROUP = "GET_GROUP";
const DELETE_GROUP = "DELETE_GROUP";
const EDIT_GROUP = "EDIT_GROUP";
const GET_GROUP_DETAIL = "GET_GROUP_DETAIL";

const LOADING = "LOADING";

//initialState
const initialState = {
  list: [],
};

//액션생성함수
export const addGroup = (payload) => ({
  type: ADD_GROUP,
  payload,
});

export const getGroup = (payload) => ({
  type: GET_GROUP,
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

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//미들웨어
export const addGroupDB = (
  mapLatLng,
  thumbnail,
  contents,
  address,
  distance
) => {
  return function (dispatch, getState, { history }) {
    console.log(mapLatLng, thumbnail, contents, address, distance);
    const formData = new FormData();
    thumbnail?.map((e, idx) => {
      return formData.append("thumbnail", e);
    });
    formData.append("title", contents[0].title);
    formData.append("maxPeople", contents[0].maxPeople);
    formData.append("date", contents[0].date);
    formData.append("standbyTime", contents[0].standbyTime);
    formData.append("startTime", contents[0].startTime);
    formData.append("finishTime", contents[0].finishTime);
    formData.append("parking", contents[0].parking);
    formData.append("speed", contents[0].speed);
    formData.append("baggage", contents[0].baggage);
    formData.append("content", contents[0].content);
    formData.append("location", address);
    formData.append("distance", distance);
    formData.append("mapLatLng", JSON.stringify(mapLatLng));

    axios
      .post("http://rengabro.shop/group", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        history.replace("/groupfeed");
        console.log(res);
        return;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

//리듀서
export default handleActions(
  {
    [ADD_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [GET_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.post.push(...action.payload.postList.data);
        draft.is_loading = false;
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
      }),
    [GET_GROUP_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.target = action.payload.post_one;
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);
