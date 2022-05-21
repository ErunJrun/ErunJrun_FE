import React, { Fragment, useEffect, useState } from "react";
import { Text, Grid } from "../elements";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginInfoDB } from "../redux/modules/user";
import LevelBox from "../components/groupDetail/LevelBox";
import LevelShoes from "../components/LevelShoes";
import runStyleCharacterMob from "../assets/loginInfo/runStyleCharacterMob.png";
import runStyleCharacter from "../assets/loginInfo/runStyleCharacter.png";
import { history } from "../redux/configureStore";
import Ready from "../shared/Ready";
import { getCookie } from "../shared/Cookie";

import { useMediaQuery } from "react-responsive";

const LoginInfo = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const [checkedRegion, setCheckedRegion] = useState("");
  const [checkedDistance, setCheckedDistance] = useState("");
  const [checkedExp, setCheckedExp] = useState("");

  const firstLogin = localStorage.getItem("firstLogin");
  const nickname = localStorage.getItem("nickname");
  const token = getCookie("accessToken");

  useEffect(() => {
    if (firstLogin === "false" || !token) {
      window.alert("비정상적인 접근입니다.");
      history.replace("/login");
    }
  }, []);

  const [runRegion, setRunRegion] = useState([
    "서울특별시",
    "경기도",
    "강원도",
    "인천광역시",
    "충청도 / 세종특별자치시 / 대전광역시",
    "경상북도 / 대구광역시",
    "경상남도 / 부산광역시 / 울산광역시",
    "전라도 / 광주광역시",
    "제주특별자치시",
  ]);

  const [runRegionMob, setRunRegionMob] = useState([
    "서울",
    "경기",
    "강원",
    "인천",
    "충청 / 세종 / 대전",
    "경북 / 대구",
    "경남 / 부산 / 울산",
    "전라 / 광주",
    "제주",
  ]);

  const [runDistance, setRunDistance] = useState([
    "잘 모르겠어요",
    "5km미만",
    `    5km 이상 
  10km 미만`,
    `   10km 이상
   15km 미만`,
    "15km 이상",
  ]);

  const [runDistanceMob, setRunDistanceMob] = useState([
    "잘 모르겠어요",
    "5km미만",
    "5km 이상 10km 미만",
    "10km 이상 15km 미만",
    "15km 이상",
  ]);

  const [runExp, setRunExp] = useState([
    "오렌지",
    "퍼플",
    "블루",
    "레드",
    "블랙",
  ]);

  const [runExpComment, setRunExpComment] = useState([
    "처음이에요",
    "5회 미만",
    `5회 이상 10회 미만`,
    `10회 이상 15회 미만`,
    `15회 이상`,
  ]);

  const [runExpCommentMob, setRunExpCommentMob] = useState([
    "처음이에요",
    "5회 미만",
    "5회 이상 10회 미만",
    "10회 이상 15회 미만",
    "15회 이상",
  ]);

  const choiceRegion = (idx) => {
    setCheckedRegion(idx);
  };

  const choiceDistance = (idx) => {
    setCheckedDistance(idx);
  };

  const choiceExp = (e) => {
    setCheckedExp(e);
  };

  const addLoginInfo = () => {
    if (
      checkedRegion === "1" ||
      checkedDistance === "" ||
      runExp[checkedExp] === undefined
    ) {
      return window.alert("미선택 된 항목이 있습니다.");
    } else {
      dispatch(loginInfoDB(checkedRegion, checkedDistance, runExp[checkedExp]));
    }
  };

  // console.log(checkedRegion, checkedDistance, checkedExp, runExp[checkedExp]);

  if (isMobile && firstLogin) {
    return (
      <>
        <Grid
          display="flex"
          justifyContent="center"
          width="343px"
          margin="130px auto "
        >
          <LoginCharacterMob src={runStyleCharacterMob}></LoginCharacterMob>
          <Grid display="flex" justifyContent="center" margin="24px 0 48px 0">
            <Text margin="0" bold>
              <span style={{ color: "#68F99E" }}>
                {nickname ? nickname : "이RUN저RUN"}
              </span>
              님의 러닝 스타일을 알려주세요
            </Text>
            <Text regular margin="8px 0 0 0" size="12px">
              러닝 스타일에 딱 맞는 그룹 러닝을 추천해드립니다.
            </Text>
          </Grid>

          <Grid
            bg="white"
            width="343px"
            height="248px"
            boxShadow="0px 0px 12px rgba(183, 183, 183, 0.35)"
            borderRadius="16px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding="24px 16px 32px 16px"
          >
            <Grid
              width="auto"
              height="auto"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              margin="0 0 24px 0"
            >
              <Text margin="0 0 10px 0" bold size="12px">
                Step 1
              </Text>
              <Text margin="0" bold size="12px">
                선호하는 러닝 지역을 선택해주세요!
              </Text>
            </Grid>

            <Grid
              width="311px"
              height="122px"
              margin="0"
              display="flex"
              justifyContent="space-between"
            >
              {runRegionMob.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <LabelMob checked={checkedRegion}>
                      <input
                        onClick={() => {
                          choiceRegion(idx + 1);
                        }}
                        type="radio"
                        name="runRegion"
                        value={e}
                      ></input>
                      <Text margin="0" regular size="11px">
                        {e}
                      </Text>
                    </LabelMob>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>

          <Grid
            bg="white"
            width="343px"
            height="344px"
            boxShadow="0px 0px 12px rgba(183, 183, 183, 0.35)"
            borderRadius="16px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding="24px 16px 32px 16px"
            margin="24px 0 0 0"
          >
            <Grid
              width="auto"
              height="auto"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              margin="0 0 24px 0"
            >
              <Text margin="0 0 10px 0" bold size="12px">
                Step 2
              </Text>
              <Text margin="0" bold size="12px">
                선호하는 러닝 거리를 선택해주세요!
              </Text>
            </Grid>

            <Grid
              width="311px"
              height="218px"
              margin="0"
              display="flex"
              justifyContent="center"
            >
              {runDistanceMob.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <LabelDistanceMob checked={checkedDistance}>
                      <input
                        onClick={() => {
                          choiceDistance(idx);
                        }}
                        type="radio"
                        name="runDistance"
                        value={e}
                      ></input>
                      <Text margin="0" regular size="11px">
                        {e}
                      </Text>
                    </LabelDistanceMob>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>

          <Grid
            bg="white"
            width="343px"
            height="393px"
            boxShadow="0px 0px 12px rgba(183, 183, 183, 0.35)"
            borderRadius="16px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding="24px 16px 32px 16px"
            margin="24px 0 0 0"
          >
            <Grid
              width="auto"
              height="auto"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              margin="0 0 24px 0"
            >
              <Text margin="0 0 10px 0" bold size="12px">
                Step 3
              </Text>
              <Text margin="0" bold size="12px">
                러닝 횟수(1달 기준)를 선택해주세요!
              </Text>
            </Grid>

            <Grid
              width="311px"
              height="218px"
              margin="0 0 32px 0"
              display="flex"
              justifyContent="center"
            >
              {runExpComment.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <LabelExpMob checkLevel={checkedExp} checked={checkedExp}>
                      <input
                        onClick={() => {
                          choiceExp(idx);
                        }}
                        type="radio"
                        name="runExp"
                        value={idx}
                      ></input>
                      <Text margin="0" regular size="11px">
                        {e}
                      </Text>
                    </LabelExpMob>
                  </Fragment>
                );
              })}
            </Grid>
            <Grid
              height="auto"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {checkedExp >= 0 && checkedExp !== "" ? (
                <>
                  <LevelShoes isMobile={true} userLevel={runExp[checkedExp]} />
                  <Text
                    display="flex"
                    alignItems="center"
                    size="12px"
                    margin="0 0 0 8px"
                  >
                    당신의 러닝 레벨은
                    <LevelBox loginInfo={true} userLevel={runExp[checkedExp]} />
                    입니다!
                  </Text>
                </>
              ) : null}
            </Grid>
          </Grid>

          <Grid margin="80px 0 0 0" display="flex" justifyContent="center">
            <StartBtnMob onClick={addLoginInfo}>러닝 시작하기</StartBtnMob>
          </Grid>
        </Grid>
      </>
    );
  }

  if (!firstLogin) {
    return (
      <>
        <HeaderBox>
          <Logo
            onClick={() => {
              history.push("/");
            }}
          >
            <img src="https://ifh.cc/g/hmlgTz.png" />
          </Logo>
        </HeaderBox>
        <Grid width="800px" margin="72px auto ">
          <LoginCharacter src={runStyleCharacter}></LoginCharacter>
          <Grid margin="0 0 51px 0">
            <Text margin="45px 0 0 0" bold size="30px">
              <span style={{ color: "#68F99E" }}>{nickname}</span>님의 러닝
              스타일을 알려주세요
            </Text>
            <Text margin="8px 0 0 0" size="20px">
              러닝 스타일에 딱 맞는 그룹 러닝을 추천해드립니다.
            </Text>
          </Grid>

          <Grid margin="0 0 84px 0" display="flex" flexDirection="column">
            <Text margin="0 0 16px 0" bold size="18px">
              선호하는 러닝 지역
            </Text>
            <Hr />

            <Grid margin="0" display="flex" justifyContent="space-between">
              {runRegion.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <Label checked={checkedRegion}>
                      <input
                        onClick={() => {
                          choiceRegion(idx + 1);
                        }}
                        type="radio"
                        name="runRegion"
                        value={e}
                      ></input>
                      <Text size="14px" bold>
                        {e}
                      </Text>
                    </Label>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>

          <Grid margin="0 0 84px 0" display="flex">
            <Text
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="0 0 16px 0"
              bold
              size="18px"
            >
              선호하는 러닝 거리
            </Text>
            <Hr />

            <Grid
              margin="20px 0 0 0"
              display="flex"
              justifyContent="space-between"
            >
              {runDistance.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <LabelDistance checked={checkedDistance}>
                      <input
                        onClick={() => {
                          choiceDistance(idx);
                        }}
                        type="radio"
                        name="runDistance"
                        value={e}
                      ></input>
                      <Text size="14px" bold>
                        {e}
                      </Text>
                    </LabelDistance>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>

          <Grid margin="70px 0 0 0" display="flex" flexDirection="column">
            <Text
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="0 0 16px 0"
              bold
              size="18px"
            >
              1달 기준 러닝 횟수
            </Text>
            <Hr />

            <Grid
              margin="20px 0 20px 0"
              display="flex"
              justifyContent="space-between"
            >
              {runExpComment.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <LabelExp checkLevel={checkedExp} checked={checkedExp}>
                      <input
                        onClick={() => {
                          choiceExp(idx);
                        }}
                        type="radio"
                        name="runExp"
                        value={idx}
                      ></input>
                      <Text size="14px" bold>
                        {e}
                      </Text>
                    </LabelExp>
                  </Fragment>
                );
              })}
            </Grid>
            <Grid display="flex" justifyContent="center" alignItems="center">
              {checkedExp >= 0 && checkedExp !== "" ? (
                <>
                  <LevelShoes userLevel={runExp[checkedExp]} />
                  <Text
                    display="flex"
                    alignItems="center"
                    size="16px"
                    bold
                    margin="0 0 0 8px"
                  >
                    당신의 러닝 레벨은
                    <LevelBox userLevel={runExp[checkedExp]} />
                    입니다.
                  </Text>
                </>
              ) : null}
            </Grid>
          </Grid>

          <Grid margin="116px 0" display="flex" justifyContent="center">
            <StartBtn onClick={addLoginInfo}>러닝시작하기</StartBtn>
          </Grid>
        </Grid>
      </>
    );
  }

  return <></>;
};

const LoginCharacter = styled.img`
  width: 280px;
  height: 139px;
`;

const LoginCharacterMob = styled.img`
  width: 172.88px;
  height: 89px;
  margin-left: 51px;
`;

const Hr = styled.hr`
  width: 800px;
  height: 0px;
  border: 1px solid #000000;
  margin: 0;
`;

const LabelExp = styled.label`
  input {
    display: none;
  }
  input + p {
    width: 147px;
    height: 64px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 100px;
    cursor: pointer;
    background-color: #f0f0f0;
  }
  input:checked + p {
    ${(props) =>
      props.checkLevel === 0
        ? "background-color:  #FF823B;"
        : props.checkLevel === 1
        ? "background-color:  #BD6AFF;"
        : props.checkLevel === 2
        ? "background-color:  #4248C4;"
        : props.checkLevel === 3
        ? "background-color: #EE4343;"
        : props.checkLevel === 4
        ? "background-color:  #303030;"
        : null}
    ${(props) => (props.checkLevel === 4 ? "color:  white;" : "color: black;")}
    font-weight: 500;
  }
`;

const LabelDistance = styled.label`
  input {
    display: none;
  }
  input + p {
    width: 147px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    border-radius: 100px;
    cursor: pointer;
    box-sizing: border-box;
    background-color: #f0f0f0;
  }
  input:checked + p {
    background-color: #68f99e;
    color: black;
  }
`;

const LabelDistanceMob = styled.label`
  input {
    display: none;
  }

  input + p {
    width: 311px;
    height: 34px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 35px;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0;
    border: solid 1px #b8b8b8;
    gap: 8px;
  }
  input:checked + p {
    background-color: #68f99e;
    color: black;
    border: 1px solid #68f99e;
    font-weight: 500;
  }
`;

const LabelExpMob = styled.label`
  input {
    display: none;
  }

  input + p {
    width: 311px;
    height: 34px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 35px;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #b8b8b8;
    gap: 8px;
  }
  input:checked + p {
    ${(props) =>
      props.checkLevel === 0
        ? "background-color:  #FF823B;"
        : props.checkLevel === 1
        ? "background-color:  #BD6AFF;"
        : props.checkLevel === 2
        ? "background-color:  #4248C4;"
        : props.checkLevel === 3
        ? "background-color: #EE4343;"
        : props.checkLevel === 4
        ? "background-color:  #303030;"
        : null}
    ${(props) => (props.checkLevel === 4 ? "color:  white;" : "color: black;")}
    font-weight: 500;
  }
`;

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    width: 256px;
    height: 56px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 100px;
    cursor: pointer;
    box-sizing: border-box;
    background-color: #f0f0f0;
  }
  input:checked + p {
    background-color: #68f99e;
    color: black;
  }
`;

const LabelMob = styled.label`
  input {
    display: none;
  }
  input + p {
    width: 99px;
    height: 34px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 35px;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0;
    border: solid 1px #b8b8b8;
    gap: 8px;
  }

  input:checked + p {
    background-color: #68f99e;
    color: black;
    border: #68f99e;
    font-weight: 500;
  }
`;

const StartBtn = styled.button`
  margin: 0;
  box-sizing: border-box;
  width: 200px;
  height: 56px;
  background: #030c37;
  border-radius: 6px;
  color: #68f99e;
  border: none;
  font-size: 18px;
  font-weight: 700;
  :hover {
    box-shadow: 0 0 4px #030c37;
    font-size: 19px;
  }
`;

const StartBtnMob = styled.button`
  margin: 0;
  box-sizing: border-box;
  width: 200px;
  height: 44px;
  background: #030c37;
  border-radius: 6px;
  color: #68f99e;
  font-family: "Spoqa Han Sans Neo";
  border: none;
  font-size: 14px;
  font-weight: 500;
  :hover {
    box-shadow: 0 0 4px black;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  height: 90px;
  background-color: #030c37;
  align-items: center;
  min-width: 700px;
  justify-content: center;
  position: relative;
`;

const Logo = styled.div`
  width: 128px;
  height: 71.1px;
  margin-right: 1100px;
  cursor: pointer;
  justify-content: flex-start;
`;
export default LoginInfo;
