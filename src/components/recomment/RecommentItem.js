import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Text, Image, IconButton } from "../../elements";
import Permit from "../../shared/Permit";
import styled from "styled-components";
import {
  _deleteReCommentFX,
  _editReCommentFX,
  _getReCommentFX,
  _isReEdit,
} from "../../redux/modules/recomments";
import { useMediaQuery } from "react-responsive";

const RecommentItem = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const dispatch = useDispatch();
  const [newComm, setNewComm] = useState("");

  const nickname = localStorage.getItem("nickname");
  const isLogin = useSelector((state) => state.user.isLogin);

  // const commentList = useSelector((state) => state.comments.list);
  const recommentList = useSelector((state) => state.recomments.list);

  const editToggle = (recommentId) => {
    dispatch(_isReEdit(recommentId));
  };

  const editReCommment = (recommentId) => {
    console.log("대댓글 수정");
    dispatch(_editReCommentFX(recommentId, newComm));
    editToggle();
  };

  if (isMobile) {
    return (
      <>
        <Grid display="flex" flexDirection="column" margin="0">
          <Grid display="flex">
            <Grid bg="#F0F0F0" display="flex" width="auto" margin="0">
              {props?.isRecomm ? null : (
                <Text color="#7B7B7B" margin="0 20px 0 8px">
                  ┗
                </Text>
              )}

              <Grid
                margin="0"
                width="auto"
                display="flex"
                alignItems="flex-start"
              >
                {props?.isRecomm ? null : (
                  <Image
                    imageType="circle"
                    size="32"
                    src={props?.user?.profileUrl}
                    margin="0 10px 0 0"
                  ></Image>
                )}

                <Grid
                  display="flex"
                  flexDirection="column"
                  width="auto"
                  margin="0"
                >
                  {props?.isRecomm ? (
                    <>
                      <Grid margin="0" display="flex">
                        <Text color="#7B7B7B" margin="0 20px 0 8px">
                          ┗
                        </Text>

                        <Grid
                          width="285px"
                          height="100px"
                          border="1px solid #B8B8B8"
                          borderRadius="3px 3px 0px 0px"
                          bg="#FFFFFF"
                        >
                          <Grid
                            display="flex"
                            alignItems="center"
                            padding="14px"
                          >
                            <CommTextareaMob
                              type="text"
                              placeholder="답글을 수정해주세요!"
                              onChange={(e) => setNewComm(e.target.value)}
                            ></CommTextareaMob>
                          </Grid>
                        </Grid>
                        <CancelMob
                          onClick={() => {
                            editToggle(props.recommentId);
                          }}
                        >
                          취소
                        </CancelMob>
                        <CommBtnMob
                          onClick={() => {
                            editReCommment(props.recommentId);
                          }}
                        >
                          등록
                        </CommBtnMob>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid display="flex">
                        <Text width="auto" size="12px" margin="0 5px 0 0">
                          {props?.user?.nickname}
                        </Text>
                        <Text color="#818181" margin="0 10px 0 0" size="12px">
                          {props?.createdAt}
                        </Text>
                      </Grid>
                      <Text width="auto" margin="0" size="12px">
                        {props?.content}
                      </Text>
                    </>
                  )}
                  {props?.isRecomm ? null : (
                    <Grid display="flex" margin="0">
                      <Permit>
                        {props?.user?.nickname === nickname ? (
                          <>
                            <Text
                              hover="color:#68F99E; font-weight:900;"
                              cursor="pointer"
                              _onClick={() => {
                                editToggle(props.recommentId);
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
                                dispatch(_deleteReCommentFX(props.recommentId));
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }

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
              src={props?.user?.profileUrl}
              margin="0 8px 0 0"
            ></Image>

            <Grid display="flex" flexDirection="column" width="auto">
              {props?.isRecomm ? (
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

          {props?.isRecomm ? (
            <>
              <Grid margin="0 0 0 48px" display="flex" alignItems="center">
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    editReCommment(props.recommentId);
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
                    editToggle(props.recommentId);
                  }}
                  margin="0 16px 0 0"
                ></IconButton>
              </Grid>
            </>
          ) : (
            <Grid display="flex" margin="0 0 0 48px">
              <Permit>
                {props?.user?.nickname === nickname ? (
                  <>
                    <Text
                      hover="color:#68F99E; font-weight:900;"
                      cursor="pointer"
                      _onClick={() => {
                        editToggle(props.recommentId);
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
                        dispatch(_deleteReCommentFX(props.recommentId));
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

const CommBtnMob = styled.button`
  position: relative;
  bottom: 32px;
  left: 245px;
  width: 56px;
  height: 24px;
  background: #030c37;
  border: none;
  color: white;
  font-weight: 500;
  font-size: 11px;
  cursor: pointer;
  border-radius: 3px;
`;

const CancelMob = styled.p`
  position: relative;
  bottom: 105px;
  left: 300px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  font-family: "Spoqa Han Sans Neo";
  text-decoration-line: underline;
  color: #7b7b7b;
  cursor: pointer;
  :hover {
    color: black;
  }
`;

const CommTextareaMob = styled.textarea`
  margin: 0;
  position: relative;
  width: 75%;
  height: 80px;
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
  font-size: 13px;
  line-height: normal;
  overflow: hidden;
  vertical-align: middle;
  :focus {
    outline: none;
  }

  ::placeholder {
    color: #7b7b7b;
    font-size: 13px;
    font-weight: 400;
    font-family: "Spoqa Han Sans Neo";
  }
`;

export default RecommentItem;
