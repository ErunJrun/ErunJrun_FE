// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { Grid, Text } from "../../elements";
// import { _getCommentFX } from "../../redux/modules/comments";
// import { _getReCommentFX } from "../../redux/modules/recomments";
// import CommentItem from "./CommentItem";
// import CommentWrite from "./CommentWrite";

// const RecommentList = () => {
//   const params = useParams();
//   const dispatch = useDispatch();
//   const commentList = useSelector((state) => state.comments.list);

//   const groupId = params.groupId;

//   React.useEffect(() => {
//     dispatch(_getReCommentFX(commentId));
//   }, []);

//   return (
//     <>
//       <Grid display="flex" flexDirection="column">

//         <Grid
//           padding="24px"
//           display="flex"
//           border="1px solid #D3D3D3"
//           borderRadius="0 0 3px 3px"
//         >
//           <Text size="12px">댓글 {commentList?.length}개</Text>
//           {commentList?.map((comment, idx) => {
//             if (comment == null) {
//               return;
//             }
//             return <CommentItem key={idx} {...comment} />;
//           })}
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default RecommentList;