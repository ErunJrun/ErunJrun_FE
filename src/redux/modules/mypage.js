// import { handleActions } from "redux-actions";
// import { produce } from "immer";
// import { api } from "../../shared/Api";

// // actions
// const GET_MY_PROFILE = "GET_MY_PROFILE";
// const GET_MY_POST = "GET_MY_POST";
// const GET_FOLLOWING = "GET_FOLLOWING";
// const GET_FOLLOWER = "GET_FOLLOWER";

// //action creators

// export const getMyProfile = (payload) => ({
//   type: GET_MY_PROFILE,
//   payload,
// });

// export const getMyPost = (payload) => ({
//   type: GET_MY_POST,
//   payload,
// });

// export const getFollowing = (payload) => ({
//   type: GET_FOLLOWING,
//   payload,
// });

// export const getFollower = (payload) => ({
//   type: GET_FOLLOWER,
//   payload,
// });

// //initialState
// const initialState = {
//   list: [],
// };

// // middleware actions

// // reducer
// // draft = state의 복제품 (불변성 유지)
// export default handleActions(
//   {
//     [GET_MY_PROFILE]: (state, action) =>
//       produce(state, (draft) => {
//         console.log(action.payload);
//         draft.list = action.payload;
//       }),
//     [GET_MY_POST]: (state, action) =>
//       produce(state, (draft) => {
//         console.log(action.payload);
//         draft.mypost = action.payload;
//       }),
//     [GET_FOLLOWER]: (state, action) =>
//       produce(state, (draft) => {
//         console.log(action.payload);
//         draft.follower = action.payload;
//       }),
//     [GET_FOLLOWING]: (state, action) =>
//       produce(state, (draft) => {
//         console.log(action.payload);
//         draft.following = action.payload;
//       }),
//   },
//   initialState
// );
