import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Text } from "../../elements";
import { _getCommentFX } from "../../redux/modules/comments";
import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";

const CommentList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comments.list);

  const groupId = params.groupId;

  React.useEffect(() => {
    dispatch(_getCommentFX("group", groupId));
  }, []);

  return (
    <>
      <Grid display="flex" flexDirection="column" height="auto" margin="10px">
        <Text bold>문의하기</Text>
      </Grid>
      <CommentWrite groupId={groupId}></CommentWrite>
      <Text bold>댓글 {commentList?.length}개</Text>
      {commentList?.map((comment, idx) => {
        if (comment == null) {
          return;
        }
        return <CommentItem key={idx} {...comment} />;
      })}
    </>
  );
};

export default CommentList;
