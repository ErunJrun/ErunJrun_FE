import React, { useEffect, useState } from "react";
import ImagesUpload from "../components/groupUpload/ImagesUpload";
import KakaoMap from "../components/groupUpload/KakaoMap";
import GroupUpContentMob from "../components/groupUpload/GroupUpContentMob";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addGroupDB } from "../redux/modules/feed";
import { history } from "../redux/configureStore";
import { Grid, IconButton, Text } from "../elements";
import { imgActions } from "../redux/modules/image";
import step1Mob from "../assets/groupUpload/step1Mob.svg";
import step2Mob from "../assets/groupUpload/step2Mob.svg";
import step3Mob from "../assets/groupUpload/step3Mob.svg";
import backBtn from "../assets/groupFeed/backBtn.svg";
import groupRightBtn from "../assets/groupUpload/groupRightBtn.png";
import groupLeftBtn from "../assets/groupUpload/groupLeftBtn.png";
import { Link } from "react-scroll";
import { resetMap } from "../redux/modules/uploadInfo";
import swal from "sweetalert";
import KakaoMapMob from "../components/groupUpload/KakaoMapMob";
import groupLeftBtnBlack from "../assets/groupUpload/groupLeftBtnBlack.svg";
import groupRightBtnWhite from "../assets/groupUpload/groupRightBtnWhite.svg";
import { getCookie } from "../shared/Cookie";
import imageCompression from "browser-image-compression";

const GroupUploadMob = () => {
  const dispatch = useDispatch();

  const [isLoaded1, setIsLoad1] = useState(false);
  const [isLoaded2, setIsLoad2] = useState(false);
  const [isLoaded3, setIsLoad3] = useState(false);

  const [repeatCnt, setRepeatCnt] = useState(1);

  const location = useSelector((state) => state.uploadInfo.paths);
  const distance = useSelector((state) => state.uploadInfo.distance);
  const finalDistance = (distance * repeatCnt).toFixed(2);
  const contents = useSelector((state) => state.uploadInfo.contents);
  const thumbnail = useSelector((state) => state.image.files);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [address, setAddress] = useState("");

  const lat = location[0]?.lat;
  const lng = location[0]?.lng;

  //위도 경도로 주소 추출
  useEffect(() => {
    let geocoder = new window.kakao.maps.services.Geocoder();

    let coord = new window.kakao.maps.LatLng(lat, lng);
    let callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, [lat]);

  const goNext2 = () => {
    if (location.length == 0) {
      swal("경로를 입력해주세요");
    } else {
      setIsLoad1(true);
      setIsLoad2(true);
    }
  };

  const goBack1 = () => {
    setIsLoad1(false);
    setIsLoad2(false);
  };

  const checkNumber = (e) => {
    const regex = /^[0-9]{0,2}$/;
    if (regex.test(e.target.value)) {
      setRepeatCnt(e.target.value);
    }
  };

  const goNext3 = () => {
    if (contents.title === "") {
      return swal("제목을 입력해주세요");
    }

    if (contents.title.length < 3) {
      return swal("제목은 최소 3글자입니다.");
    }
    if (contents.standbyTime === "") {
      return swal("러닝 일시를 입력해주세요");
    }

    if (contents.maxPeople === "") {
      return swal("모집인원을 입력해주세요");
    }
    if (contents.date === "") {
      return swal("러닝 날짜를 입력해주세요");
    }
    if (contents.speed === "") {
      return swal("페이스를 선택해주세요");
    }
    if (contents.content === "") {
      return swal("상세설명을 입력해주세요");
    }
    if (contents.theme === "") {
      return swal("러닝타입을 선택해주세요");
    }

    if (contents.chattingRoom.length >= 1) {
      if (!contents.chattingRoom.includes("open.kakao.com")) {
        return swal("올바른 카카오톡 오픈 채팅방 링크를 입력해주세요");
      }
    }
    setIsLoad2(false);
    setIsLoad3(true);
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const goBack2 = () => {
    setIsLoad2(true);
    setIsLoad3(false);
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const addGroupPost = async () => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (thumbnail.length === 0) {
      return;
    }

    if (thumbnail.length === 1) {
      try {
        const compressedFile1 = [await imageCompression(thumbnail[0], options)];

        console.log(compressedFile1);
        dispatch(
          addGroupDB(location, compressedFile1, contents, address, distance)
        );
        dispatch(imgActions.resetFile());
      } catch (error) {
        console.log(error);
      }
    }

    if (thumbnail.length === 2) {
      try {
        const compressedFile1 = await imageCompression(thumbnail[0], options);
        const compressedFile2 = await imageCompression(thumbnail[1], options);
        console.log(compressedFile1, compressedFile2);
        let resizeImage = [];

        resizeImage.push(compressedFile1, compressedFile2);

        dispatch(
          addGroupDB(location, resizeImage, contents, address, distance)
        );
        dispatch(imgActions.resetFile());
      } catch (error) {
        console.log(error);
      }
    }

    if (thumbnail.length === 3) {
      try {
        const compressedFile1 = await imageCompression(thumbnail[0], options);
        const compressedFile2 = await imageCompression(thumbnail[1], options);
        const compressedFile3 = await imageCompression(thumbnail[2], options);
        let resizeImage = [];

        resizeImage.push(compressedFile1, compressedFile2, compressedFile3);

        dispatch(
          addGroupDB(location, resizeImage, contents, address, finalDistance)
        );
        dispatch(imgActions.resetFile());
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    dispatch(resetMap());
  }, []);

  const token = getCookie("accessToken");

  useEffect(() => {
    if (!token) {
      swal("비정상적인 접근입니다.");
      history.push("/");
    }
  }, []);

  if (!isLoaded1) {
    return (
      <>
        <div id="step1"></div>
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
          <img style={{ width: "311px", margin: "0" }} src={step1Mob} />
        </Grid>

        <Grid
          position="relative"
          margin="0 auto"
          width="375px"
          display="flex"
          justifyContent="space-between"
        >
          <Grid margin="156px auto 0 auto" width="375px">
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
                  러닝 코스
                </Text>
                <RedPoint />
              </Grid>
            </Grid>
            <Hr />

            <KakaoMapMob />

            <Grid width="343px" margin="0 auto" display="flex">
              <Grid
                margin="0 auto"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text size="13px" margin="0 0 16px 0">
                  코스 위치 정보
                </Text>
                <Grid margin="0 auto" display="flex" width="343px">
                  <LocationInfo>
                    {address ? (
                      <Text margin="0" size="13px">
                        {address}
                      </Text>
                    ) : (
                      <Text color="#818181" margin="0" size="13px">
                        지정하신 시작 위치가 자동으로 입력됩니다.
                      </Text>
                    )}
                  </LocationInfo>
                </Grid>
              </Grid>
              <Grid
                display="flex"
                justifyContent="left"
                margin="0 0 32px 0"
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
                  러닝 코스는 업로드 이후 수정이 불가능합니다. 해당 위치가
                  맞는지 다시 <br></br>한 번 확인해 주세요!
                </Text>
              </Grid>
            </Grid>

            <Grid width="343px" margin="0 auto" display="flex">
              <Grid
                margin="0 auto"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text size="13px" margin="0 0 16px 0">
                  최종 코스 거리
                </Text>
                <Grid display="flex">
                  <RepeatInfo>
                    <Text size="13px" regular color="#7B7B7B">
                      반복 횟수
                    </Text>
                    <RepeatInput
                      style={{ width: "50%" }}
                      type="text"
                      placeholder="반복 횟수(1~99회)"
                      value={repeatCnt || ""}
                      onChange={(e) => {
                        checkNumber(e);
                      }}
                      min="1"
                      max="99"
                    ></RepeatInput>
                  </RepeatInfo>
                  <DistanceInfo>
                    {distance !== "NaN" ? (
                      <>
                        <Text textalign width="100px" margin="0" size="13px">
                          {finalDistance}
                        </Text>
                        <Text margin="0" size="13px">
                          km
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text
                          textalign
                          width="300px"
                          margin="0"
                          size="13px"
                        ></Text>
                        <Text color="#818181" margin="0" size="13px">
                          km
                        </Text>
                      </>
                    )}
                  </DistanceInfo>
                </Grid>
              </Grid>
            </Grid>

            <Grid width="343px" margin="0 auto">
              <Link to="step1" spy={true}>
                <StepBtn onClick={goNext2}>
                  다음단계
                  <img
                    style={{ width: "8px", height: "auto", marginLeft: "16px" }}
                    src={groupRightBtn}
                  ></img>
                </StepBtn>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }

  if (isLoaded2) {
    return (
      <>
        <div id="step2"></div>
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
          <img style={{ width: "311px", margin: "0" }} src={step2Mob} />
        </Grid>

        <Grid margin="156px auto 0 auto" width="375px">
          <Grid
            width="343px"
            display="flex"
            margin="0 auto"
            alignItems="center"
          >
            <Grid display="flex">
              <Text margin="0" height="auto" display="inline" bold size="13px">
                그룹 러닝 기본 정보
              </Text>
              <RedPoint />
            </Grid>
          </Grid>
          <Hr />
          <Grid margin="0 auto" width="343px">
            <GroupUpContentMob />

            <Grid
              display="flex"
              margin="96px 0 152px 0"
              justifyContent="space-between"
            >
              <Link to="step2" spy={true}>
                <Step2BackBtn onClick={goBack1}>
                  <img
                    style={{
                      width: "5px",
                      height: "10px",
                      marginRight: "10px",
                    }}
                    src={groupLeftBtnBlack}
                  ></img>
                  이전단계
                </Step2BackBtn>
              </Link>
              <Link to="step2" spy={true}>
                <Step2NextBtn onClick={goNext3}>
                  다음단계
                  <img
                    style={{ width: "5px", height: "10px", marginLeft: "10px" }}
                    src={groupRightBtnWhite}
                  ></img>
                </Step2NextBtn>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }

  if (isLoaded3) {
    return (
      <>
        <div id="step3"></div>
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
          <img style={{ width: "311px", margin: "0" }} src={step3Mob} />
        </Grid>
        <Grid margin="156px auto 0 auto" width="375px">
          <Grid
            width="343px"
            display="flex"
            margin="0 auto"
            alignItems="center"
          >
            <Text margin="0" height="auto" display="inline" bold size="13px">
              추가 사진
            </Text>
          </Grid>
          <Hr />

          <Grid display="flex" width="343px" margin="0 auto">
            <Text margin="0 0 16px 0" size="13px">
              {`업로드 된 이미지 (${thumbnail.length}/3`})
            </Text>
          </Grid>
          <ImagesUpload isMobile={true}></ImagesUpload>

          <Grid
            display="flex"
            width="343px"
            justifyContent="space-between"
            margin="96px auto 152px auto"
          >
            <Link to="step3" spy={true}>
              <Step2BackBtn onClick={goBack2}>
                <img
                  style={{
                    width: "5px",
                    height: "10px",
                    marginRight: "10px",
                  }}
                  src={groupLeftBtnBlack}
                ></img>
                이전단계
              </Step2BackBtn>
            </Link>
            <Step2NextBtn
              onClick={() => {
                addGroupPost();
              }}
              style={{ color: "#68F99E" }}
            >
              완료하기
            </Step2NextBtn>
          </Grid>
        </Grid>
      </>
    );
  }
};

const LocationInfo = styled.div`
  width: 343px;
  height: 44px;
  box-sizing: border-box;
  border-radius: 3px;
  border: solid 1px #b8b8b8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 16px;
  margin: 0 0 8px 0;
`;

const DistanceInfo = styled.div`
  width: 171px;
  height: 44px;
  box-sizing: border-box;
  margin: 0;
  padding: 10px 14px;
  border-radius: 0 3px 3px 0;
  border: solid 1px #b8b8b8;
  border-left: none;
  display: flex;
  justify-content: space-between;
`;

const StepBtn = styled.button`
  font-family: "Spoqa Han Sans Neo";
  width: 167px;
  height: 44px;
  background: #030c37;
  border-radius: 3px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: normal;
  padding: 10px 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 96px 0 110px auto;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #030c37;
  }
`;

const Step2BackBtn = styled.button`
  font-family: "Spoqa Han Sans Neo";
  width: 167px;
  height: 44px;
  border: 1px solid #030c37;
  border-radius: 3px;
  font-weight: 500;
  font-size: 14px;
  padding: 10px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #030c37;
  }
`;

const Step2NextBtn = styled.button`
  font-family: "Spoqa Han Sans Neo";
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

const Hr = styled.hr`
  width: 343px;
  height: 0px;
  margin: 11.5px 16px 23.5px;
  border-top: 1px solid #000000;
`;

const RedPoint = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background: #ff2d55;
`;

const RepeatInfo = styled.div`
  width: 171px;
  height: 44px;
  box-sizing: border-box;
  border: 1px solid #b8b8b8;
  border-radius: 3px 0 0 3px;
  display: flex;
  align-items: center;
  padding: 10px 14px;
  justify-content: space-between;
  margin: 0;
`;

const RepeatInput = styled.input`
  width: 70%;
  height: 100%;
  text-align: center;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 13px;
  font-family: "Spoqa Han Sans Neo";
  ::placeholder {
    font-weight: 500;
    font-size: 13px;
    font-family: "Spoqa Han Sans Neo";
    color: #818181;
  }
`;

export default GroupUploadMob;
