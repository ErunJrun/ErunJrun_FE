import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Text, Image } from "../../elements";
import {
  _deleteCommentFX,
  _editCommentFX,
  _isEdit,
} from "../../redux/modules/comments";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const [newComm, setNewComm] = useState("");

  const editToggle = (commentId) => {
    dispatch(_isEdit(commentId));
  };

  const editComm = (commentId) => {
    console.log("댓글 수정");
    dispatch(_editCommentFX(commentId, newComm));
    editToggle(props?.commentId);
  };

  return (
    <>
      <Grid display="flex" flexDirection="column" height="auto" margin="10px">
        <Grid display="flex" maxWidth="875px" width="100%">
          <Grid width="auto">
            <Image
              imageType="circle"
              size="72"
              src={props.user.profileUrl}
              margin="0 18px"
            ></Image>
          </Grid>

          <Grid display="flex" flexDirection="column">
            <Grid display="flex" height="atuo">
              <Text margin="5px" bold>
                {props?.user?.nickname}
              </Text>
              <Text margin="5px">{props?.user?.userLevel}</Text>
            </Grid>

            {props.is_edit ? (
              <>
                <Grid margin="10px 0" display="flex">
                  <input
                    onChange={(e) => setNewComm(e.target.value)}
                    type="text"
                  ></input>

                  <Text
                    cursor="pointer"
                    _onClick={() => {
                      editComm(props?.commentId);
                    }}
                    margin="0 5px"
                    size="12px"
                  >
                    수정완료
                  </Text>
                  <Text
                    _onClick={() => {
                      editToggle(props?.commentId);
                    }}
                    margin="0 5px"
                    size="12px"
                  >
                    수정취소
                  </Text>
                </Grid>
              </>
            ) : (
              <>
                <Text margin="5px">{props?.content}</Text>

                <Grid margin="10px 0" display="flex">
                  <Text margin="0 5px" size="12px">
                    {props?.createdAt}
                  </Text>
                  <Text margin="0 5px" size="12px">
                    답글달기
                  </Text>

                  <Text
                    cursor="pointer"
                    _onClick={() => {
                      editToggle(props?.commentId);
                    }}
                    margin="0 5px"
                    size="12px"
                  >
                    수정하기
                  </Text>
                  <Text
                    _onClick={() => {
                      dispatch(_deleteCommentFX(props?.commentId));
                    }}
                    margin="0 5px"
                    size="12px"
                  >
                    삭제하기
                  </Text>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CommentItem;
