import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Text, Image, IconButton } from "../../elements";
import {
  _deleteCommentFX,
  _editCommentFX,
  _getCommentFX,
  _isEdit,
  _isRecommBox,
} from "../../redux/modules/comments";
import Permit from "../../shared/Permit";
import styled from "styled-components";
import RecommentItem from "../recomment/RecommentItem";
import RecommentWrite from "../recomment/RecommentWrite";
import { resetReComm, _getReCommentFX } from "../../redux/modules/recomments";
import { history } from "../../redux/configureStore";
import { useMediaQuery } from "react-responsive";

const CommentItem = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const [newComm, setNewComm] = useState(props.content);
  const [reCommBox, setReCommBox] = useState(false);

  const nickname = localStorage.getItem("nickname");
  const isLogin = useSelector((state) => state.user.isLogin);

  const recommentList = useSelector((state) => state.recomments.list);
  const commentList = useSelector((state) => state.comments.list);

  const editToggle = (commentId) => {
    dispatch(_isEdit(commentId));
  };

  const editComm = (commentId) => {
    dispatch(_editCommentFX(commentId, newComm));
    editToggle(commentId);
  };

  React.useEffect(() => {
    if (commentList.length > 0 && !props.course) {
      console.log(
        "ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
      );
      dispatch(_getReCommentFX(commentList[0].commentId));
    }

    return () => {
      dispatch(resetReComm());
    };
  }, []);

  if (props.course) {
    return (
      <>
        <Grid display="flex" flexDirection="column" margin="0 0 15px 0">
          <Grid display="flex" maxWidth="758px" width="100%">
            <Grid
              display="flex"
              alignItems="center"
              width="auto"
              margin="0 0 4px 0"
              cursor="pointer"
            >
              <Image
                _onClick={() => {
                  history.push(`/mypage/${props?.user.userId}`);
                }}
                imageType="circle"
                size="40"
                src={props?.user?.profileUrl}
                margin="0 8px 0 0"
              ></Image>

              <Grid display="flex" flexDirection="column" width="auto">
                {props?.is_edit ? (
                  <>
                    <EditInput
                      onChange={(e) => setNewComm(e.target.value)}
                      type="text"
                      value={newComm ? newComm : ""}
                    ></EditInput>
                  </>
                ) : (
                  <>
                    <Grid display="flex" alignItems="center">
                      <Text width="auto" margin="0 5px 0 0" bold>
                        {props?.user?.nickname}
                      </Text>
                      <Text color="#818181" margin="0 10px 0 0" size="12px">
                        {props?.createdAt}
                      </Text>
                    </Grid>

                    <Text width="auto" margin="0" size="16px">
                      {props?.content}
                    </Text>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>

          {props?.is_edit ? (
            <>
              <Grid margin="0 0 0 48px" display="flex" alignItems="center">
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    editComm(props?.commentId);
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
                    editToggle(props?.commentId);
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
                        editToggle(props?.commentId);
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
                        dispatch(_deleteCommentFX(props?.commentId));
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
  }

  if (isMobile) {
    return (
      <>
        <Grid display="flex" flexDirection="column" margin="0 0 15px 0">
          <Grid display="flex">
            <Grid
              display="flex"
              alignItems="center"
              width="auto"
              margin="0 0 4px 0"
              cursor="pointer"
            >
              {props?.is_edit ? null : (
                <Image
                  imageType="circle"
                  size="32"
                  src={props?.user?.profileUrl}
                  margin="0 10px 0 0"
                  _onClick={() => {
                    history.push(`/mypage/${props?.user.userId}`);
                  }}
                ></Image>
              )}

              <Grid display="flex" flexDirection="column" width="auto">
                {props?.is_edit ? (
                  <>
                    <Grid
                      width="343px"
                      height="90px"
                      margin="0 0 32px 0"
                      position="relative"
                    >
                      <Grid
                        bg="white"
                        border="1px solid #C4C4C4"
                        borderRadius="3px"
                      >
                        <Grid
                          position="relative"
                          display="flex"
                          alignItems="center"
                          padding="14px 0 14px 50px"
                        >
                          <CommTextareaMob
                            type="text"
                            placeholder="수정 할 내용을 적어주세요!"
                            onChange={(e) => setNewComm(e.target.value)}
                          ></CommTextareaMob>
                        </Grid>
                      </Grid>
                      <ProfileImage
                        src={props?.user?.profileUrl}
                      ></ProfileImage>
                      <CancelMob
                        onClick={() => {
                          editToggle(props.commentId);
                        }}
                      >
                        취소
                      </CancelMob>

                      <CommBtnMob
                        onClick={() => {
                          editComm(props.commentId);
                        }}
                      >
                        수정
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

                    <Text width="auto" margin="0" size="13px">
                      {props?.content}
                    </Text>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>

          {props?.is_edit ? null : (
            <Grid width="auto" display="flex" margin="0 0 0 42px">
              <Text
                color="#818181"
                margin="0 16px 0 0"
                size="12px"
                cursor="pointer"
              >
                답글 {props?.recommentCount}개
              </Text>
              <Permit>
                <Text
                  hover="color:#68F99E; font-weight:900;"
                  color="#818181"
                  margin="0 16px 0 0"
                  size="12px"
                  cursor="pointer"
                  _onClick={() => {
                    setReCommBox(!reCommBox);
                  }}
                >
                  답글 쓰기
                </Text>
              </Permit>
              <Permit>
                {props?.user?.nickname === nickname ? (
                  <>
                    <Text
                      hover="color:#68F99E; font-weight:900;"
                      cursor="pointer"
                      _onClick={() => {
                        editToggle(props?.commentId);
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
                        dispatch(_deleteCommentFX(props?.commentId));
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
          <Hr></Hr>
        </Grid>
        <Grid margin="0 0 12px 0">
          {reCommBox ? (
            <RecommentWrite
              setReCommBox={setReCommBox}
              commentId={props?.commentId}
            />
          ) : null}

          {recommentList?.map((e, idx) => {
            return props.commentId === e.commentId ? (
              <Fragment key={idx}>
                <Grid bg="#F0F0F0" margin="0" padding="13px 0">
                  <RecommentItem commentId={props?.commentId} {...e} />
                </Grid>
              </Fragment>
            ) : null;
          })}
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid display="flex" flexDirection="column" margin="0 0 15px 0">
        <Grid display="flex" maxWidth="758px" width="100%">
          <Grid
            display="flex"
            alignItems="center"
            width="auto"
            margin="0 0 4px 0"
            cursor="pointer"
          >
            <Image
              _onClick={() => {
                history.push(`/mypage/${props?.user.userId}`);
              }}
              imageType="circle"
              size="40"
              src={props?.user?.profileUrl}
              margin="0 8px 0 0"
            ></Image>

            <Grid display="flex" flexDirection="column" width="auto">
              {props?.is_edit ? (
                <>
                  <EditInput
                    onChange={(e) => setNewComm(e.target.value)}
                    type="text"
                  ></EditInput>
                </>
              ) : (
                <>
                  <Grid display="flex" alignItems="center">
                    <Text width="auto" margin="0 5px 0 0" bold>
                      {props?.user?.nickname}
                    </Text>
                    <Text color="#818181" margin="0 10px 0 0" size="12px">
                      {props?.createdAt}
                    </Text>
                  </Grid>

                  <Text width="auto" margin="0" size="16px">
                    {props?.content}
                  </Text>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>

        {props?.is_edit ? (
          <>
            <Grid margin="0 0 0 48px" display="flex" alignItems="center">
              <Text
                cursor="pointer"
                _onClick={() => {
                  editComm(props?.commentId);
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
                  editToggle(props?.commentId);
                }}
                margin="0 16px 0 0"
              ></IconButton>
            </Grid>
          </>
        ) : (
          <Grid display="flex" margin="0 0 0 42px">
            <Text
              color="#818181"
              margin="0 16px 0 0"
              size="12px"
              cursor="pointer"
            >
              답글 {props?.recommentCount}개
            </Text>

            <Permit>
              <Text
                hover="color:#68F99E; font-weight:900;"
                color="#818181"
                margin="0 16px 0 0"
                size="12px"
                cursor="pointer"
                _onClick={() => {
                  setReCommBox(!reCommBox);
                }}
              >
                답글 쓰기
              </Text>
            </Permit>
            <Permit>
              {props?.user?.nickname === nickname ? (
                <>
                  <Text
                    hover="color:#68F99E; font-weight:900;"
                    cursor="pointer"
                    _onClick={() => {
                      editToggle(props?.commentId);
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
                      dispatch(_deleteCommentFX(props?.commentId));
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
      {reCommBox ? (
        <RecommentWrite
          setReCommBox={setReCommBox}
          commentId={props?.commentId}
        />
      ) : null}

      {!props.isRecomm
        ? recommentList?.map((e, idx) => {
            if (e === null) {
              return;
            }
            return props.commentId === e.commentId ? (
              <Fragment key={idx}>
                <Grid margin="0 0 12px 76px">
                  <RecommentItem
                    setReCommBox={setReCommBox}
                    commentId={props?.commentId}
                    {...e}
                  />
                </Grid>
              </Fragment>
            ) : null;
          })
        : null}
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

const Hr = styled.hr`
  width: 343px;
  height: 0px;
  border-top: 1px solid #f0f0f0;
  margin: 16px 0 0 0;
`;

const CommTextareaMob = styled.textarea`
  margin: 0;
  position: relative;
  width: 75%;
  height: 70px;
  background: white;
  outline: none;
  resize: none;
  font-size: 13px;
  box-sizing: border-box;
  overflow: scroll;
  border: none;
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

const CommBtnMob = styled.button`
  position: relative;
  bottom: 85px;
  left: 280px;
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
  width: 30px;
  margin: 0;
  position: relative;
  bottom: 120px;
  right: 0;
  left: 315px;
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

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: relative;
  bottom: 80px;
  left: 10px;
`;

export default CommentItem;
