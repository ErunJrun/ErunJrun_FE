// import { apis } from "../../shared/Api";
// import { api } from "../../shared/Api";
// import { produce } from "immer";
// import { handleActions } from "redux-actions";

// // Action
// const ADD_COMM = "ADD_COMM";
// const GET_COMM = "GET_COMM";
// const DELETE_COMM = "DELETE_COMM";

// // Action creators
// export const getComm = (payload) => ({
//   type: GET_COMM,
//   payload,
// });

// export const addComm = (payload) => ({
//   type: ADD_COMM,
//   payload,
// });

// export const deleteComm = (payload) => ({
//   type: DELETE_COMM,
//   payload,
// });

// // 초기값
// const initialState = {
//   list: [],
// };

// // Reducer
// export default handleActions(
//   {
//     [GET_COMM]: (state, action) =>
//       produce(state, (draft) => {
//         draft.list = action.payload.data.commentList;
//       }),

//     [ADD_COMM]: (state, action) =>
//       produce(state, (draft) => {
//         console.log(state);
//         console.log(action.payload);
//         draft.list.push(action.payload);
//       }),
//     [DELETE_COMM]: (state, action) =>
//       produce(state, (draft) => {
//         const new_list = draft.list.filter(
//           (list) => list.commentId !== action.payload
//         );
//         draft.list = new_list;
//       }),
//   },
//   initialState
// );
