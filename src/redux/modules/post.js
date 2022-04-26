// import { handleActions, createAction } from "redux-actions";
// import { produce } from "immer";
// import { api } from "../../shared/Api";

// //액션

// const ADD_POST = "ADD_POST";
// const GET_POST = "GET_POST";
// const DELETE_POST = "DELETE_POST";
// const EDIT_POST = "EDIT_POST";
// const GET_POSTONE = "GET_POSTONE";
// const ADD_LIKE = "ADD_LIKE";
// const CANCLE_LIKE = "CANCLE_LIKE";
// const ADD_BOOKMARK = "ADD_BOOKMARK";
// const DELETE_BOOKMARK = "DELETE_BOOKMARK";
// const LOADING = "LOADING";

// //initialState
// const initialState = {
//   list: [],
// };

// //액션생성함수
// const addPost = createAction(ADD_POST, (postData) => ({ postData }));
// const getPost = createAction(GET_POST, (postList, paging) => ({
//   postList,
//   paging,
// }));
// const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
// const editPost = createAction(EDIT_POST, (postId) => ({ postId }));
// const getPostOne = createAction(GET_POSTONE, (post_one) => ({ post_one }));
// const addLike = createAction(ADD_LIKE, (like_data) => ({ like_data }));
// const cancleLike = createAction(CANCLE_LIKE, (like_data) => ({ like_data }));
// const addBookmark = createAction(ADD_BOOKMARK, (postId) => ({ postId }));
// const delelteBookmark = createAction(DELETE_BOOKMARK, (postId) => ({ postId }));
// const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// //리듀서
// export default handleActions(
//   {
//     [ADD_POST]: (state, action) =>
//       produce(state, (draft) => {
//         draft.list.unshift(action.payload.post);
//       }),
//     [GET_POST]: (state, action) =>
//       produce(state, (draft) => {
//         draft.post.push(...action.payload.postList.data);
//         draft.is_loading = false;
//         if (action.payload.paging) {
//           draft.paging = action.payload.paging;
//         }
//       }),
//     [GET_POSTONE]: (state, action) =>
//       produce(state, (draft) => {
//         draft.target = action.payload.post_one;
//       }),
//     [ADD_LIKE]: (state, action) =>
//       produce(state, (draft) => {
//         draft.post = action.payload.like_data;
//       }),
//     [CANCLE_LIKE]: (state, action) =>
//       produce(state, (draft) => {
//         draft.post = action.payload.like_data;
//       }),
//     [ADD_BOOKMARK]: (state, action) =>
//       produce(state, (draft) => {
//         draft.post = action.payload.postId;
//       }),
//     [DELETE_BOOKMARK]: (state, action) =>
//       produce(state, (draft) => {
//         draft.post = action.payload.postId;
//       }),
//     [LOADING]: (state, action) =>
//       produce(state, (draft) => {
//         console.log(action.payload);
//         draft.is_loading = action.payload.is_loading;
//       }),
//   },
//   initialState
// );

// const actionCreators = {};

// export { actionCreators };
