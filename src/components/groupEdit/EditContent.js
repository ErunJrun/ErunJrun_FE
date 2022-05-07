import { useSelect } from "@mui/base";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text, Input } from "../../elements";
import { editGroupContent } from "../../redux/modules/feed";

const EditContent = (props) => {
  const dispatch = useDispatch();
  console.log(props);

  const [runTypeList, setRunTypeList] = useState([
    "도시",
    "공원",
    "트랙",
    "강변",
    "산",
    "해변",
  ]);
  const [runSpeedList, setRunSpeedList] = useState([
    `4'00" km/h`,
    `4'30" km/h`,
    `5'00" km/h`,
    `5'30" km/h`,
    `6'00" km/h`,
    `6'30" km/h`,
  ]);

  const [title, setTitle] = useState(props.title);
  const [standbyTime, setStandbyTime] = useState(props.standbyTime);
  const [startTime, setStartTime] = useState(props.startTime);
  const [finishTime, setFinishTime] = useState(props.finishTime);
  const [maxPeople, setMaxPeople] = useState(props.maxPeople);
  const [date, setDate] = useState(props.date);
  const [parking, setParking] = useState(props.parking);
  const [baggage, setBaggage] = useState(props.baggage);
  const [content, setContent] = useState(props.content);
  const [checkedType, setCheckedType] = useState(props.thema);
  const [checkedSpeed, setCheckedSpeed] = useState(props.speed);

  console.log(standbyTime, startTime, checkedType);

  const contents = [
    {
      title: title,
      standbyTime: standbyTime,
      startTime: startTime,
      finishTime: finishTime,
      maxPeople: maxPeople,
      date: date,
      speed: checkedSpeed,
      parking: parking,
      baggage: baggage,
      content: content,
      theme: checkedType,
    },
  ];

  const choiceRunType = (e) => {
    setCheckedType(e);
  };

  const choiceSpeed = (e) => {
    setCheckedSpeed(e);
  };

  useEffect(() => {
    console.log("실행");
    setTitle(props.title);
    setStandbyTime(props.standbyTime);
    setStartTime(props.startTime);
    setFinishTime(props.finishTime);
    setMaxPeople(props.maxPeople);
    setDate(props.date);
    setParking(props.parking);
    setBaggage(props.baggage);
    setContent(props.content);
    setCheckedType(props.thema);
    setCheckedSpeed(props.speed);
  }, [props]);

  const goNext2 = () => {
    props.setIsLoad1(true);
    props.setIsLoad2(true);
    dispatch(editGroupContent(contents));
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <Grid margin="80px 0 0 280px" maxWidth="1032px" width="100%">
        <Grid margin="30px auto" padding="5px">
          <Grid>
            <Text bold size="20px">
              그룹러닝 수정하기
            </Text>
          </Grid>
          <Grid>
            <Text display="inline" bold size="15px">
              Step 1. 그룹러닝 정보 수정
            </Text>
            <Text display="inline" margin="0 10px" size="13px">
              그룹 러닝에 관한 상세 정보들을 수정해주세요.
            </Text>
          </Grid>
        </Grid>

        <Grid display="flex" flexDirection="column">
          <Grid display="flex">
            <Grid maxWidth="1024px" width="100%" margin="0 10px 0  0">
              <Text bold size="15px">
                그룹러닝이름
              </Text>
              <Input
                type="text"
                _onChange={(e) => {
                  setTitle(e.target.value);
                }}
                groupPost
                value={title || ""}
              ></Input>
            </Grid>
          </Grid>

          <Grid display="flex" flexDirection="column">
            <Grid display="flex">
              <Grid maxWidth="160px" width="100%" margin="0 60px 0 0">
                <Text bold size="15px">
                  러닝 날짜
                </Text>
                <Input
                  _onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  type="date"
                  value={date || ""}
                  groupPost
                ></Input>
              </Grid>

              <Grid maxWidth="160px" width="100%">
                <Text bold size="15px">
                  스탠바이
                </Text>
                <Input
                  _onChange={(e) => {
                    setStandbyTime(e.target.value);
                  }}
                  type="time"
                  value={standbyTime || ""}
                  groupPost
                ></Input>
              </Grid>
            </Grid>

            <Text color="red">
              스탠바이로 지정한 시간의 4시간 전, 그룹러닝 모집이 마감됩니다.
            </Text>
          </Grid>

          <Grid display="flex">
            <Grid maxWidth="160px" width="100%" margin="0 60px 0  0">
              <Text bold size="15px">
                출발시간
              </Text>
              <Input
                _onChange={(e) => {
                  setStartTime(e.target.value);
                }}
                type="time"
                value={startTime || ""}
                groupPost
              ></Input>
            </Grid>

            <Grid maxWidth="160px" width="100%">
              <Text bold size="15px">
                종료시간(예상)
              </Text>
              <Input
                _onChange={(e) => {
                  setFinishTime(e.target.value);
                }}
                type="time"
                value={finishTime || ""}
                groupPost
              ></Input>
            </Grid>
          </Grid>

          <Grid maxWidth="160px" width="100%">
            <Text bold size="15px">
              모집인원
            </Text>
            <GroupSelect
              onChange={(e) => {
                setMaxPeople(e.target.value);
              }}
              value={maxPeople || ""}
            >
              <option value="null">인원 선택</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5명</option>
              <option value="6">6명</option>
              <option value="7">7명</option>
              <option value="8">8명</option>
              <option value="9">9명</option>
              <option value="10">10명</option>
            </GroupSelect>
          </Grid>

          <Grid>
            <Text bold size="15px">
              러닝타입
            </Text>
            <Grid display="flex">
              {runTypeList.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <Label>
                      <input
                        onChange={() => {
                          console.log(e);
                          choiceRunType(e);
                        }}
                        type="radio"
                        name="runType"
                        value={e}
                        checked={checkedType === e ? e : ""}
                      ></input>
                      <Text bold>{e}</Text>
                    </Label>
                  </Fragment>
                );
              })}
            </Grid>
            <Text color="red">
              이미지 미첨부 시, 선태한 러닝타입에 따라 기본 썸네일이 결정됩니다.
            </Text>
          </Grid>

          <Grid>
            <Text bold size="15px">
              페이스
            </Text>
            <Grid display="flex">
              {runSpeedList.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <Label>
                      <input
                        onChange={() => {
                          choiceSpeed(e);
                        }}
                        type="radio"
                        name="speed"
                        value={e}
                        checked={checkedSpeed === e ? e : ""}
                      ></input>
                      <Text bold>{e}</Text>
                    </Label>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>

          <Grid maxWidth="1024px" width="100%">
            <Text bold size="15px">
              주차방법(선택)
            </Text>
            <Input
              groupPost
              _onChange={(e) => {
                setParking(e.target.value);
              }}
              placeholder="예: 자라 IFC몰 주차장"
              value={parking || ""}
            ></Input>
          </Grid>

          <Grid maxWidth="1024px" width="100%">
            <Text bold size="15px">
              짐보관방법(선택)
            </Text>
            <Input
              groupPost
              _onChange={(e) => {
                setBaggage(e.target.value);
              }}
              value={baggage || ""}
            ></Input>
          </Grid>

          <Grid maxWidth="1024px" width="100%">
            <Text bold size="15px">
              그럽러닝에 대한 상세설명
            </Text>
            <Input
              _onChange={(e) => {
                setContent(e.target.value);
              }}
              multiLine
              value={content || ""}
            ></Input>
          </Grid>
        </Grid>
        <StepBtn onClick={goNext2}>다음단계</StepBtn>
      </Grid>
    </>
  );
};

const GroupSelect = styled.select`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  border: 1px solid #4e4e4e;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  text-align: center;
  outline: none;
`;

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 0 10px 0 0;
    width: 120px;
    height: 40px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 5px;
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

const StepBtn = styled.button`
  width: 184px;
  height: 40px;
  background: #cecece;
  border: 1px solid #4e4e4e;
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  align-items: center;
  color: #000000;
  margin: 10px;
`;
export default EditContent;
