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
import swal from "sweetalert";

import "../components/myPage/Evaluation.css";
import { Button } from "react-scroll";

const Evaluation = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const [modal, setModal] = useState(true);
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
      <Grid width="100%" justifyContent="center">
        <_Wrap>
          <Text bold size="19px" margin="100px 0 0 0">
            크루장 평가
          </Text>
          <_MyImage src={host?.hostUser?.user?.profileUrl} />
          <Text bold size="19px">
            {host?.hostUser?.user?.nickname}
          </Text>
          <Text size="16px" color="#858585">
            {host?.hostUser?.date} &nbsp; {host?.hostUser?.standbyTime} 에
            &nbsp; <br />
            {host?.hostUser?.title} 를 &nbsp;함께함
          </Text>
          <Text bold size="20px" margin="70px 0 0 0">
            {host?.hostUser?.user?.nickname}님의 그룹 러닝은 어땠나요?
          </Text>

          {emoji ? (
            <>
              <_Btn>
                <Icon>
                  <Image
                    style={{ margin: "5px 0 0 0" }}
                    src="https://ifh.cc/g/DPpn4L.png"
                  />
                  <Text bold size="16px">
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
                  <Text bold size="16px">
                    아쉬웠어요.
                  </Text>
                </Icon>
              </_Btn>

              <_Hr />

              <Text bold size="19px" margin="35px 0 30px 0">
                {host?.hostUser?.user?.nickname}님의 가장 좋았던 점을
                선택해주세요!
              </Text>

              <Grid
                flexWrap="Wrap"
                width="100%"
                display="flex"
                justifyContent="center"
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
                <_EvaluationButton
                  onClick={() => {
                    toggleModal();
                    dispatch(
                      evaluationDB(groupId, hostId, point, evaluationCategory)
                    );
                    dispatch(getRunningDB(userId));
                    history.push(`/mypage/${userId}`);
                  }}
                >
                  평가완료
                </_EvaluationButton>
              </Grid>
            </>
          ) : (
            <>
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
                  <Text bold size="16px">
                    좋았어요!
                  </Text>
                </Icon>
                <Icon>
                  <Image
                    style={{ margin: "5px 0 0 0" }}
                    src="https://ifh.cc/g/Nz1wV8.png"
                  />
                  <Text bold size="16px">
                    아쉬웠어요.
                  </Text>
                </Icon>
              </_Btn>
              <_Hr />

              <Text bold size="19px" margin="35px 0 30px 0">
                {host?.hostUser?.user?.nickname}님의 가장 아쉬웠던 점을
                선택해주세요!
              </Text>

              <Grid
                flexWrap="Wrap"
                width="100%"
                display="flex"
                justifyContent="center"
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
                <_EvaluationButton
                  onClick={() => {
                    toggleModal();
                    dispatch(
                      evaluationDB(groupId, hostId, point, evaluationCategory)
                    );
                    dispatch(getRunningDB(userId));
                    history.push(`/mypage/${userId}`);
                  }}
                >
                  평가완료
                </_EvaluationButton>
              </Grid>
            </>
          )}
        </_Wrap>
        <CBtn
          onClick={() => {
            history.push(`/mypage/${userId}`);
          }}
        >
          <AiOutlineClose size="22" color="#030c37" />
        </CBtn>
      </Grid>
    );
  }

  if (token) {
    return (
      <div>
        {modal && (
          <div>
            <Overlaye>
              <Wrap>
                <Text bold size="16px">
                  크루장 평가
                </Text>
                <MyImage src={host?.hostUser?.user?.profileUrl} />
                <Text bold size="14px">
                  {host?.hostUser?.user?.nickname}
                </Text>

                <Text size="13px" color="#858585" margin=" -8px 0 0 0">
                  {host?.hostUser?.date} &nbsp; {host?.hostUser?.standbyTime} 에
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
                    toggleModal();
                    dispatch(
                      evaluationDB(groupId, hostId, point, evaluationCategory)
                    );
                    dispatch(getRunningDB(userId));
                    history.push(`/mypage/${userId}`);
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
`;

const _MyImage = styled.img`
  height: 140px;
  width: 140px;
  margin-top: 30px;
  border-radius: 50%;
  justify-content: center;
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
  width: 200px;
  margin: 23px 0 0px 0px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
`;

const _Btn = styled.div`
  display: flex;
  border: none;
  align-items: center;
  margin: 30px 30px;
  justify-content: space-evenly;
  background-color: transparent;
`;

const EvaluationButton = styled.div`
  border: none;
  height: 38px;
  width: 175px;
  font-weight: bold;
  margin: 24px 0 10px 130px;
  padding-top: 14px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #dedede;
  :hover {
    color: #fff;
    background-color: #282932;
  }
`;

const _EvaluationButton = styled.div`
  border: none;
  height: 39px;
  width: 168px;
  font-weight: 500;
  margin: 30px 0 100px -10px;
  padding-top: 14px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #030c37;
  border-radius: 3px;
  font-size: 16px;
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
    width: 440px;
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
  margin: -16px 0 0 0;
  input {
    display: none;
  }
  input + p {
    width: 320px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80px;
    cursor: pointer;
    box-sizing: border-box;
    border: solid 1px #b8b8b8;
  }
  input:checked + p {
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
  width: 90px;
  height: 90px;
`;

export default Evaluation;
