import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Grid, Text } from "../../elements";
import { resetComm, _getCommentFX } from "../../redux/modules/comments";
import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";
import { useMediaQuery } from "react-responsive";
import { resetReComm, _getReCommentFX } from "../../redux/modules/recomments";

const CommentList = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });
  const path = useLocation().pathname;

  const params = useParams();
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comments.list);
  const recommentList = useSelector((state) => state.recomments.list);

  const groupId = params?.groupId;
  const courseId = params?.courseId;

  console.log(commentList);

  React.useEffect(() => {
    if (props.course) {
      console.log("코멘트 리스트 코스 코멘트");
      dispatch(resetComm());
      dispatch(_getCommentFX("course", courseId));
    }
    if (!props.course) {
      console.log("코멘트 리스트 그룹 코멘트");
      dispatch(resetComm());
      dispatch(_getCommentFX("group", groupId));
    }
  }, []);

  if (props.course && !isMobile) {
    return (
      <>
        <Grid display="flex" flexDirection="column" margin="0 0 320px 0">
          <Grid margin="0 0 24px 0" display="flex" alignItems="center">
            <Text margin="0 10px 0 0" size="18px" bold>
              리뷰
            </Text>
            <Text margin="0" regular size="14px">
              {commentList?.length}개
            </Text>
          </Grid>

          <CommentWrite course={true} courseId={courseId}></CommentWrite>

          {commentList?.length > 0 ? (
            <Grid
              padding="24px"
              display="flex"
              border="1px solid #D3D3D3"
              borderRadius="0 0 3px 3px"
            >
              {commentList?.map((comment, idx) => {
                if (comment == null) {
                  return;
                }
                return <CommentItem course={true} key={idx} {...comment} />;
              })}
            </Grid>
          ) : null}
        </Grid>
      </>
    );
  }

  if (props.course && isMobile) {
    return (
      <>
        <Grid
          width="343px"
          display="flex"
          flexDirection="column"
          margin="0 0 100px 0"
        >
          <Grid display="flex" alignItems="center" margin="0 auto 16px auto">
            <Text height="auto" bold size="13px" margin="0 8px 0 0">
              리뷰
            </Text>
            <Text height="auto" margin="0" regular size="10px">
              {commentList?.length}개
            </Text>
          </Grid>

          <CommentWrite course={true} courseId={courseId}></CommentWrite>

          {commentList?.length > 0 ? (
            <Grid width="343px" display="flex" margin="0">
              {commentList?.map((comment, idx) => {
                if (comment == null) {
                  return;
                }
                return <CommentItem course={true} key={idx} {...comment} />;
              })}
            </Grid>
          ) : null}
        </Grid>
      </>
    );
  }

  if (!props.course && isMobile) {
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
              댓글{" "}
              {commentList ? commentList?.length + recommentList?.length : 0}개
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
  if (!props.course && !isMobile) {
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
            <Text size="12px">
              댓글{" "}
              {commentList ? commentList?.length + recommentList?.length : 0}개
            </Text>
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
};

export default CommentList;
