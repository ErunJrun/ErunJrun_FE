import { api } from "../../shared/Api";
import { produce } from "immer";
import { handleActions } from "redux-actions";
import swal from "sweetalert";
import { _getCommentFX } from "./comments";

// Action

const GET_RE_COMM = "GET_RE_COMM";
const ADD_RE_COMM = "ADD_RE_COMM";
const EDIT_RE_COMM = "EDIT_RE_COMM";
const DELETE_RE_COMM = "DELETE_RE_COMM";
const IS_RE_EDIT = "IS_RE_EDIT";
const RESET_RE_COMM = "RESET_RE_COMM";

// Action creators
export const getReComm = (payload) => ({
  type: GET_RE_COMM,
  payload,
});

export const addReComm = (payload) => ({
  type: ADD_RE_COMM,
  payload,
});

export const editReComm = (payload) => ({
  type: EDIT_RE_COMM,
  payload,
});

export const deleteReComm = (payload) => ({
  type: DELETE_RE_COMM,
  payload,
});

export const isReEdit = (payload) => ({
  type: IS_RE_EDIT,
  payload,
});

export const resetReComm = () => ({
  type: RESET_RE_COMM,
});

// 초기값
const initialState = {
  list: [],
};

// 미들웨어
export const _getReCommentFX = (commentId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(commentId);
      const { data } = await api.get(`/recomment/${commentId}`);
      console.log(data);

      let recomment_list = [];

      data.data.map((data) => {
        recomment_list.push({ isRecomm: false, ...data });
      });

      dispatch(getReComm(recomment_list));
    } catch (error) {
      console.log(error);
    }
  };
};

//대댓글 미들웨어
export const _addReCommentFX = (commentId, content, groupId) => {
  return async function (dispatch, { history }) {
    try {
      console.log(commentId, content);
      const { data } = await api.post(`/recomment/${commentId}`, {
        content: content,
      });
      console.log(data);
      console.log("대댓글등록");

      let recomment_list = [];

      data.data.map((data) => {
        recomment_list.push({ isRecomm: false, ...data });
      });

      dispatch(getReComm(recomment_list));
      dispatch(_getCommentFX("group", groupId));
      swal("답글 등록 완료");
    } catch (error) {
      console.log(error);
    }
  };
};

export const _deleteReCommentFX = (recommentId, groupId) => {
  return async function (dispatch, { history }) {
    try {
      console.log(recommentId);
      const { data } = await api.delete(`/recomment/${recommentId}`);
      console.log(data);
      swal("답글 삭제 완료");
      dispatch(deleteReComm(recommentId));
      dispatch(_getCommentFX("group", groupId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _isReEdit = (recommentId) => {
  return async function (dispatch, getState) {
    console.log(recommentId);

    const _recomment_list = getState().recomments.list;
    console.log(_recomment_list);

    const recomment_index = _recomment_list.findIndex((b) => {
      return b.recommentId === recommentId;
    });
    console.log(recomment_index);
    dispatch(isReEdit(recomment_index));
  };
};

export const _editReCommentFX = (recommentId, content) => {
  return async function (dispatch, { history }) {
    try {
      console.log(recommentId, content);
      const { data } = await api.patch(`/recomment/${recommentId}`, {
        content: content,
      });
      console.log(data);
      dispatch(editReComm(data.data));
      swal("답글 수정 완료");
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default handleActions(
  {
    [GET_RE_COMM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.list = action.payload;
      }),

    [DELETE_RE_COMM]: (state, action) =>
      produce(state, (draft) => {
        const new_list = draft.list.filter(
          (list) => list.recommentId !== action.payload
        );
        draft.list = new_list;
      }),

    [EDIT_RE_COMM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.list = action.payload;
      }),

    [IS_RE_EDIT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        console.log(state.list);
        const isReEditList = state.list.map((e, i) => {
          if (action.payload === i) {
            if (e.isRecomm === false || null) {
              return { ...e, isRecomm: true };
            } else {
              return { ...e, isRecomm: false };
            }
          } else {
            return e;
          }
        });
        draft.list = isReEditList;
      }),

    [RESET_RE_COMM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [];
      }),
  },
  initialState
);
