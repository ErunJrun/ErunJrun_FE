import { api } from "../../shared/Api";
import { produce } from "immer";
import { handleActions } from "redux-actions";
import { resetReComm, _getReCommentFX } from "./recomments";
import swal from "sweetalert";

// Action
const RESET_COMM = "RESET_COMM";
const ADD_COMM = "ADD_COMM";
const GET_COMM = "GET_COMM";
const EDIT_COMM = "EDIT_COMM";
const DELETE_COMM = "DELETE_COMM";
const IS_EDIT = "IS_EDIT";
const IS_RECOMM_BOX = "IS_RECOMM_BOX";

// Action creators
export const resetComm = () => ({
  type: GET_COMM,
});

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
    dispatch(resetComm());
    dispatch(resetReComm());
    try {
      const { data } = await api.get(`/comment/${category}/${categoryId}`);
      let comment_list = [];

      data.data.map((data) => {
        comment_list.push({ isRecomm: false, is_edit: false, ...data });
      });

      dispatch(getComm(comment_list));
      if (category === "group" && comment_list.length !== 0) {
        dispatch(_getReCommentFX(comment_list[0]?.commentId));
      }
    } catch (error) {
      // console.log(error);
    }
  };
};

export const _addCommentFX = (category, categoryId, content) => {
  return async function (dispatch, { history }) {
    try {
      const { data } = await api.post(`/comment/${category}/${categoryId}`, {
        content: content,
      });

      let comment_list = [];

      data.data.map((data) => {
        comment_list.push({ isRecomm: false, is_edit: false, ...data });
      });

      dispatch(addComm(comment_list));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const _editCommentFX = (commentId, content) => {
  return async function (dispatch, { history }) {
    try {
      const { data } = await api.patch(`/comment/${commentId}`, {
        content: content,
      });

      let comment_list = [];

      data.data.map((data) => {
        comment_list.push({ isRecomm: false, is_edit: false, ...data });
      });

      dispatch(editComm(comment_list));
      swal("댓글 수정 완료");
    } catch (error) {
      // console.log(error);
    }
  };
};

export const _deleteCommentFX = (commentId) => {
  return async function (dispatch, { history }) {
    try {
      const { data } = await api.delete(`/comment/${commentId}`);
      swal("댓글 삭제 완료");
      dispatch(deleteComm(commentId));
    } catch (error) {
      // console.log(error);
    }
  };
};

export const _isEdit = (commentId) => {
  return async function (dispatch, getState) {
    const _comment_list = getState().comments.list;

    const comment_index = _comment_list.findIndex((b) => {
      return b.commentId === commentId;
    });
    dispatch(isEdit(comment_index));
  };
};

export const _isRecommBox = (commentId) => {
  return async function (dispatch, getState) {
    const _comment_list = getState().comments.list;

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
    [RESET_COMM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [];
      }),
    [GET_COMM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload;
      }),

    [ADD_COMM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload;
      }),

    [EDIT_COMM]: (state, action) =>
      produce(state, (draft) => {
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
