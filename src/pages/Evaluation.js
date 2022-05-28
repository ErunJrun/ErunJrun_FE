import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvaluationDB,
  evaluationDB,
  getRunningDB,
} from "../redux/modules/mypage";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Text, Grid } from "../elements";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { getCookie } from "../shared/Cookie";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import backBtn from "../assets/groupFeed/backBtn.svg";
import swal from "sweetalert";

import "../components/myPage/Evaluation.css";
import { Button } from "react-scroll";

const Evaluation = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const [modal, setModal] = useState(true);
  const [checkModal, setCheckModal] = useState(false);
  const [emoji, setEmoji] = useState(true);
  const [evaluationCategory, setEvaluationCategory] = useState();
  const [point, setPoint] = useState(1);

  const host = useSelector((state) => state.mypage.host);
  const from = localStorage.getItem("from");
  const userId = localStorage.getItem("userId");
  const hostId = host?.hostUser?.user?.userId;
  const token = getCookie("accessToken");
  const { pathname } = useLocation();
  const params = useParams();
  const groupId = params.groupId;

  const mpoint = () => {
    if (emoji === true) {
      setPoint(-1);
    } else if (emoji === false) {
      setPoint(1);
    }
  };

  const [likeCategory, setLikeCategory] = useState([
    "진행한 코스가 만족스러웠어요!",
    "사람들을 잘 이끌어줬어요!",
    "궁금한 점에 대해 빠르게 답해줬어요!",
    "짐을 보관해줘서 편한 러닝이 가능했어요!",
    "시간 약속을 잘 지켰어요!",
  ]);

  const [category, setCategory] = useState([
    "진행한 코스가 아쉬웠어요.",
    "크루원에게 불친절했어요.",
    "응답이 늦었어요.",
    "변경사항을 안내해주지 않았어요.",
    "시간 약속을 잘 안지켰어요.",
  ]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const CKModal = () => {
    setCheckModal(true);
  };

  const change = () => {
    setEmoji(!emoji);
  };

  const choiceCategory = (idx) => {
    setEvaluationCategory(idx);
  };

  useEffect(() => {
    if (token) {
      dispatch(getEvaluationDB(groupId));
      localStorage.removeItem("from");
    }
  }, []);

  useEffect(() => {
    if (token && from) {
      dispatch(getEvaluationDB(groupId));
      localStorage.removeItem("from");
    }
  }, [token]);

  if (!token && isMobile) {
    swal("로그인 후 이용해 주세요");
    return <Redirect to={{ pathname: "/login", state: { from: pathname } }} />;
  }

  if (isMobile) {
    return (
      <>
        <Grid
          zIndex="3"
          bg="#ffffff"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="54px"
          display="flex"
          padding="10px 10px"
          margin="0 auto"
          boxShadow=" 0px 0px 30px #eee"
        >
          <Grid
            display="flex"
            width="375px"
            justifyContent="left"
            alignItems="center"
          >
            <img
              style={{ width: "10px", margin: "0 15px" }}
              src={backBtn}
              onClick={() => {
                history.go(-1);
              }}
            />
            <Text 
              margin="0 0 0 110px" 
              bold 
              size="16px"
            >
              크루장 평가
            </Text>
          </Grid>
        </Grid>
        <Grid width="100%" justifyContent="center">
          {checkModal === false ? 
            <_Wrap>
              <_MyImage src={host?.hostUser?.user?.profileUrl}/>
              <Text bold size="15px" margin="16px 0 0 0">
                {host?.hostUser?.user?.nickname}
              </Text>
              <Text regular size="14px" margin="12px 0 0 0">
                {host?.hostUser?.date} &nbsp; {host?.hostUser?.standbyTime}에
                &nbsp; <br />
                {host?.hostUser?.title} 를 &nbsp;함께함
              </Text>

            {emoji ? (
              <>
                <Grid
                  flexWrap="Wrap"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                >
                  <Grid 
                    width="343px" 
                    height="214px" 
                    boxShadow=" 0px 0px 30px #ddd"
                    borderRadius="16px"
                    textAlign="center"
                    margin="32px 0 0 0"
                  >
                    <Text bold size="14px" margin="32px 0 0 0">
                      {host?.hostUser?.user?.nickname}님의 그룹 러닝은 어땠나요?
                    </Text>
                    <_Btn>
                      <Icon>
                        <Image
                          style={{ margin: "5px 0 0 0" }}
                          src="https://ifh.cc/g/DPpn4L.png"
                        />
                        <Text size="13px">
                          좋았어요!
                        </Text>
                      </Icon>
                      <Icon>
                        <Image
                          style={{ margin: "5px 0 0 0" }}
                          src="https://ifh.cc/g/a8rsZ8.png"
                          onClick={() => {
                            change();
                            mpoint();
                          }}
                        />
                        <Text size="13px" color="#7b7b7b">
                          아쉬웠어요.
                        </Text>
                      </Icon>
                    </_Btn>
                  </Grid>
                </Grid>

                <Grid
                  flexWrap="Wrap"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                >
                  <Grid 
                    width="343px" 
                    height="382px" 
                    boxShadow=" 0px 0px 30px #ddd"
                    borderRadius="16px"
                    textAlign="center"
                    margin="32px 0 80px 0"
                  >
                    <Text bold size="14px" margin="32px 0 -32px 0">
                    가장 좋았던 부분을 하나 선택해주세요.
                    </Text>
                    <Grid
                      flexWrap="Wrap"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      padding= "62px 0 60px 0"
                    >
                      {likeCategory.map((e, idx) => {
                        return (
                          <Fragment key={idx}>
                            <_LabelDistance>
                              <input
                                onClick={() => {
                                  choiceCategory(idx + 1);
                                }}
                                type="radio"
                                name="likeCategory"
                                value={e}
                              ></input>
                              <Text bold>{e}</Text>
                            </_LabelDistance>
                          </Fragment>
                        );
                      })}
                    </Grid>
                  </Grid>
                
                  <_EvaluationButton
                    onClick={() => {
                      CKModal();
                    }}
                  >
                    평가완료
                  </_EvaluationButton> 
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  flexWrap="Wrap"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                >
                  <Grid 
                    width="343px" 
                    height="214px" 
                    boxShadow=" 0px 0px 30px #ddd"
                    borderRadius="16px"
                    textAlign="center"
                    margin="32px 0 0 0"
                  >
                    <Text bold size="14px" margin="32px 0 0 0">
                      {host?.hostUser?.user?.nickname}님의 그룹 러닝은 어땠나요?
                    </Text>
                    <_Btn>
                      <Icon>
                        <Image
                          style={{ margin: "5px 0 0 0" }}
                          src="https://ifh.cc/g/cmv5yP.png"
                          onClick={() => {
                            change();
                            mpoint();
                          }}
                        />
                        <Text size="13px"  color="#7b7b7b">
                          좋았어요!
                        </Text>
                      </Icon>
                      <Icon>
                        <Image
                          style={{ margin: "5px 0 0 0" }}
                          src="https://ifh.cc/g/Nz1wV8.png"
                        />
                        <Text size="13px">
                          아쉬웠어요.
                        </Text>
                      </Icon>
                    </_Btn>
                  </Grid>
                </Grid>

                <Grid
                  flexWrap="Wrap"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                >
                  <Grid 
                    width="343px" 
                    height="382px" 
                    boxShadow=" 0px 0px 30px #ddd"
                    borderRadius="16px"
                    textAlign="center"
                    margin="32px 0 80px 0"
                  >
                    <Text bold size="14px" margin="32px 0 -32px 0">
                      가장 아쉬웠던 부분을 하나 선택해주세요.
                    </Text>
                    <Grid
                      flexWrap="Wrap"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      padding= "62px 0 60px 0"
                    >
                      {category.map((e, idx) => {
                        return (
                          <Fragment key={idx}>
                            <_LabelDistance>
                              <input
                                onClick={() => {
                                  choiceCategory(idx + 6);
                                }}
                                type="radio"
                                name="category"
                                value={e}
                              ></input>
                              <Text bold>{e}</Text>
                            </_LabelDistance>
                          </Fragment>
                        );
                      })}
                      </Grid>
                    </Grid>
                  <_EvaluationButton
                    onClick={() => {
                      CKModal();
                    }}
                  >
                    평가완료
                  </_EvaluationButton>   
                </Grid>            
              </>
            )}
          </_Wrap>
          :
          <_Wrap>
            <MyImage style={{margin:"150px 0 0 0"}} src={host?.hostUser?.user?.profileUrl} />
            <Text bold size="15px" margin="16px 0 0 0">
              {host?.hostUser?.user?.nickname}
            </Text>
            <Text 
              bold 
              size="14px" 
              margin="40px 0 0 0"
            >
              크루장 평가가 완료되었습니다.<br/>
              평가해주셔서 감사합니다!
            </Text>
            <Grid
              flexWrap="Wrap"
              width="100%"
              display="flex"
              justifyContent="center"
            >
              <Grid 
                width="200px" 
                height="44px" 
                margin="168px 0 100px 0px"
                bg="#030c37"
                padding="12px 0 0 0"
                _onClick={() => {
                  toggleModal();
                  dispatch(
                    evaluationDB(groupId, hostId, point, evaluationCategory, userId)
                  );
                  dispatch(getRunningDB(userId));                 
                }}>
                <Text
                  size="14px"
                  color="#fff"
                  margin="0 0 100px 0px"
                >
                  마이페이지로 이동하기
                </Text>
              </Grid>
            </Grid>
          </_Wrap>
          }
          

          <CBtn
            onClick={() => {
              history.push(`/mypage/${userId}`);
            }}
          >
            <AiOutlineClose size="22" color="#030c37" />
          </CBtn>

        </Grid>
      </>
    );
  }

  if (token) {
    return (
      <div>
        {modal && (
          <div>
            <Overlaye>
              {checkModal === false ? 
                <Wrap>
                  <Text bold size="16px">
                    크루장 평가
                  </Text>
                  <MyImage src={host?.hostUser?.user?.profileUrl} />
                  <Text bold size="14px">
                    {host?.hostUser?.user?.nickname}
                  </Text>                   
                  <Text size="13px" color="#858585" margin=" -8px 0 0 0">
                    {host?.hostUser?.date} &nbsp; {host?.hostUser?.standbyTime}에
                    &nbsp; {host?.hostUser?.title}를 &nbsp;함께함
                  </Text>
                  <Hr />

                  <Text bold size="18px">
                    {host?.hostUser?.user?.nickname}님의 그룹 러닝은 어땠나요?
                  </Text>
                
                  {emoji ? (
                    <>
                      <Btn>
                        <Icon>
                          <Img
                            style={{ margin: "-3px 0 -8px 0" }}
                            src="https://ifh.cc/g/DPpn4L.png"
                          />
                          <Text bold size="15px">
                            좋았어요!
                          </Text>
                        </Icon>
                      </Btn>

                      <Btn>
                        <Img
                          style={{ margin: "-3px 0 -8px 0" }}
                          src="https://ifh.cc/g/a8rsZ8.png"
                          onClick={() => {
                            change();
                            mpoint();
                          }}
                        />
                        <Text bold size="15px">
                          아쉬웠어요.
                        </Text>
                      </Btn>
                      <Hr />

                      <Text bold size="20px" margin="20px 0 20px 0">
                        {host?.hostUser?.user?.nickname}님의 가장 좋았던 점을
                        선택해주세요!
                      </Text>

                      <Grid
                        flexWrap="Wrap"
                        maxWidth="1000px"
                        width="100%"
                        height="400px"
                        display="flex"
                      >
                        {likeCategory.map((e, idx) => {
                          return (
                            <Fragment key={idx}>
                              <LabelDistance>
                                <input
                                  onClick={() => {
                                    choiceCategory(idx + 1);
                                  }}
                                  type="radio"
                                  name="likeCategory"
                                  value={e}
                                ></input>
                                <Text bold>{e}</Text>
                              </LabelDistance>
                            </Fragment>
                          );
                        })}
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Btn>
                        <Icon>
                          <Img
                            style={{ margin: "-3px 0 -8px 0" }}
                            src="https://ifh.cc/g/cmv5yP.png"
                            onClick={() => {
                              change();
                              mpoint();
                            }}
                          />
                          <Text bold size="15px">
                            좋았어요!
                          </Text>
                        </Icon>
                      </Btn>

                      <Btn>
                        <Img
                          style={{ margin: "-3px 0 -8px 0" }}
                          src="https://ifh.cc/g/Nz1wV8.png"
                        />
                        <Text bold size="15px">
                          아쉬웠어요.
                        </Text>
                      </Btn>
                      <Hr />

                      <Text bold size="20px" margin="20px 0 20px 0">
                        {host?.hostUser?.user?.nickname}님의 가장 아쉬웠던 점을
                        선택해주세요!
                      </Text>

                      <Grid
                        flexWrap="Wrap"
                        maxWidth="1000px"
                        width="100%"
                        height="400px"
                        display="flex"
                      >
                        {category.map((e, idx) => {
                          return (
                            <Fragment key={idx}>
                              <LabelDistance>
                                <input
                                  onClick={() => {
                                    choiceCategory(idx + 6);
                                  }}
                                  type="radio"
                                  name="category"
                                  value={e}
                                ></input>
                                <Text bold>{e}</Text>
                              </LabelDistance>
                            </Fragment>
                          );
                        })}
                      </Grid>
                    </>
                  )}
                  <EvaluationButton
                    onClick={() => {
                      CKModal();                       
                    }}
                  >
                    평가완료
                  </EvaluationButton>
                    <button
                      className="_close-modal"
                      onClick={() => {
                        history.push(`/mypage/${userId}`);
                      }}
                    >
                      <AiOutlineClose size="22" color="#222" />
                    </button>
                </Wrap>
                : 
                <Wrap>
                  <Text 
                  bold 
                  size="16px"
                  >
                    크루장 평가
                  </Text>
                  <MyImage src={host?.hostUser?.user?.profileUrl} />
                  <Text bold size="14px">
                    {host?.hostUser?.user?.nickname}
                  </Text>
                  <Text 
                    bold 
                    size="20px" 
                    margin="50px 0 0 0"
                  >
                    평가해주셔서 감사합니다!
                  </Text>
                  <Grid 
                    width="168px" 
                    height="48px" 
                    border="1px solid #DDDDDD"
                    margin="280px 0 0 115px"
                    hover="border:2px solid #DDDDDD;"
                    _onClick={() => {
                      toggleModal();
                      dispatch(
                        evaluationDB(groupId, hostId, point, evaluationCategory, userId)
                      );
                      dispatch(getRunningDB(userId));                 
                    }}>
                    <Text
                      bold
                      size="16px"
                      margin="12px 0 0 0"
                    >
                      닫기
                    </Text>
                  </Grid>
                </Wrap>
                }        
            </Overlaye>
          </div>
        )}
      </div>
    );
  }
  if (!token) {
    swal("로그인 후 이용해 주세요");
    return <Redirect to={{ pathname: "/login", state: { from: pathname } }} />;
  }
};

const MyImage = styled.img`
  height: 95px;
  width: 95px;
  margin: 10px 40px 0px 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const _MyImage = styled.img`
  height: 110px;
  width: 110px;
  border-radius: 50%;
  justify-content: center;
  object-fit: cover;
  margin-top: 100px;
  border: solid 2px #ddd;
`;

const Icon = styled.div`
  margin-top: 10px;
  width: 80px;
`;

const Hr = styled.div`
  width: 457px;
  height: 1px;
  margin: 25px 0 15px 0px;
  background-color: #ddd;
`;

const _Hr = styled.div`
  width: 100%;
  height: 1px;
  margin: 0px 0 40px 0;
  background-color: #ddd;
`;

const Btn = styled.button`
  border: none;
  height: 80px;
  width: 150px;
  margin: 23px 0 0px 0px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  z-index: 0;
`;

const _Btn = styled.div`
  display: flex;
  border: none;
  align-items: center;
  margin: 13px -5px 0px -5px;
  justify-content: space-evenly;
  background-color: transparent;
`;

const EvaluationButton = styled.div`
  border: none;
  height: 52px;
  width: 175px;
  font-weight: bold;
  margin: 44px 0 40px 110px;
  padding-top: 14px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #dedede;
  cursor: pointer;
  :hover {
    color: #fff;
    background-color: #282932;
  }
`;

const _EvaluationButton = styled.div`
  border: none;
  height: 44px;
  width: 200px;
  margin: 30px 0 100px -10px;
  padding-top: 12px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #030c37;
  border-radius: 3px;
  font-size: 14px;
  color: #68f99e;
`;

const Overlaye = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(49, 49, 49, 0.8);
  z-index: 2;
`;

const Wrap = styled.div`
  z-index: 0;
  position: absolute;
  left: 35.3%;
  top: 120px;
  margin: 0;
  padding: 14px 28px;
  width: 450px;
  height: 700px;
  background: #ffffff;
  box-shadow: 3px 8px 17px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: center;
  line-height: 1.4;
  overflow: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background-color: gray;
    border-radius: 10px;
  }
`;

const _Wrap = styled.div`
  text-align: center;
`;

const LabelDistance = styled.label`
  input {
    display: none;
  }
  input + p {
    width: 390px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80px;
    cursor: pointer;
    box-sizing: border-box;
    border: solid 1px #b8b8b8;
    padding: 20% auto;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #030c37;
  }
`;

const _LabelDistance = styled.label`
  margin: -10px 0 0 0;
  input {
    display: none;
  }
  input + p {
    width: 311px;
    height: 43px;
    display: flex;
    font-size: 12px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    border-radius: 80px;
    cursor: pointer;
    box-sizing: border-box;
    border: solid 1px #b8b8b8;
  }
  input:checked + p {
    border: none;
    background-color: #68f99e;
    color: #030c37;
  }
`;

const CBtn = styled.div`
  margin: -1275px 0 0 87%;
`;

const Img = styled.img`
  width: 75px;
  height: 75px;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
`;

export default Evaluation;