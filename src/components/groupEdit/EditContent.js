import { useSelect } from "@mui/base";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text, IconButton } from "../../elements";
import { editGroupContent } from "../../redux/modules/feed";
import editStep1 from "../../assets/groupUpload/editStep1.png";
import groupRightBtn from "../../assets/groupUpload/groupRightBtn.png";
import dayjs from "dayjs";

import swal from "sweetalert";

const EditContent = (props) => {
  const dispatch = useDispatch();

  //글자 수 제한
  const [textLength, setTextLength] = useState(props?.title?.length);
  const [textLength600, setTextLength600] = useState(props?.content?.length);
  const [textLengthPark, setTextLengthPark] = useState(props?.parking?.length);
  const [textLengthBag, setTextLengthBag] = useState(props?.baggage?.length);
  const [textLengthChat, setTextLengthChat] = useState(
    props?.chattingRoom?.length
  );
  const checkMaxLength = (e) => {
    let wordLength = e.target.value.length;

    if (wordLength >= 28) {
      swal("28자 이상 작성할 수 없습니다.");
      return;
    }
    setTextLength(wordLength);
  };

  const checkMaxLength600 = (e) => {
    let wordLength = e.target.value.length;

    if (wordLength >= 600) {
      swal("600자 이상 작성할 수 없습니다.");
      return;
    }
    setTextLength600(wordLength);
  };

  const checkMaxLengthPark = (e) => {
    let wordLength = e.target.value.length;

    if (wordLength >= 40) {
      swal("40자 이상 작성할 수 없습니다.");
      return;
    }
    setTextLengthPark(wordLength);
  };

  const checkMaxLengthBag = (e) => {
    let wordLength = e.target.value.length;

    if (wordLength >= 40) {
      swal("40자 이상 작성할 수 없습니다.");
      return;
    }
    setTextLengthBag(wordLength);
  };

  const checkMaxLengthChat = (e) => {
    let wordLength = e.target.value.length;

    if (wordLength >= 40) {
      swal("40자 이상 작성할 수 없습니다.");
      return;
    }
    setTextLengthChat(wordLength);
  };

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

  const datePick = (e) => {
    if (
      dayjs(e.target.value).format("YYYYMMDD") <=
      dayjs(new Date()).format("YYYYMMDD")
    ) {
      swal("오늘 날짜 이후부터 선택이 가능합니다.");
      setDate("");
    }
  };

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
  const [chattingRoom, setChattingRoom] = useState(props.chattingRoom);

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
      chattingRoom: chattingRoom,
    },
  ];

  const choiceRunType = (e) => {
    setCheckedType(e);
  };

  const choiceSpeed = (e) => {
    setCheckedSpeed(e);
  };

  useEffect(() => {
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
    setChattingRoom(props.chattingRoom);
  }, [props]);

  const goNext2 = () => {
    props.setIsLoad1(true);
    props.setIsLoad2(true);
    dispatch(editGroupContent(contents));
  };

  return (
    <>
      <Grid
        position="relative"
        margin="80px auto 0 auto"
        width="1200px"
        display="flex"
        justifyContent="space-between"
      >
        <Grid margin="0 auto" width="865px">
          <Grid display="flex" margin="0 0 18px 0" alignItems="center">
            <Grid display="flex" width="auto">
              <Text margin="0" height="auto" display="inline" bold size="20px">
                그룹 러닝 기본 정보
              </Text>
              <RedPoint></RedPoint>
            </Grid>
          </Grid>
          <Hr />

          <Grid display="flex" flexDirection="column">
            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text display="inline" bold size="15px" margin="0 73px 0 0">
                그룹 러닝명
              </Text>
              <Grid
                display="flex"
                alignItems="center"
                padding="10px 20px"
                maxWidth="714px"
                height="75px"
                border="1px solid #CBCBCB"
                borderRadius="3px"
                hover="border:1px solid #030C37;"
              >
                <GroupInput
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    checkMaxLength(e);
                  }}
                  placeholder="그룹 러닝명을 입력해주세요."
                  value={title || ""}
                ></GroupInput>
                <Text margin="0" size="14px">
                  {textLength}/28
                </Text>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text display="inline" bold size="15px" margin="0 85px 0 0">
                러닝 일시
              </Text>
              <Grid
                maxWidth="714px"
                display="flex"
                justifyContent="space-between"
              >
                <Grid
                  display="flex"
                  alignItems="center"
                  padding="10px 20px"
                  maxWidth="347px"
                  height="75px"
                  border="1px solid #CBCBCB"
                  borderRadius="3px"
                  hover="border:1px solid #030C37;"
                  margin="0"
                >
                  <GroupInput
                    type="date"
                    onChange={(e) => {
                      setDate(e.target.value);
                      datePick(e);
                    }}
                    value={date || ""}
                  ></GroupInput>
                </Grid>

                <Grid
                  display="flex"
                  alignItems="center"
                  padding="10px 20px"
                  maxWidth="347px"
                  height="75px"
                  border="1px solid #CBCBCB"
                  borderRadius="3px"
                  hover="border:1px solid #030C37;"
                >
                  <GroupInput
                    type="time"
                    onChange={(e) => {
                      setStandbyTime(e.target.value);
                    }}
                    value={standbyTime || ""}
                  ></GroupInput>
                </Grid>
              </Grid>

              <Grid display="flex" alignItems="center" margin="12px 0 0 0">
                <IconButton
                  waring
                  color="#FF2D55"
                  size="19.21"
                  height="19.2px"
                  width="16px"
                  margin="0 8px 0 138px"
                />
                <Text width="auto" color="#FF2D55" bold margin="0">
                  스탠바이로 지정한 시간의 4시간 전, 그룹 러닝 모집이
                  마감됩니다.
                </Text>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text display="inline" bold size="15px" margin="0 85px 0 0">
                출발 시간
              </Text>
              <Grid
                display="flex"
                alignItems="center"
                padding="10px 20px"
                maxWidth="347px"
                height="75px"
                border="1px solid #CBCBCB"
                borderRadius="3px"
                hover="border:1px solid #030C37;"
                margin="0 11px 0 0"
              >
                <GroupInput
                  type="time"
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                  value={startTime || ""}
                ></GroupInput>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text display="inline" bold size="15px" margin="0 85px 0 0">
                도착 시간
              </Text>
              <Grid
                display="flex"
                alignItems="center"
                padding="10px 20px"
                maxWidth="347px"
                height="75px"
                border="1px solid #CBCBCB"
                borderRadius="3px"
                hover="border:1px solid #030C37;"
                margin="0 11px 0 0"
              >
                <GroupInput
                  type="time"
                  onChange={(e) => {
                    setFinishTime(e.target.value);
                  }}
                  value={finishTime || ""}
                ></GroupInput>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text display="inline" bold size="15px" margin="0 85px 0 0">
                모집 인원
              </Text>
              <Grid
                display="flex"
                alignItems="center"
                padding="10px 20px"
                maxWidth="714px"
                height="75px"
                border="1px solid #CBCBCB"
                borderRadius="3px"
                hover="border:1px solid #030C37;"
              >
                <GroupSelect
                  onChange={(e) => {
                    setMaxPeople(e.target.value);
                  }}
                  value={maxPeople || ""}
                >
                  <option style={{ color: "#818181" }} value="null">
                    모집 인원을 입력해주세요.(최대 10명)
                  </option>
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
            </Grid>

            <Grid display="flex" margin="0 0 32px 0">
              <Text display="inline" bold size="15px" margin="30px 85px 0 0">
                상세 소개
              </Text>
              <Grid
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="10px 20px"
                maxWidth="714px"
                height="462px"
                border="1px solid #CBCBCB"
                borderRadius="3px"
                hover="border:1px solid #030C37;"
                margin="0"
              >
                <GroupTextArea
                  type="text"
                  onChange={(e) => {
                    setContent(e.target.value);
                    checkMaxLength600(e);
                  }}
                  value={content || ""}
                  placeholder=" 600자 이내로 그룹 러닝에 대한 소개를 작성해주세요.
                ex) 호수공원 러닝 참 좋아하는데요~ 함께 뛰면 두배로 즐거울 것 같아 그룹 러닝을 모집합니다!"
                ></GroupTextArea>
                <Grid
                  height="auto"
                  display="flex"
                  justifyContent="right"
                  margin="0"
                >
                  <Text size="14px" margin="0">
                    {textLength600} / 600
                  </Text>
                </Grid>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0 0 64px 0">
              <Text display="inline" bold size="15px" margin="0 45px 0 0">
                그룹채팅방 링크
              </Text>
              <Grid
                display="flex"
                alignItems="center"
                padding="10px 20px"
                maxWidth="714px"
                height="75px"
                border="1px solid #CBCBCB"
                borderRadius="3px"
                hover="border:1px solid #030C37;"
              >
                <GroupInput
                  type="url"
                  onChange={(e) => {
                    setChattingRoom(e.target.value);
                    checkMaxLengthChat(e);
                  }}
                  value={chattingRoom || ""}
                  placeholder="크루원들과 소통할 오픈채팅방 링크를 추가해주세요."
                ></GroupInput>
                <Text margin="0" size="14px">
                  {textLengthChat}/40
                </Text>
              </Grid>
            </Grid>

            <MidHr />

            <Grid display="flex" margin="0 0 18px 0" alignItems="center">
              <Grid display="flex" width="auto">
                <Text
                  margin="0"
                  height="auto"
                  display="inline"
                  bold
                  size="20px"
                >
                  러닝 스타일 정보
                </Text>
                <RedPoint></RedPoint>
              </Grid>
            </Grid>
            <Hr />

            <Text bold>러닝타입</Text>
            <Grid display="flex" justifyContent="space-between">
              {runTypeList.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <Label>
                      <input
                        onChange={() => {
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
            <Grid display="flex" alignItems="center" margin="16px 0 32px 0">
              <IconButton
                waring
                color="#FF2D55"
                size="19.21"
                height="19.2px"
                width="16px"
                margin="0 8px 0 0"
              />
              <Text width="auto" color="#FF2D55" bold margin="0">
                이미지를 추가하지 않는 경우, 러닝타입에 따른 기본 썸네일이
                사용됩니다.
              </Text>
            </Grid>

            <Grid margin="0 0 64px 0">
              <Text bold>러닝속도</Text>
              <Grid display="flex" justifyContent="space-between">
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

            <MidHr />

            <Grid display="flex" margin="0 0 18px 0" alignItems="center">
              <Text margin="0" height="auto" display="inline" bold size="20px">
                추가 정보
              </Text>
            </Grid>
            <Hr />

            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text display="inline" bold size="15px" margin="0 86px 0 0">
                주차 방법
              </Text>
              <Grid
                display="flex"
                alignItems="center"
                padding="10px 20px"
                maxWidth="714px"
                height="75px"
                border="1px solid #CBCBCB"
                borderRadius="3px"
                hover="border:1px solid #030C37;"
              >
                <GroupInput
                  type="text"
                  onChange={(e) => {
                    setParking(e.target.value);
                    checkMaxLengthPark(e);
                  }}
                  value={parking || ""}
                  placeholder="주변 주차 정보가 있다면 추가해주세요."
                ></GroupInput>
                <Text margin="0" size="14px">
                  {textLengthPark}/40
                </Text>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text display="inline" bold size="15px" margin="0 73px 0 0">
                짐보관 방법
              </Text>
              <Grid
                display="flex"
                alignItems="center"
                padding="10px 20px"
                maxWidth="714px"
                height="75px"
                border="1px solid #CBCBCB"
                borderRadius="3px"
                hover="border:1px solid #030C37;"
              >
                <GroupInput
                  type="text"
                  onChange={(e) => {
                    setBaggage(e.target.value);
                    checkMaxLengthBag(e);
                  }}
                  value={baggage || ""}
                  placeholder="예 : 개별 보관"
                ></GroupInput>
                <Text margin="0" size="14px">
                  {textLengthBag}/40
                </Text>
              </Grid>
            </Grid>
          </Grid>

          <StepBtn onClick={goNext2}>
            다음단계
            <img
              style={{ width: "8px", height: "auto", marginLeft: "16px" }}
              src={groupRightBtn}
            ></img>
          </StepBtn>
        </Grid>
        <StepImg src={editStep1}></StepImg>
      </Grid>
    </>
  );
};

const StepImg = styled.img`
  position: sticky;
  width: 295px;
  height: 168px;
  margin: 0;
  top: 170px;
`;

const Hr = styled.hr`
  width: 865px;
  height: 0px;
  margin: 0 0 48px 0;
  border-top: 1px solid #000000;
  transform: rotate(180deg);
`;

const RedPoint = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: #ff2d55;
`;

const GroupInput = styled.input`
  font-size: 18px;
  box-sizing: border-box;
  margin: 0 20px 0 0;
  display: flex;
  align-items: center;
  width: 90%;
  height: 35px;
  border: none;
  border-radius: 3px;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-size: 16px;
    font-weight: 400;
    color: #818181;
  }
`;

const GroupTextArea = styled.textarea`
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 96%;
  border: none;
  border-radius: 3px;
  resize: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-size: 14px;
    font-weight: 400;
    color: #818181;
  }
`;

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
  border: none;
`;

const MidHr = styled.hr`
  width: 100%;
  height: 0px;
  background: #cbcbcb;
  border-top: 1px solid #cbcbcb;
  transform: rotate(180deg);
  margin-bottom: 106px;
`;

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 0;
    width: 132px;
    height: 44px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 60px;
    border: 1px solid #000;
    cursor: pointer;
    box-sizing: border-box;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #000;
  }
`;

const StepBtn = styled.button`
  max-width: 173px;
  width: 100%;
  height: 45px;
  background: #030c37;
  border-radius: 3px;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 160px 0 200px auto;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #030c37;
  }
`;
export default EditContent;
