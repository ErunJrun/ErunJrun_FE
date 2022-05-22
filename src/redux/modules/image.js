import { createAction, handleActions } from "redux-actions";
import produce, { Immer } from "immer";
import axios from "axios";

// 액션
const SET_PRE = "SET_PRE";
const SET_SHOW = "SET_SHOW";
const DELETE_PRE = "DELETE_PRE";
const DELETE_SHOW = "DELETE_SHOW";
const RESET_FILE = "RESET_FILE";

// 액션 크리에이터

const setPre = createAction(SET_PRE, (data) => ({ data }));
const setShow = createAction(SET_SHOW, (data) => ({ data }));
const deletePre = createAction(DELETE_PRE, (imageId) => ({ imageId }));
const deleteShow = createAction(DELETE_SHOW, (imageId) => ({ imageId }));
const resetFile = createAction(RESET_FILE, () => {});

const initialState = {
  files: [],
  show: [],
};

export default handleActions(
  {
    [SET_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.files = [...state.files, ...action.payload.data];
      }),

    [SET_SHOW]: (state, action) =>
      produce(state, (draft) => {
        draft.show = [...state.show, ...action.payload.data];
      }),

    // 인덱스로 삭제를 함
    [DELETE_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.files = draft.files.filter(
          (i, idx) => idx !== action.payload.imageId
        );
      }),

    [DELETE_SHOW]: (state, action) =>
      produce(state, (draft) => {
        draft.show = draft.show.filter(
          (i, idx) => idx !== action.payload.imageId
        );
      }),

    [RESET_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.files = [];
      }),
  },
  initialState
);

const imgActions = {
  setPre,
  deletePre,
  resetFile,
  setShow,
  deleteShow,
  resetFile,
};

export { imgActions };
