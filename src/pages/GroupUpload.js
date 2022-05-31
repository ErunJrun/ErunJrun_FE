import React, { useEffect, useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addGroupDB } from "../redux/modules/feed";
import { history } from "../redux/configureStore";
import { imgActions } from "../redux/modules/image";
import { resetMap } from "../redux/modules/uploadInfo";

//css, library, package
import { useMediaQuery } from "react-responsive";
import imageCompression from "browser-image-compression";
import swal from "sweetalert";
import { Link } from "react-scroll";
import styled from "styled-components";

//Image
import step1 from "../assets/groupUpload/step1.png";
import step2 from "../assets/groupUpload/step2.png";
import step3 from "../assets/groupUpload/step3.png";
import groupRightBtn from "../assets/groupUpload/groupRightBtn.png";
import groupLeftBtn from "../assets/groupUpload/groupLeftBtn.png";
import inputArrowGray from "../assets/groupUpload/inputArrowGray.svg";

//cookie
import { getCookie } from "../shared/Cookie";

//elements
import { Grid, IconButton, Text } from "../elements";

//components
import ImagesUpload from "../components/groupUpload/ImagesUpload";
import KakaoMap from "../components/groupUpload/KakaoMap";
import GroupUpContent from "../components/groupUpload/GroupUpContent";
import GroupUploadMob from "./GroupUploadMob";

const GroupUpload = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();

  const [repeatCnt, setRepeatCnt] = useState(1);
  const [isLoaded1, setIsLoad1] = useState(false);
  const [isLoaded2, setIsLoad2] = useState(false);
  const [isLoaded3, setIsLoad3] = useState(false);

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
      return swal("경로를 입력해주세요");
    }
    if (repeatCnt <= 0 || repeatCnt === "" || repeatCnt === null) {
      return swal("횟수는 0이 될 수없습니다.");
    } else {
      setIsLoad1(true);
      setIsLoad2(true);
    }
  };

  const goBack1 = () => {
    setIsLoad1(false);
    setIsLoad2(false);
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

  const checkNumber = (e) => {
    const regex = /^[0-9]{0,2}$/;
    if (regex.test(e.target.value)) {
      setRepeatCnt(e.target.value);
    }
  };

  const addGroupPost = async () => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (thumbnail.length === 0) {
      dispatch(addGroupDB(location, thumbnail, contents, address, distance));
    }

    if (thumbnail.length === 1) {
      try {
        const compressedFile1 = [await imageCompression(thumbnail[0], options)];

        dispatch(
          addGroupDB(location, compressedFile1, contents, address, distance)
        );
        dispatch(imgActions.resetFile());
      } catch (error) {
        // console.log(error);
      }
    }

    if (thumbnail.length === 2) {
      try {
        const compressedFile1 = await imageCompression(thumbnail[0], options);
        const compressedFile2 = await imageCompression(thumbnail[1], options);
        let resizeImage = [];

        resizeImage.push(compressedFile1, compressedFile2);

        dispatch(
          addGroupDB(location, resizeImage, contents, address, distance)
        );
        dispatch(imgActions.resetFile());
      } catch (error) {
        // console.log(error);
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
          addGroupDB(location, resizeImage, contents, address, distance)
        );
        dispatch(imgActions.resetFile());
      } catch (error) {
        // console.log(error);
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

  if (isMobile) {
    return <GroupUploadMob />;
  }

  if (!isMobile) {
    if (!isLoaded1) {
      return (
        <>
          <div id="step1"></div>
          <Grid
            position="relative"
            margin="0 auto"
            width="1200px"
            display="flex"
            justifyContent="space-between"
          >
            <Grid margin="80px 0 0 0" width="865px">
              <Grid display="flex" margin="0 0 18px 0" alignItems="center">
                <Grid display="flex" width="auto">
                  <Text
                    margin="0"
                    height="auto"
                    display="inline"
                    bold
                    size="20px"
                  >
                    러닝 코스
                  </Text>
                  <RedPoint></RedPoint>
                </Grid>
              </Grid>
              <Hr />

              <KakaoMap></KakaoMap>

              <Grid margin="48px 0 0 0 " display="flex">
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  margin="0 0 32px 0"
                >
                  <Text bold margin="0 55px 0 0">
                    코스 위치 정보
                  </Text>

                  <LocationInfo>
                    {address ? (
                      <Text size="16px">{address}</Text>
                    ) : (
                      <Text size="16px" color="#818181">
                        지정하신 시작 위치가 자동으로 입력됩니다.
                      </Text>
                    )}
                  </LocationInfo>
                </Grid>

                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text bold margin="0 55px 0 0">
                    최종 코스 거리
                  </Text>
                  <Grid display="flex" width="auto" margin="0">
                    <RepeatInfo>
                      <Text color="#818181">
                        반복 횟수
                        <br />
                      </Text>
                      <RepeatInput
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
                        <Text width="100%" textalign size="16px">
                          {finalDistance} km
                        </Text>
                      ) : (
                        <>
                          <Text size="16px" color="#818181">
                            코스 거리 km
                          </Text>
                          <img src={inputArrowGray} />
                        </>
                      )}
                    </DistanceInfo>
                  </Grid>
                </Grid>

                <Grid
                  display="flex"
                  alignItems="center"
                  margin="14px 0 0 148px"
                >
                  <IconButton
                    waring
                    color="#FF2D55"
                    size="19.21"
                    height="19.2px"
                    width="16px"
                    margin="0 8px 0 0"
                  />
                  <Text width="auto" color="#FF2D55" bold margin="0">
                    러닝 코스는 업로드 이후 수정이 불가능합니다. 해당 위치가
                    맞는지 다시 한 번 확인해 주세요!
                  </Text>
                </Grid>
              </Grid>

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
            <StepImg src={step1}></StepImg>
          </Grid>
        </>
      );
    }

    if (isLoaded2) {
      return (
        <>
          <div id="step2"></div>
          <Grid
            position="relative"
            margin="0 auto"
            width="1200px"
            display="flex"
            justifyContent="space-between"
          >
            <Grid margin="80px auto 320px auto" width="865px">
              <GroupUpContent></GroupUpContent>

              <Grid
                display="flex"
                margin="160px 0 0 0"
                justifyContent="space-between"
              >
                <Link to="step2" spy={true}>
                  <StepBtn2 onClick={goBack1}>
                    <img
                      style={{
                        width: "8px",
                        height: "auto",
                        marginRight: "16px",
                      }}
                      src={groupLeftBtn}
                    ></img>
                    이전단계
                  </StepBtn2>
                </Link>
                <Link to="step2" spy={true}>
                  <StepBtn2 onClick={goNext3}>
                    다음단계
                    <img
                      style={{
                        width: "8px",
                        height: "auto",
                        marginLeft: "16px",
                      }}
                      src={groupRightBtn}
                    ></img>
                  </StepBtn2>
                </Link>
              </Grid>
            </Grid>
            <StepImg src={step2}></StepImg>
          </Grid>
        </>
      );
    }

    if (isLoaded3) {
      return (
        <>
          <div id="step3"></div>
          <Grid
            position="relative"
            margin="0 auto "
            width="1200px"
            display="flex"
            justifyContent="space-between"
          >
            <Grid margin="80px auto 0 auto" width="865px">
              <Grid display="flex" margin="0 0 18px 0" alignItems="center">
                <Text
                  margin="0"
                  height="auto"
                  display="inline"
                  bold
                  size="20px"
                >
                  추가 이미지
                </Text>
              </Grid>
              <Hr />

              <Grid display="flex" maring="0">
                <Text bold>{`업로드 된 이미지 (${thumbnail.length}/3`})</Text>
              </Grid>
              <ImagesUpload></ImagesUpload>

              <Grid
                display="flex"
                justifyContent="space-between"
                margin="160px 0 397px 0"
              >
                <Link to="step3" spy={true}>
                  <StepBtn2 onClick={goBack2}>
                    <img
                      style={{
                        width: "8px",
                        height: "auto",
                        marginRight: "16px",
                      }}
                      src={groupLeftBtn}
                    ></img>
                    이전단계
                  </StepBtn2>
                </Link>
                <StepBtn2
                  onClick={() => {
                    addGroupPost();
                  }}
                  style={{ color: "#68F99E" }}
                >
                  작성완료
                </StepBtn2>
              </Grid>
            </Grid>
            <StepImg src={step3}></StepImg>
          </Grid>
        </>
      );
    }
  }
};

const StepImg = styled.img`
  position: sticky;
  width: 295px;
  height: 236px;
  margin: 0;
  top: 170px;
`;

const LocationInfo = styled.div`
  width: 714px;
  height: 68px;
  box-sizing: border-box;
  border: 1px solid #cbcbcb;
  border-radius: 3px 0 0 3px;
  display: flex;
  align-items: center;
  padding: 24px 32px;
  margin: 0;
`;

const DistanceInfo = styled.div`
  width: 357px;
  height: 68px;
  box-sizing: border-box;
  border: 1px solid #cbcbcb;
  border-left: none;
  border-radius: 0 3px 3px 0;
  display: flex;
  align-items: center;
  padding: 24px 32px;
  justify-content: space-between;
  margin: 0;
`;

const RepeatInfo = styled.div`
  width: 357px;
  height: 68px;
  box-sizing: border-box;
  border: 1px solid #cbcbcb;
  border-radius: 03px 0 0 3px;
  display: flex;
  align-items: center;
  padding: 10px 32px;
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
  font-size: 16px;
  font-family: "Spoqa Han Sans Neo";
  ::placeholder {
    font-weight: 500;
    font-size: 16px;
    font-family: "Spoqa Han Sans Neo";
    color: #818181;
  }
`;

const StepBtn = styled.button`
  font-family: "Spoqa Han Sans Neo";
  width: 173px;
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
  margin: 160px 0 320px auto;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #030c37;
  }
`;

const StepBtn2 = styled.button`
  font-family: "Spoqa Han Sans Neo";
  width: 173px;
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
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #030c37;
  }
`;

const Hr = styled.hr`
  width: 865px;
  height: 0px;
  margin: 0 0 48px 0;
  border-top: 1px solid #000000;
`;

const RedPoint = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: #ff2d55;
`;

export default GroupUpload;
