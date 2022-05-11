import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Text, Image, IconButton } from "../../elements";
import {
  _deleteCommentFX,
  _deleteReCommentFX,
  _editCommentFX,
  _isReEdit,
  _editReCommentFX,
} from "../../redux/modules/comments";
import Permit from "../../shared/Permit";
import styled from "styled-components";

const RecommentItem = (props) => {
  const dispatch = useDispatch();
  const [newComm, setNewComm] = useState("");

  const nickname = localStorage.getItem("nickname");
  const isLogin = useSelector((state) => state.user.isLogin);

  // const commentList = useSelector((state) => state.comments.list);
  // const recommentList = useSelector((state) => state.recomments.list);

  console.log(props);

  const editToggle = () => {
    dispatch(_isReEdit(props?.recommentId, props?.commentId));
  };

  const editReComm = (recommentId) => {
    console.log("대댓글 수정");
    dispatch(_editReCommentFX(recommentId, newComm));
    editToggle();
  };

  return (
    <>
      <Grid display="flex" flexDirection="column" margin="0 0 15px 0">
        <Grid display="flex" maxWidth="700px" width="100%">
          <Grid
            display="flex"
            alignItems="center"
            width="auto"
            margin="0 0 4px 0"
          >
            <Image
              imageType="circle"
              size="40"
              src={props.user.profileUrl}
              margin="0 8px 0 0"
            ></Image>

            <Grid display="flex" flexDirection="column" width="auto">
              {props.isEdit ? (
                <>
                  <EditInput
                    onChange={(e) => setNewComm(e.target.value)}
                    type="text"
                  ></EditInput>
                </>
              ) : (
                <>
                  <Text width="auto" size="16px" margin="0" bold>
                    {props?.user?.nickname}
                  </Text>
                  <Text width="auto" margin="0" size="16px">
                    {props?.content}
                  </Text>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>

        {props.isEdit ? (
          <>
            <Grid margin="0 0 0 48px" display="flex" alignItems="center">
              <Text
                cursor="pointer"
                _onClick={() => {
                  editReComm(props?.recommentId);
                }}
                margin="0 16px 0 0"
                size="12px"
                bold
              >
                수정완료
              </Text>
              <IconButton
                cursor="pointer"
                color="gray"
                size="15"
                width="15px"
                height="18px"
                cancelRoundBlack
                _onClick={() => {
                  editToggle(props?.recommentId);
                }}
                margin="0 16px 0 0"
              ></IconButton>
            </Grid>
          </>
        ) : (
          <Grid display="flex" margin="0 0 0 48px">
            <Text color="#818181" margin="0 16px 0 0" size="12px">
              {props?.createdAt}
            </Text>

            <Permit>
              {props?.user?.nickname === nickname ? (
                <>
                  <Text
                    hover="color:#68F99E; font-weight:900;"
                    cursor="pointer"
                    _onClick={() => {
                      editToggle(props?.recommentId);
                    }}
                    margin="0 16px 0 0"
                    size="12px"
                    color="#818181"
                  >
                    수정하기
                  </Text>
                  <Text
                    hover="color:#68F99E; font-weight:900;"
                    cursor="pointer"
                    _onClick={() => {
                      dispatch(
                        _deleteReCommentFX(props?.recommentId, props?.commentId)
                      );
                    }}
                    margin="0 16px 0 0"
                    size="12px"
                    color="#818181"
                  >
                    삭제하기
                  </Text>
                </>
              ) : null}
            </Permit>
          </Grid>
        )}
      </Grid>
    </>
  );
};

const EditInput = styled.textarea`
  width: 400px;
  height: 100px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  border: 1px solid #68f99e;
  :focus {
    border: 2px solid #68f99e;
  }
`;

export default RecommentItem;
