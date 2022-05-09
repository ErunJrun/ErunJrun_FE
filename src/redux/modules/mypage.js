import { handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";
import axios from "axios";

// actions
const GET_PROFILE = "GET_PROFILE";
const GET_RUNNING = "GET_RUNNING";


// //action creators
export const getProfile = (payload) => ({
    type: GET_PROFILE,
    payload,
  });

  export const getRunning = (payload) => ({
    type: GET_RUNNING,
    payload,
  });

  
//initialState
const initialState = {
  list: [],
};


// middleware actions
export const getProfileDB = (userId) => {
    return async function (dispatch, getState, { history }) {
      try {
        console.log(userId);
        const { data } = await api.get(`/auth/info/${userId}`);
        //console.log(data.data);
        dispatch(getProfile(data.data));
      } catch (error) {
        console.log(error);
        window.alert(error);
      }
    };
  };

export const getRunningDB = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
        console.log(userId);
        const { data } = await api.get(`/group/complete`);
        console.log(data.data);
        dispatch(getRunning(data.data));
    } catch (error) {
        console.log(error);
        window.alert(error);
    }
  };
};

//reducer

export default handleActions(
  {
    [GET_PROFILE]: (state, action) =>
    produce(state, (draft) => {
      console.log(action.payload);
      draft.list = action.payload;
    }),
   
    [GET_RUNNING]: (state, action) =>
    produce(state, (draft) => {
      console.log(action.payload);
      draft.list = action.payload;
    }),

  },
  initialState
);
