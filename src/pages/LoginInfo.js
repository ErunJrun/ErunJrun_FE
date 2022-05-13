import React, { Fragment, useEffect, useState } from "react";
import { Text, Grid } from "../elements";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginInfoDB } from "../redux/modules/user";
import LevelBox from "../components/groupDetail/LevelBox";
import LevelShoes from "../components/LevelShoes";

import runStyleCharacter from "../assets/loginInfo/runStyleCharacter.png";

const LoginInfo = () => {
  const dispatch = useDispatch();
  const [checkedRegion, setCheckedRegion] = useState("");
  const [checkedDistance, setCheckedDistance] = useState("");
  const [checkedExp, setCheckedExp] = useState("");

  const nickname = localStorage.getItem("nickname");

  // useEffect(() => {
  //   if (!nickname) {
  //     window.alert("비정상적인 접근입니다.");
  //     history.push("/login");
  //   }
  // }, []);

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

  const [runDistance, setRunDistance] = useState([
    "잘 모르겠어요",
    `    5km 이상 
  10km 미만`,
    `   10km 이상
   15km 미만`,
    "15km 이상",
    "5km미만",
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
      checkedRegion === null ||
      checkedDistance === null ||
      checkedExp === null
    ) {
      return window.alert("미선택 된 항목이 있습니다.");
    } else {
      dispatch(loginInfoDB(checkedRegion, checkedDistance, runExp[checkedExp]));
    }
  };

  console.log(checkedRegion, checkedDistance, checkedExp, runExp[checkedExp]);

  if (nickname) {
    return (
      <>
        <Grid maxWidth="800px" width="100%" margin="72px auto ">
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
                    <LabelExp checked={checkedExp}>
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
              {checkedExp >= 0 ? (
                <>
                  <LevelShoes userLevel={runExp[checkedExp]} />
                  <Text
                    display="flex"
                    alignItems="center"
                    size="16px"
                    bold
                    margin="0 0 0 8px"
                  >
                    당신의 러닝 레벨은{"  "}
                    <LevelBox userLevel={runExp[checkedExp]} />
                    {"  "}
                    {"  "}입니다.
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
};

const LoginCharacter = styled.img`
  width: 280px;
  height: 139px;
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
    background-color: #68f99e;
    color: #030c37;
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
    color: #030c37;
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
    color: #030c37;
  }
`;

const Span = styled.span`
  ${(props) => (props.runExp === 0 ? `color:#FF823B ;` : "")}
  ${(props) => (props.runExp === 1 ? `color:#BD6AFF ;` : "")}
  ${(props) => (props.runExp === 2 ? `color: #4248C4;` : "")}
  ${(props) => (props.runExp === 3 ? `color:#EE4343;` : "")}
  ${(props) => (props.runExp === 4 ? `color: #303030;` : "")}
`;

const StartBtn = styled.button`
  margin: 0 0 320px 0;
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

export default LoginInfo;
