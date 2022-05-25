import { handleActions, createAction } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";

//액션
const ADD_PATHS = "ADD_PATHS";
const ADD_DISTANCE = "ADD_DISTANCE";
const ADD_CONTENTS = "ADD_CONTENTS";
const RESET_MAP = "RESET_MAP";

//initialState
const initialState = {
  paths: [{ lat: 37.498004414546934, lng: 127.02770621963765 }],
  distance: 0,
  contents: {
    title: "",
    standbyTime: "",
    startTime: "",
    finishTime: "",
    maxPeople: "",
    date: "",
    speed: "",
    parking: "",
    baggage: "",
    content: "",
    theme: "",
    chattingRoom: "",
  },
};

//액션생성함수
export const addPaths = (payload) => ({
  type: ADD_PATHS,
  payload,
});

export const addDistance = (payload) => ({
  type: ADD_DISTANCE,
  payload,
});

export const addContents = (payload) => ({
  type: ADD_CONTENTS,
  payload,
});

export const resetMap = () => ({
  type: RESET_MAP,
});

//리듀서
export default handleActions(
  {
    [ADD_PATHS]: (state, action) =>
      produce(state, (draft) => {
        draft.paths = [...state.paths, ...action.payload];
      }),

    [ADD_DISTANCE]: (state, action) =>
      produce(state, (draft) => {
        draft.distance = action.payload;
      }),

    [ADD_CONTENTS]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = action.payload;
      }),

    [RESET_MAP]: (state, action) =>
      produce(state, (draft) => {
        draft.paths = [];
        draft.distance = 0;
        draft.contents = {
          title: "",
          standbyTime: "",
          startTime: "",
          finishTime: "",
          maxPeople: "",
          date: "",
          speed: "",
          parking: "",
          baggage: "",
          content: "",
          theme: "",
          chattingRoom: "",
        };
      }),
  },
  initialState
);
