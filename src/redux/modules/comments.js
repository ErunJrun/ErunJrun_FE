import { api } from "../../shared/Api";
import { produce } from "immer";
import { handleActions } from "redux-actions";
import { _getReCommentFX } from "./recomments";

// Action
const ADD_COMM = "ADD_COMM";
const GET_COMM = "GET_COMM";
const EDIT_COMM = "EDIT_COMM";
const DELETE_COMM = "DELETE_COMM";
const IS_EDIT = "IS_EDIT";
const IS_RECOMM_BOX = "IS_RECOMM_BOX";

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

export const isRecommBox = (payload) => ({
  type: IS_RECOMM_BOX,
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
        comment_list.push({ isRecomm: false, is_edit: false, ...data });
      });

      console.log(comment_list);

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

      let comment_list = [];

      data.data.map((data) => {
        comment_list.push({ isRecomm: false, is_edit: false, ...data });
      });

      dispatch(addComm(comment_list));
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
      dispatch(editComm(data.data));
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

export const _isRecommBox = (commentId) => {
  return async function (dispatch, getState) {
    console.log(commentId);

    const _comment_list = getState().comments.list;
    console.log(_comment_list);

    const comment_index = _comment_list.findIndex((b) => {
      return b.commentId === commentId;
    });

    dispatch(isRecommBox(comment_index));
    dispatch(_getReCommentFX(commentId));
  };
};

// export const _isRecommBox = (commentId) => {
//   return async function (dispatch, getState) {
//     console.log(commentId);

//     const _comment_list = getState().comments.list;
//     console.log(_comment_list);

//     const __comment_list = _comment_list.map((e, i) => {
//       if (e.isRecomm === true) {
//         return { ...e, isRecomm: false };
//       } else {
//         return { ...e, isRecomm: false };
//       }
//     });

//     console.log(__comment_list);

//     const comment_index = _comment_list.findIndex((b) => {
//       return b.commentId === commentId;
//     });

//     const recommBoxList = [
//       {
//         comment_list: __comment_list,
//         comment_index: comment_index,
//       },
//     ];
//     dispatch(isRecommBox(recommBoxList));
//     dispatch(_getReCommentFX(commentId));
//   };
// };

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

    [IS_RECOMM_BOX]: (state, action) =>
      produce(state, (draft) => {
        const isRecommList = state.list.map((e, i) => {
          if (action.payload === i) {
            if (e.isRecomm === false) {
              return { ...e, isRecomm: true };
            } else {
              return { ...e, isRecomm: false };
            }
          } else {
            return e;
          }
        });

        draft.list = isRecommList;
      }),

    // [IS_RECOMM_BOX]: (state, action) =>
    //   produce(state, (draft) => {
    //     console.log(action.payload);

    //     const isRecommList = action.payload[0].comment_list.map((e, i) => {
    //       if (action.payload[0].comment_index === i) {
    //         if (e.isRecomm === false) {
    //           return { ...e, isRecomm: true };
    //         } else {
    //           return { ...e, isRecomm: false };
    //         }
    //       } else {
    //         return e;
    //       }
    //     });

    //     draft.list = isRecommList;
    //   }),
  },
  initialState
);
