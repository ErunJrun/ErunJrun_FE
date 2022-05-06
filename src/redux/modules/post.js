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
}

//액션생성함수
export const getPost = (payload) => ({
    type: GET_POST,
    payload,
  });

//미들웨어
export const getPostDB = (category) => {
    return async function (dispatch, getState, { history }) {
      try {
        console.log(category);
  
        let region = category[0];
  
        let time = "";
        category[1]?.map((value) => {
          time += value + "/";
        });
        time = time.substring(-1);
  
        let distance = "";
        category[2]?.map((value) => {
          distance += value + "/";
        });
        distance = distance.substring(-1);
  
        let startDate = "";
        category[3] ? (startDate = category[3]) : (startDate = "");
  
        let endDate = "";
        category[4] ? (endDate = category[4]) : (endDate = "");
  
        let theme = "";
        category[5]?.map((value) => {
          category[5] += value + "/";
        });
        category[5] = distance.substring(-1);
  
        let finish = category[6];
  
        const { data } = await api.get(
          `/group/main?date=${startDate}/${endDate}&region=${region}&time=${time}&distance=${distance}&finish=${finish}&thema=${theme}`
        );
        console.log(data.data);
        dispatch(getPost(data.data));
      } catch (error) {
        console.log(error);
      }
    };
  };

//리듀서
export default handleActions({
    [GET_POST]: (state, action) => produce (state, (draft) => {
        draft.list = action.payload;
    })
 }, initialState);

