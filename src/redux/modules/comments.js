import { api } from "../../shared/Api";
import { produce } from "immer";
import { handleActions } from "redux-actions";

// Action
const ADD_COMM = "ADD_COMM";
const GET_COMM = "GET_COMM";
const EDIT_COMM = "EDIT_COMM";
const DELETE_COMM = "DELETE_COMM";
const IS_EDIT = "IS_EDIT";

const ADD_RE_COMM = "ADD_RE_COMM";
const EDIT_RE_COMM = "EDIT_RE_COMM";
const DELETE_RE_COMM = "DELETE_RE_COMM";
const IS_RE_EDIT = "IS_RE_EDIT";

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
        comment_list.push({ is_edit: false, ...data });
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

//대댓글 미들웨어
export const _addReCommentFX = (commentId, content) => {
  return async function (dispatch, { history }) {
    try {
      console.log(commentId, content);
      const { data } = await api.post(`/recomment/${commentId}`, {
        content: content,
      });
      console.log(data);
      dispatch(addComm(data.data));
      window.alert("대댓글 등록 완료");
    } catch (error) {
      console.log(error);
    }
  };
};

export const _deleteReCommentFX = (recommentId, commentId) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(recommentId, commentId);
      const { data } = await api.delete(`/recomment/${recommentId}`);
      console.log(data);
      const delDate = {
        recommentId: recommentId,
        commentId: commentId,
      };

      const _comment_list = getState().comments.list;
      console.log(_comment_list);

      // let _recomment_list = _comment_list.filter((e, idx) => {
      //   if(e.commentId !== commentId) {
      //     if(e)
      //   }
      // });

      // console.log(_recomment_list);

      // const recomment_index = _recomment_list[0]?.filter((b) => {
      //   return b.recommentId === recommentId;
      // });

      // window.alert("대댓글 삭제 완료");
      // dispatch(deleteReComm(recomment_index));
    } catch (error) {
      console.log(error);
    }
  };
};

export const _isReEdit = (recommentId, commentId) => {
  return async function (dispatch, getState) {
    console.log(recommentId, commentId);

    const _comment_list = getState().comments.list;
    console.log(_comment_list);

    let _recomment_list = [];
    _comment_list.map((e, idx) => {
      _recomment_list.push(e.Recomments);
    });

    console.log(_recomment_list);

    const recomment_index = _recomment_list?.findIndex((b) => {
      return b.recommentId === recommentId;
    });
    console.log(recomment_index);

    const editStateData = {
      recommentId: recommentId,
      commentId: commentId,
      reIndex: recomment_index,
    };
    dispatch(isReEdit(editStateData));
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
      window.alert("대댓글 수정 완료");
    } catch (error) {
      console.log(error);
    }
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

    [DELETE_RE_COMM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);

        const new_list = state.list.filter((list) => {});
        console.log(new_list);
        console.log(state.list);
        draft.list[0].Recomments = new_list;
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
        const isEditList = state.list.map((e, i) => {
          if (action.payload.commentId === e.commentId) {
            console.log(1, e);
            e.Recomments.map((p, idx) => {
              if (action.payload.recommentId === p.recommentId) {
                if (p.isEdit === false) {
                  return { ...p, isEdit: true };
                } else {
                  return { ...p, isEdit: false };
                }
              }
            });
          } else {
            return e;
          }
        });
        console.log(isEditList);
        draft.list[action.payload.reIndex].Recomments = isEditList;
      }),
  },
  initialState
);
