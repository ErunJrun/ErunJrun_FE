import React, { useState, useEffect, Fragment } from "react";
import { Grid, Text, Input, IconButton } from "../../elements";
import styled from "styled-components";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addContents } from "../../redux/modules/uploadInfo";
import swal from "sweetalert";
import CalendarFilter from "../groupFeed/CalendarFilter";
import TimePickers from "../groupUpload/TimePickers";

const CourseUploadStep2 = (props) => {
  const dispatch = useDispatch();

  const contentsList = useSelector((state) => state.uploadInfo.contents);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resetState, setResetState] = useState(false);

  const [textLength, setTextLength] = useState(0);
  const [textLength600, setTextLength600] = useState(0);
  const [textLengthPark, setTextLengthPark] = useState(0);
  const [textLengthBag, setTextLengthBag] = useState(0);
  const [textLengthChat, setTextLengthChat] = useState(0);

  const [title, setTitle] = useState(contentsList.title);
  const [standbyTime, setStandbyTime] = useState(contentsList.standbyTime);
  const [startTime, setStartTime] = useState(contentsList.startTime);
  const [finishTime, setFinishTime] = useState(contentsList.finishTime);
  const [maxPeople, setMaxPeople] = useState(contentsList.maxPeople);
  const [date, setDate] = useState(contentsList.date);
  const [parking, setParking] = useState(contentsList.parking);
  const [baggage, setBaggage] = useState(contentsList.baggage);
  const [content, setContent] = useState(contentsList.content);
  const [chattingRoom, setChattingRoom] = useState(contentsList.chattingRoom);
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

  const [checkedType, setCheckedType] = useState(contentsList.theme);
  const [checkedSpeed, setCheckedSpeed] = useState(contentsList.speed);

  const runHour = Math.floor(props.distance / 10);
  const runMin = Math.floor(props.distance % 10) * 6;
  const totalTime = `${runHour}h ${runMin}min`;

  const datePick = (e) => {
    if (
      dayjs(e.target.value).format("YYYYMMDD") <
      dayjs(new Date()).format("YYYYMMDD")
    ) {
      swal("지난 날짜는 선택이 불가능합니다.");
      setDate("");
    }
  };

  //스탠바이 시간 선택
  const standbyTimePick = (e) => {
    if (
      dayjs(date).format("YYYYMMDD") === dayjs(new Date()).format("YYYYMMDD")
    ) {
      if (dayjs().add(6, "hour").format("HH:mm") < dayjs().format("HH:mm")) {
        swal("현재 시간부터 6시간 이후부터 등록이 가능합니다.");
        setStandbyTime("");
      }

      if (e.target.value < dayjs().add(6, "hour").format("HH:mm")) {
        swal("현재 시간부터 6시간 이후부터 등록이 가능합니다.");
        setStandbyTime("");
      }
    } else {
      if (e.target.value > dayjs().add(6, "hour").format("HH:mm")) {
        if (e.target.value < dayjs().add(30, "hour").format("HH:mm"))
          swal("현재 시간부터 6시간 이후부터 등록이 가능합니다.");
        setStandbyTime("");
      }
    }
  };

  //출발 시간 선택
  const startTimePick = (e) => {
    if (e.target.value < standbyTime) {
      swal("러닝 일시 시간보다 빠를 수 없습니다.");
      setStartTime("");
    }
  };

  //도착 시간 선택
  const finishTimePick = (e) => {
    if (e.target.value < startTime) {
      swal("출발 시간보다 빠를 수 없습니다.");
      setFinishTime("");
    }
  };

  //글자 수 제한
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

  const choiceRunType = (e) => {
    setCheckedType(e);
  };

  const choiceSpeed = (e) => {
    setCheckedSpeed(e);
  };

  const contents = {
    title: title,
    totalTime: totalTime,
    parking: parking,
    baggage: baggage,
    content: content,
    theme: checkedType,
  };

  useEffect(() => {
    // props.setContents(contents);
    dispatch(addContents(contents));
  }, [title, parking, baggage, content, checkedType]);

  return (
    <>
      <Grid margin="0 auto">
        <Grid display="flex" margin="0 0 18px 0" alignItems="center">
          <Grid display="flex" width="auto">
            <Text margin="0" height="auto" display="inline" bold size="20px">
              추천 코스 기본 정보
            </Text>
            <RedPoint></RedPoint>
          </Grid>
        </Grid>
        <Hr />

        <Grid display="flex" flexDirection="column">
          <Grid
            width="865px"
            justifyContent="space-between"
            display="flex"
            alignItems="center"
            margin="0 0 32px 0"
          >
            <Text display="inline" bold margin="0">
              추천 코스명
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
                value={title || ""}
                placeholder="그룹 러닝명을 입력해주세요."
              ></GroupInput>
              <Text margin="0" size="14px">
                {textLength}/28
              </Text>
            </Grid>
          </Grid>

          <Grid
            width="865px"
            justifyContent="space-between"
            display="flex"
            alignItems="center"
            margin="0 0 32px 0"
          >
            <Text display="inline" bold margin="0">
              소요 시간
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
                value={`${runHour}h ${runMin}min` || ""}
                placeholder="코스 거리에 따라 평균적(6’00’km/h 기준)으로 예상되는 시간"
                readOnly
              ></GroupInput>
            </Grid>

            <Grid display="flex" alignItems="center" margin="12px 0 0 15.7%">
              <IconButton
                waring
                color="#FF2D55"
                size="19.21"
                height="19.2px"
                width="16px"
                margin="0 8px 0 14px"
              />
              <Text width="auto" color="#FF2D55" bold margin="0">
                코스 거리에 따라 평균적(6’00’km/h 기준)으로 예상되는 시간으로,
                개인차가 있을 수 있습니다.
              </Text>
            </Grid>
          </Grid>

          <Grid display="flex" margin="0 0 64px 0">
            <Text display="inline" bold margin="30px 85px 0 0">
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

          <MidHr />

          <Grid display="flex" margin="0 0 18px 0" alignItems="center">
            <Grid display="flex" width="auto">
              <Text margin="0" height="auto" display="inline" bold size="20px">
                러닝 스타일 정보
              </Text>
              <RedPoint></RedPoint>
            </Grid>
          </Grid>
          <Hr />

          <Text margin="0" bold>
            러닝 테마
          </Text>
          <Grid
            margin="0 0 64px 0"
            display="flex"
            justifyContent="space-between"
          >
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
                      value={e || ""}
                      checked={checkedType === e ? e : ""}
                    ></input>
                    <Text bold>{e}</Text>
                  </Label>
                </Fragment>
              );
            })}
          </Grid>
          {/* <Grid display="flex" alignItems="center" margin="16px 0 32px 0">
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
          </Grid> */}

          <MidHr />

          <Grid display="flex" margin="0 0 18px 0" alignItems="center">
            <Text margin="0" height="auto" display="inline" bold size="20px">
              추가 정보
            </Text>
          </Grid>
          <Hr />

          <Grid display="flex" alignItems="center" margin="0 0 32px 0">
            <Text display="inline" bold margin="0 86px 0 0">
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
            <Text display="inline" bold margin="0 73px 0 0">
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
      </Grid>
    </>
  );
};

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
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;
  margin: 0 20px 0 0;
  display: flex;
  align-items: center;
  width: 90%;
  height: 35px;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-weight: 500;
  color: #818181;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 16px;
    font-weight: 500;
    color: #818181;
  }
`;

const GroupTextArea = styled.textarea`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 400;
  font-size: 16px;
  padding: 10px 0;
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
    font-size: 16px;
    font-weight: 400;
    color: #818181;
  }
`;

const GroupSelect = styled.select`
  font-family: "Spoqa Han Sans Neo";
  padding: 0;
  color: #818181;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  text-align: left;
  outline: none;
  border: none;
  option {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 500;
    font-size: 16px;
    color: #818181;
  }
`;

const MidHr = styled.hr`
  width: 100%;
  height: 0px;
  background: #cbcbcb;
  border-top: 1px solid #cbcbcb;
  transform: rotate(180deg);
  margin-bottom: 104px;
`;

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 20px 0 0 0;
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
    font-weight: 500;
  }
  input:checked + p {
    background-color: #68f99e;
    border: 1px solid #68f99e;
    color: #000;
    font-weight: 700;
  }
`;

const LabelTime = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 20px 0 0 0;
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
    font-weight: 500;
  }
`;

export default CourseUploadStep2;
