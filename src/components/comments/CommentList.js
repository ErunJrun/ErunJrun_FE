import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Text } from "../../elements";
import { _getCommentFX } from "../../redux/modules/comments";
import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";
import { useMediaQuery } from "react-responsive";

const CommentList = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const params = useParams();
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comments.list);

  const groupId = params.groupId;

  React.useEffect(() => {
    dispatch(_getCommentFX("group", groupId));
  }, []);

  if (isMobile) {
    return (
      <>
        <Grid
          width="343px"
          display="flex"
          flexDirection="column"
          margin="0 0 100px 0"
        >
          <Grid display="flex" alignItems="center">
            <Text bold size="13px" margin="0 8px 20px 0">
              Q&A
            </Text>
            <Text regular size="10px" margin="0 0 20px 0">
              댓글 {commentList ? commentList?.length : 0}개
            </Text>
          </Grid>

          <CommentWrite groupId={groupId}></CommentWrite>
          <Grid width="343px" display="flex" margin="0">
            {commentList?.map((comment, idx) => {
              if (comment == null) {
                return;
              }
              return <CommentItem key={idx} {...comment} />;
            })}
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid display="flex" flexDirection="column" margin="0 0 320px 0">
        <Text margin="0 0 24px 0" size="18px" bold>
          Q&A
        </Text>

        <CommentWrite groupId={groupId}></CommentWrite>
        <Grid
          padding="24px"
          display="flex"
          border="1px solid #D3D3D3"
          borderRadius="0 0 3px 3px"
        >
          <Text size="12px">댓글 {commentList?.length}개</Text>
          {commentList?.map((comment, idx) => {
            if (comment == null) {
              return;
            }
            return <CommentItem key={idx} {...comment} />;
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default CommentList;
