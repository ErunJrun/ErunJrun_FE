import React, { useState, useEffect, Fragment } from "react";
import { Grid, Text, Input } from "../../elements";
import styled from "styled-components";

const GroupContent = (props) => {
  const [title, setTitle] = useState("");
  const [standbyTime, setStandbyTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [date, setDate] = useState("");
  const [parking, setParking] = useState("");
  const [baggage, setBaggage] = useState("");
  const [content, setContent] = useState("");
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

  const [checkedType, setCheckedType] = useState("");
  const [checkedSpeed, setCheckedSpeed] = useState("");

  const choiceRunType = (e) => {
    setCheckedType(e);
  };

  const choiceSpeed = (e) => {
    setCheckedSpeed(e);
  };

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

  useEffect(() => {
    props.setContents(contents);
  }, [
    title,
    standbyTime,
    startTime,
    finishTime,
    maxPeople,
    date,
    checkedSpeed,
    parking,
    baggage,
    content,
    checkedType,
  ]);

  return (
    <>
      <Grid margin="80px 0 0 280px" maxWidth="1032px" width="100%">
        <Grid margin="30px auto" padding="5px">
          <Grid>
            <Text bold size="20px">
              그룹러닝 등록하기
            </Text>
          </Grid>
          <Grid>
            <Text display="inline" bold size="15px">
              Step 3. 그룹러닝 정보 입력
            </Text>
            <Text display="inline" margin="0 10px" size="13px">
              그룹 러닝에 관한 상세 정보들을 입력해주세요.
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
                placeholder="예: 봄바람 불 때 한강 달리기!"
                groupPost
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
                  // defaultValue={new Date().toISOString().slice(0, 10)}
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
                  // defaultValue={new Date().toISOString().slice(11, 16)}
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
                // defaultValue={new Date().toISOString().slice(11, 16)}
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
                // defaultValue={new Date().toISOString().slice(11, 16)}
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
                    <Label checked={checkedType}>
                      <input
                        onClick={() => {
                          choiceRunType(e);
                        }}
                        type="radio"
                        name="runType"
                        value={e}
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

          <Grid maxWidth="160px" width="100%">
            <Grid>
              <Text bold size="15px">
                페이스
              </Text>
              <Grid display="flex">
                {runSpeedList.map((e, idx) => {
                  return (
                    <Fragment key={idx}>
                      <Label checked={checkedType}>
                        <input
                          onClick={() => {
                            choiceSpeed(e);
                          }}
                          type="radio"
                          name="speed"
                          value={e}
                        ></input>
                        <Text bold>{e}</Text>
                      </Label>
                    </Fragment>
                  );
                })}
              </Grid>
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
              placeholder="예: 지하철 짐 보관함"
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
              placeholder="예 : 호수공원 러닝 참 좋아하는데요~ 함께 뛰면 두배로 즐거울 것 같아 그룹 러닝을 모집합니다!"
            ></Input>
          </Grid>
        </Grid>
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

export default GroupContent;
