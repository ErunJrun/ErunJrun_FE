import { createAction, handleActions } from "redux-actions";
import produce, { Immer } from "immer";
import axios from "axios";

// 액션
const SET_FILTER_AREA = "SET_FILTER_AREA";
const SET_FILTER_TIME = "SET_FILTER_TIME";
const SET_FILTER_DISTANCE = "SET_FILTER_DISTANCE";
const DELETE_FILTER = "DELETE_FILTER";
const RESET_FILTER = "RESET_FILTER";

//미들웨어
// export const __setFilterArea = (area) => {
//   return async function (dispatch, getState, { history }) {
//     try {
//       if(area ==)
//       dispatch(getGroup(data.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// 0 : 전국
// 1 : 서울
// 2 : 경기도
// 3 : 인천광역시
// 4 : 강원도
// 5 : 충청도/세종특별시/대전광역시
// 6 : 경상북도/대구광역시
// 7 : 경상남도/부산광역시/울산광역시
// 8 : 전라남도/전라북도/광주광역시
// 9 : 제주특별시

// 액션 크리에이터
const setFilterArea = createAction(SET_FILTER_AREA, (list) => ({ list }));
const setFilterTime = createAction(SET_FILTER_TIME, (list) => ({ list }));
const setFilterDistance = createAction(SET_FILTER_DISTANCE, (list) => ({
  list,
}));
const deleteFilter = createAction(DELETE_FILTER, () => {});
const resetFilter = createAction(RESET_FILTER, () => {});

const initialState = {
  area: [],
  time: [],
  distance: [],
};

export default handleActions(
  {
    [SET_FILTER_AREA]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, action.payload.list);
        draft.area = [...state.area, action.payload.list];
      }),

    [SET_FILTER_TIME]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.list);
        draft.time = [...state.filter.time, ...action.payload.list];
      }),

    [SET_FILTER_DISTANCE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.list);
        draft.distance = [...state.filter.distance, ...action.payload.list];
      }),

    [DELETE_FILTER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.imageId);
        draft.files = draft.files.filter(
          (i, idx) => idx !== action.payload.imageId
        );
      }),

    [RESET_FILTER]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [];
      }),
  },
  initialState
);

const filterActions = {
  setFilterArea,
  setFilterTime,
  setFilterDistance,
  deleteFilter,
  resetFilter,
};

export { filterActions };
