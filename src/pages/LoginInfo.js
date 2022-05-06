import React, { Fragment, useState } from "react";
import { Text, Grid } from "../elements";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginInfoDB } from "../redux/modules/user";

const LoginInfo = () => {
  const dispatch = useDispatch();
  const [checkedRegion, setCheckedRegion] = useState("");
  const [checkedDistance, setCheckedDistance] = useState("");
  const [checkedExp, setCheckedExp] = useState("");

  console.log(checkedRegion, checkedDistance, checkedExp);

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
    "5km미만",
    "5km 이상 10km 미만",
    "10km 이상 15km 미만",
    "15km 이상",
    "잘 모르겠어요",
  ]);

  const [runExp, setRunExp] = useState([
    "처음이예요",
    "블루",
    "레드",
    "오렌지",
    "골드",
  ]);

  const [runExpComment, setRunExpComment] = useState([
    "러닝은 태어나서 처음!",
    "1달에 5회 미만으로 뛰어요!",
    "1달에 10회 미만으로 뛰어요!",
    "1달에 15회 미만으로 뛰어요!",
    "1달에 15회 이상으로 뛰어요!",
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
    dispatch(loginInfoDB(checkedRegion, checkedDistance, checkedExp));
  };

  return (
    <>
      <Grid maxWidth="1000px" margin="68px auto">
        <Grid>
          <Text bold size="36px">
            방남지님의 러닝 스타일을 알려주세요
          </Text>
          <Text size="24px">원하는 크루를 찾기 쉽도록 도와드릴게요!</Text>
        </Grid>

        <Grid margin="70px 0 0 0" display="flex" flexDirection="column">
          <Text margin="0" bold size="28px">
            선호지역
          </Text>
          <Text margin="0" size="24px">
            주로 활동하시는 지역을 선택해주세요.
          </Text>
          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runRegion.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <Label checked={checkedRegion}>
                    <input
                      onClick={() => {
                        choiceRegion(idx);
                      }}
                      type="radio"
                      name="runRegion"
                      value={e}
                    ></input>
                    <Text bold>{e}</Text>
                  </Label>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>

        <Grid margin="70px 0 0 0" display="flex" flexDirection="column">
          <Text margin="0" bold size="28px">
            선호 거리
          </Text>

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
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
                    <Text bold>{e}</Text>
                  </LabelDistance>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>

        <Grid margin="70px 0 0 0" display="flex" flexDirection="column">
          <Text margin="0" bold size="28px">
            러닝 경험
          </Text>
          <Text margin="0" size="20px">
            1달 기준의 러닝 횟수를 선택해주세요.
          </Text>

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runExp.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <LabelExp checked={checkedExp}>
                    <input
                      onClick={() => {
                        choiceExp(e);
                      }}
                      type="radio"
                      name="runExp"
                      value={e}
                    ></input>
                    <Text bold>{e}</Text>
                  </LabelExp>
                </Fragment>
              );
            })}
          </Grid>
          <Grid display="flex" justifyContent="center">
            <Text size="24px" bold>
              {runExpComment[0]}
            </Text>
          </Grid>
        </Grid>

        <Grid margin="116px 0" display="flex" justifyContent="center">
          <StartBtn onClick={addLoginInfo}>러닝시작하기</StartBtn>
        </Grid>
      </Grid>
    </>
  );
};

const LabelExp = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 10px;
    width: 180px;
    height: 50px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 11px auto;
    border-radius: 3px;
    border: solid 1px #000;
    cursor: pointer;
    box-sizing: border-box;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #000;
  }
`;

const LabelDistance = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 10px;
    width: 180px;
    height: 74px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 11px auto;
    border-radius: 3px;
    border: solid 1px #000;
    cursor: pointer;
    box-sizing: border-box;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #000;
  }
`;

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 10px 5px;
    width: 316px;
    height: 74px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 24px auto;
    border-radius: 3px;
    border: solid 1px #000;
    cursor: pointer;
    box-sizing: border-box;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #000;
  }
`;

const StartBtn = styled.button`
  box-sizing: border-box;
  width: 350.91px;
  height: 66px;
  background: #000000;
  border: 1px solid #000000;
  border-radius: 4px;
  color: white;
`;

export default LoginInfo;
