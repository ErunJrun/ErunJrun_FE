import { handleActions, createAction } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";
import axios from "axios";

//액션
const GET_POST = "GET_POST";

//initialState
const initialState = {
  list: [],
  detail: [],
};

//액션생성함수
export const getPost = (payload) => ({
  type: GET_POST,
  payload,
});

//미들웨어
export const getPostDB = (category) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await api.get(`/group/main`);
      dispatch(getPost(data.data));
    } catch (error) {
      // console.log(error);
    }
  };
};

//리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload;
      }),
  },
  initialState
);
