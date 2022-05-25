import React, { useEffect, useState } from "react";
import ImagesUpload from "../components/groupUpload/ImagesUpload";
import KakaoMap from "../components/groupUpload/KakaoMap";
import GroupUpContent from "../components/groupUpload/GroupUpContent";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addGroupDB } from "../redux/modules/feed";
import { history } from "../redux/configureStore";
import { Grid, IconButton, Text } from "../elements";
import { imgActions } from "../redux/modules/image";
import step1 from "../assets/groupUpload/step1.png";
import step2 from "../assets/groupUpload/step2.png";
import step3 from "../assets/groupUpload/step3.png";
import groupRightBtn from "../assets/groupUpload/groupRightBtn.png";
import groupLeftBtn from "../assets/groupUpload/groupLeftBtn.png";
import { Link } from "react-scroll";
import { resetMap } from "../redux/modules/uploadInfo";
import swal from "sweetalert";
import { useMediaQuery } from "react-responsive";
import GroupUploadMob from "./GroupUploadMob";
import { getCookie } from "../shared/Cookie";

const GroupUpload = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();

  const [isLoaded1, setIsLoad1] = useState(false);
  const [isLoaded2, setIsLoad2] = useState(false);
  const [isLoaded3, setIsLoad3] = useState(false);

  const location = useSelector((state) => state.uploadInfo.paths);
  const distance = useSelector((state) => state.uploadInfo.distance);
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

  const goNext3 = () => {
    if (contents.title === "") {
      return swal("제목을 입력해주세요");
    }
    if (contents.standbyTime === "") {
      return swal("러닝 일시를 입력해주세요");
    }
    if (contents.finishTime === "") {
      return swal("종료 시간을 입력해주세요");
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
    setIsLoad2(false);
    setIsLoad3(true);
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const goBack2 = () => {
    setIsLoad2(true);
    setIsLoad3(false);
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const addGroupPost = () => {
    dispatch(addGroupDB(location, thumbnail, contents, address, distance));
    dispatch(imgActions.resetFile());
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

                <Text regular display="inline" margin="0 10px" size="16px">
                  왼쪽 클릭을 통해 경로를 설정한 후, 오른쪽 클릭으로 경로를
                  마무리 해주세요.
                </Text>
              </Grid>
              <Hr />

              <KakaoMap></KakaoMap>

              <Grid margin="48px 0 0 0 " display="flex">
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text bold margin="0 55px 0 0">
                    코스 위치 정보
                  </Text>
                  <Grid display="flex" width="714px">
                    <LocationInfo>
                      {address ? (
                        <Text size="16px">{address}</Text>
                      ) : (
                        <Text size="16px" color="#818181">
                          지정하신 시작 위치가 자동으로 입력됩니다.
                        </Text>
                      )}
                    </LocationInfo>
                    <DistanceInfo>
                      {distance !== "NaN" ? (
                        <Text size="16px">{distance} km</Text>
                      ) : (
                        <Text size="16px" color="#818181">
                          코스 거리 km
                        </Text>
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
  width: 546px;
  height: 75px;
  box-sizing: border-box;
  border: 1px solid #cbcbcb;
  border-radius: 3px 0 0 3px;
  display: flex;
  align-items: center;
  padding: 24px 32px;
  margin: 0;
`;

const DistanceInfo = styled.div`
  width: 168px;

  height: 75px;
  box-sizing: border-box;
  border: 1px solid #cbcbcb;
  border-left: none;
  border-radius: 0px 3px 3px 0px;
  display: flex;
  align-items: center;
  padding: 24px 32px;
  justify-content: center;
  margin: 0;
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
  transform: rotate(180deg);
`;

const RedPoint = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: #ff2d55;
`;

export default GroupUpload;
