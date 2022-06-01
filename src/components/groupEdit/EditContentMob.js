import React, { useState, useEffect, Fragment } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { editGroupContent } from "../../redux/modules/feed";

//css, library, package
import styled from "styled-components";
import dayjs from "dayjs";
import swal from "sweetalert";
import { Link } from "react-scroll";

//Image
import editStep1 from "../../assets/groupUpload/editStep1Mob.svg";
import backBtn from "../../assets/groupFeed/backBtn.svg";
import groupRightBtnWhite from "../../assets/groupUpload/groupRightBtnWhite.svg";

//elements
import { Grid, Text, Input, IconButton } from "../../elements";

const EditContentMob = (props) => {
  const dispatch = useDispatch();

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

  const datePick = (e) => {
    if (
      dayjs(e.target.value).format("YYYYMMDD") <=
      dayjs(new Date()).format("YYYYMMDD")
    ) {
      swal("오늘 날짜 이후부터 선택이 가능합니다.");
      setDate("");
    }
  };

  const choiceRunType = (e) => {
    setCheckedType(e);
  };

  const choiceSpeed = (e) => {
    setCheckedSpeed(e);
  };

  useEffect(() => {
    setTitle(props.title);
    setStandbyTime(props.standbyTime);

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
      <div id="step1Mob"></div>
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
        padding="10px 0"
        margin="0 auto"
      >
        <Grid
          display="flex"
          width="375px"
          justifyContent="left"
          alignItems="center"
        >
          <img
            style={{ width: "10px", margin: "0 10px" }}
            src={backBtn}
            onClick={() => {
              history.push("/groupfeed");
            }}
          />
          <Text margin="0 0 0 110px" bold>
            그룹 러닝 작성
          </Text>
        </Grid>
      </Grid>

      <Grid
        zIndex="3"
        bg="#f0f0f0"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        top="54px"
        left="0"
        width="100%"
        height="70px"
        display="flex"
        padding="10px"
        margin="0 auto"
      >
        <img style={{ width: "247px", margin: "0" }} src={editStep1} />
      </Grid>

      <Grid margin="156px auto 152px auto" width="375px">
        <Grid width="343px" display="flex" margin="0 auto" alignItems="center">
          <Grid display="flex">
            <Text margin="0" height="auto" display="inline" bold size="13px">
              그룹 러닝 기본 정보
            </Text>
            <RedPoint />
          </Grid>
        </Grid>
        <Hr />
        <Grid margin="0 auto" width="343px">
          <Grid display="flex" flexDirection="column">
            <Grid display="flex" alignItems="center" margin="0">
              <Text size="13px" display="inline" margin="0 73px 16px 0">
                그룹 러닝명
              </Text>
              <Grid
                margin="0 0 32px 0"
                display="flex"
                alignItems="center"
                padding="5px 16px"
                width="343px"
                height="44px"
                border="1px solid #B8B8B8"
                borderRadius="3px"
                hover="border:1px solid #68F99E;"
              >
                <GroupInput
                  style={{ width: "90%" }}
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    checkMaxLength(e);
                  }}
                  value={title || ""}
                  placeholder="그룹 러닝명을 입력해주세요."
                ></GroupInput>
                <Text margin="0" size="11px" color="#7B7B7B">
                  {textLength}/28
                </Text>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text size="13px" display="inline" margin="0 0 16px 0">
                러닝 일시
              </Text>
              <Grid width="343px" display="flex" justifyContent="space-between">
                <Grid
                  display="flex"
                  alignItems="center"
                  padding="10px 20px"
                  width="171.5px"
                  height="44px"
                  border="1px solid #CBCBCB"
                  borderRight="hidden"
                  borderRadius="3px 0 0 3px"
                  hover="border:1px solid #68F99E;"
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
                  width="171.5px"
                  height="44px"
                  border="1px solid #CBCBCB"
                  borderRadius="0 3px 3px 0"
                  hover="border:1px solid #68F99E;"
                  margin="0"
                >
                  <GroupInput
                    type="time"
                    onChange={(e) => {
                      setStandbyTime(e.target.value);
                    }}
                    value={standbyTime}
                  ></GroupInput>
                </Grid>
              </Grid>

              <Grid
                display="flex"
                justifyContent="left"
                margin="10px 0 0 0"
                width="auto"
              >
                <IconButton
                  waring
                  color="#FF2D55"
                  size="14.4"
                  height="12px"
                  width="12px"
                  margin="-2px 6px 0 0"
                />
                <Text margin="0" size="11px" width="auto" color="#FF2D55" bold>
                  스탠바이로 지정한 시간의 4시간 전, 그룹러닝 모집이 마감됩니다.
                </Text>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text size="13px" display="inline" margin="0 73px 16px 0">
                모집 인원
              </Text>
              <Grid
                margin="0"
                display="flex"
                alignItems="center"
                padding="5px 16px"
                width="343px"
                height="44px"
                border="1px solid #B8B8B8"
                borderRadius="3px"
                hover="border:1px solid #68F99E;"
              >
                <GroupSelect
                  onChange={(e) => {
                    setMaxPeople(e.target.value);
                  }}
                  value={maxPeople}
                >
                  <option style={{ color: "#818181" }} value="null">
                    모집 인원을 입력해주세요.(최대 20명)
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
                  <option value="20">20명</option>
                </GroupSelect>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text size="13px" display="inline" margin="0 73px 16px 0">
                상세 소개
              </Text>
              <Grid
                margin="0"
                display="flex"
                alignItems="center"
                padding="14px"
                width="343px"
                height="136px"
                border="1px solid #B8B8B8"
                borderRadius="3px"
                hover="border:1px solid #68F99E;"
              >
                <GroupTextArea
                  type="text"
                  onChange={(e) => {
                    setContent(e.target.value);
                    checkMaxLength600(e);
                  }}
                  value={content}
                  placeholder="600자 이내로 그룹 러닝에 대한 소개를 작성해주세요.      예시) 환복하실 분들은 공원 화장실을 이용해주세요!"
                ></GroupTextArea>
                <Grid
                  height="auto"
                  display="flex"
                  justifyContent="right"
                  margin="0"
                >
                  <Text color="#7B7B7B" size="11px" margin="0">
                    {textLength600} / 600
                  </Text>
                </Grid>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0 0 80px 0">
              <Text size="13px" display="inline" margin="0 73px 16px 0">
                그룹 채팅방 링크
              </Text>
              <Grid
                margin="0 0 32px 0"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="5px 16px"
                width="343px"
                height="44px"
                border="1px solid #B8B8B8"
                borderRadius="3px"
                hover="border:1px solid #68F99E;"
              >
                <GroupInput
                  style={{ width: "90%" }}
                  type="url"
                  onChange={(e) => {
                    setChattingRoom(e.target.value);
                    checkMaxLengthChat(e);
                  }}
                  value={chattingRoom}
                  placeholder="크루원들과 소통할 오픈채팅방 링크를 추가해주세요."
                ></GroupInput>
                <Text color="#7B7B7B" size="11px" margin="0">
                  {textLengthChat}/40
                </Text>
              </Grid>
            </Grid>

            <Grid
              width="343px"
              display="flex"
              margin="0 auto"
              alignItems="center"
            >
              <Grid display="flex">
                <Text
                  margin="0"
                  height="auto"
                  display="inline"
                  bold
                  size="13px"
                >
                  러닝 스타일 정보
                </Text>
                <RedPoint />
              </Grid>
            </Grid>
            <Hr />

            <Text size="13px" margin="0 0 16px 0">
              러닝 테마
            </Text>
            <Grid
              margin="0"
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
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
                        value={e}
                        checked={checkedType === e ? e : ""}
                      ></input>
                      <Text regular size="12px">
                        {e}
                      </Text>
                    </Label>
                  </Fragment>
                );
              })}
            </Grid>
            <Grid
              display="flex"
              justifyContent="left"
              margin="6px 0 0 0"
              width="auto"
            >
              <IconButton
                waring
                color="#FF2D55"
                size="14.4"
                height="12px"
                width="12px"
                margin="-2px 6px 0 0"
              />
              <Text margin="0" size="11px" width="auto" color="#FF2D55" bold>
                이미지를 추가하지 않는 경우, 러닝타입에 따른 기본 썸네일이
                사용됩니다.
              </Text>
            </Grid>

            <Text size="13px" margin="32px 0 16px 0">
              러닝 속도
            </Text>
            <Grid
              margin="0"
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
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
                      <Text regular size="12px">
                        {e}
                      </Text>
                    </Label>
                  </Fragment>
                );
              })}
            </Grid>
            <Grid
              width="343px"
              display="flex"
              margin="80px auto 0 auto"
              alignItems="center"
            >
              <Text margin="0" height="auto" display="inline" bold size="13px">
                추가 정보
              </Text>
            </Grid>
            <Hr />

            <Grid display="flex" alignItems="center" margin="0 0 32px 0">
              <Text size="13px" margin="0 0 16px 0">
                주차 방법
              </Text>
              <Grid
                margin="0"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="5px 16px"
                width="343px"
                height="44px"
                border="1px solid #B8B8B8"
                borderRadius="3px"
                hover="border:1px solid #68F99E;"
              >
                <GroupInput
                  style={{ width: "90%" }}
                  type="text"
                  onChange={(e) => {
                    setParking(e.target.value);
                    checkMaxLengthPark(e);
                  }}
                  value={parking}
                  placeholder="주변 주차 정보가 있다면 추가해주세요."
                ></GroupInput>
                <Text margin="0" size="11px" color="#B8B8B8">
                  {textLengthPark}/40
                </Text>
              </Grid>
            </Grid>

            <Grid display="flex" alignItems="center" margin="0">
              <Text size="13px" margin="0 0 16px 0">
                짐보관 방법
              </Text>
              <Grid
                margin="0"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="5px 16px"
                width="343px"
                height="44px"
                border="1px solid #B8B8B8"
                borderRadius="3px"
                hover="border:1px solid #68F99E;"
              >
                <GroupInput
                  style={{ width: "90%" }}
                  type="text"
                  onChange={(e) => {
                    setBaggage(e.target.value);
                    checkMaxLengthBag(e);
                  }}
                  value={baggage}
                  placeholder="예시) 개별 보관"
                ></GroupInput>
                <Text margin="0" size="11px" color="#B8B8B8">
                  {textLengthBag}/40
                </Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid width="343px" margin="0 auto">
          <Link to="step1Mob" spy={true}>
            <Step2NextBtn onClick={goNext2}>
              다음단계
              <img
                style={{ width: "5px", height: "13px", marginLeft: "10px" }}
                src={groupRightBtnWhite}
              ></img>
            </Step2NextBtn>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

const Hr = styled.hr`
  width: 343px;
  height: 1px;
  margin: 11.5px auto 23.5px auto;
  background-color: #000;
`;

const RedPoint = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background: #ff2d55;
`;

const GroupInput = styled.input`
  box-sizing: border-box;
  font-family: "Spoqa Han Sans Neo";
  font-size: 13px;
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  border: none;
  border-radius: 3px;

  :focus {
    outline: none;
  }
  ::placeholder {
    font-family: "Spoqa Han Sans Neo";
    font-size: 13px;
    font-weight: 400;
    color: #7b7b7b;
  }
`;

const GroupTextArea = styled.textarea`
  font-family: "Spoqa Han Sans Neo";
  font-weight: 400;
  font-size: 13px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 96%;
  border: none;
  resize: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-family: "Spoqa Han Sans Neo";
    font-size: 13px;
    font-weight: 400;
    color: #818181;
  }
`;

const GroupSelect = styled.select`
  box-sizing: border-box;
  font-family: "Spoqa Han Sans Neo";
  font-size: 13px;
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  border: none;
  border-radius: 3px;
  color: #7b7b7b;
`;

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 0 0 10px 0;
    width: 109px;
    height: 35px;
    flex-grow: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 60px;
    border: 1px solid #7b7b7b;
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

const Step2NextBtn = styled.button`
  font-family: "Spoqa Han Sans Neo";
  margin: 96px 0 152px auto;
  width: 167px;
  height: 44px;
  border: 1px solid #030c37;
  border-radius: 3px;
  font-weight: 500;
  font-size: 14px;
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #030c37;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #030c37;
  }
`;

export default EditContentMob;
