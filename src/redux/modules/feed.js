import { handleActions, createAction } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";

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
export const addGroupDB = (mapLatLng, thumbnail, contents) => {
  return function (dispatch, getState, { history }) {
    console.log(mapLatLng, thumbnail, contents);

    const formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("contents", contents);
    formData.append("thumbnail", thumbnail);
    formData.append("mapLatLng", mapLatLng);
    api
      .post("/group", formData, config)
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
