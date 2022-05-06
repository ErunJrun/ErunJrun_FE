import { api } from "../../shared/Api";
import { produce } from "immer";
import { handleActions } from "redux-actions";

// Action
const ADD_COMM = "ADD_COMM";
const GET_COMM = "GET_COMM";
const EDIT_COMM = "EDIT_COMM";
const DELETE_COMM = "DELETE_COMM";
const IS_EDIT = "IS_EDIT";

// Action creators
export const getComm = (payload) => ({
  type: GET_COMM,
  payload,
});

export const addComm = (payload) => ({
  type: ADD_COMM,
  payload,
});

export const editComm = (payload) => ({
  type: EDIT_COMM,
  payload,
});

export const deleteComm = (payload) => ({
  type: DELETE_COMM,
  payload,
});

export const isEdit = (payload) => ({
  type: IS_EDIT,
  payload,
});

// 초기값
const initialState = {
  list: [],
};

// 미들웨어
export const _getCommentFX = (category, categoryId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(category, categoryId);
      const { data } = await api.get(`/comment/${category}/${categoryId}`);
      console.log(data);

      let comment_list = [];

      data.data.map((data) => {
        comment_list.push({ is_edit: false, ...data });
      });

      dispatch(getComm(comment_list));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _addCommentFX = (category, categoryId, content) => {
  return async function (dispatch, { history }) {
    try {
      console.log(category, categoryId, content);
      const { data } = await api.post(`/comment/${category}/${categoryId}`, {
        content: content,
      });
      console.log(data);
      dispatch(addComm(data.data));
      window.alert("댓글 등록 완료");
    } catch (error) {
      console.log(error);
    }
  };
};

export const _editCommentFX = (commentId, content) => {
  return async function (dispatch, { history }) {
    try {
      console.log(commentId, content);
      const { data } = await api.patch(`/comment/${commentId}`, {
        content: content,
      });
      console.log(data);
      // dispatch(editComm());
      window.alert("댓글 수정 완료");
    } catch (error) {
      console.log(error);
    }
  };
};

export const _deleteCommentFX = (commentId) => {
  return async function (dispatch, { history }) {
    try {
      console.log(commentId);
      const { data } = await api.delete(`/comment/${commentId}`);
      console.log(data);
      window.alert("댓글 삭제 완료");
      dispatch(deleteComm(commentId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _isEdit = (commentId) => {
  return async function (dispatch, getState) {
    console.log(commentId);

    const _comment_list = getState().comments.list;
    console.log(_comment_list);

    const comment_index = _comment_list.findIndex((b) => {
      return b.commentId === commentId;
    });
    console.log(comment_index);
    dispatch(isEdit(comment_index));
  };
};

// Reducer
export default handleActions(
  {
    [GET_COMM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.list = action.payload;
      }),

    [ADD_COMM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.list = action.payload;
      }),

    [EDIT_COMM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.list = action.payload;
      }),

    [DELETE_COMM]: (state, action) =>
      produce(state, (draft) => {
        const new_list = draft.list.filter(
          (list) => list.commentId !== action.payload
        );
        draft.list = new_list;
      }),

    [IS_EDIT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        const isEditList = state.list.map((e, i) => {
          if (action.payload === i) {
            if (e.is_edit === false) {
              return { ...e, is_edit: true };
            } else {
              return { ...e, is_edit: false };
            }
          } else {
            return e;
          }
        });
        draft.list = isEditList;
      }),
  },
  initialState
);
