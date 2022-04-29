import { createAction, handleActions } from "redux-actions";
import produce, { Immer } from "immer";
import axios from "axios";

// 액션
const SET_PRE = "SET_PRE";
const DELETE_PRE = "DELETE_PRE";
const EDIT_PRE = "EDIT_PRE";
const INIT_PRE = "INIT_PRE";
const EDIT_URL = "EDIT_URL";

// 액션 크리에이터

const setPre = createAction(SET_PRE, (data) => ({ data }));
const deletePre = createAction(DELETE_PRE, (imageId) => ({ imageId }));
const editPre = createAction(EDIT_PRE, (editImage) => ({ editImage }));

const initPre = createAction(INIT_PRE, () => ({}));
const editUrl = createAction(EDIT_URL, (Url) => ({ Url }));

const initialState = {
  preView: [],
  files: [],
  editUrl: [],
};

// const test = () => {
//   return function (dispatch, getState, { history }) {
//     axios
//       .get("http://localhost:3001/post")
//       .then((res) => {
//         const data = res.data;

//         dispatch(editPre(data));
//       })
//       .catch((err) => console.log(err));
//   };
// };

export default handleActions(
  {
    // 서버에서 받아온 URL 새로 추가하는 URL 포함해서 files에 넣음
    [SET_PRE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.data);
        draft.files = [...state.files, ...action.payload.data];
      }),
    // 인덱스로 삭제를 함
    [DELETE_PRE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.imageId);
        draft.files = draft.files.filter(
          (i, idx) => idx !== action.payload.imageId
        );
      }),

    // 서버에서 받아온 URL을 넣음
    [EDIT_PRE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.editImage);
        draft.preView = action.payload.editImage;
      }),
    // 이미지 초기화
    [INIT_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.preView = [];
        draft.files = [];
        draft.editUrl = [];
      }),

    // 삭제를 눌렀을때 서버에서 받아온 URL을 따로 저장 해줌
    [EDIT_URL]: (state, action) =>
      produce(state, (draft) => {
        draft.editUrl = [...draft.editUrl, action.payload.Url];
      }),
  },
  initialState
);

const imgActions = {
  setPre,
  deletePre,
  editPre,
  initPre,
  editUrl,
};

export { imgActions };
