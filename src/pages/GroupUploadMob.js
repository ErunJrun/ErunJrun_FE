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

const GroupUploadMob = () => {
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

  console.log(location, distance, thumbnail, contents, isLogin);

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

  useEffect(() => {
    if (!isLogin) {
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
          padding="10px 10px"
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
          padding="10px 10px"
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
                  <DistanceInfo>
                    {distance !== "NaN" ? (
                      <>
                        <Text textalign width="300px" margin="0" size="13px">
                          {distance}
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

              <Text
                display="flex"
                justifyContent="left"
                margin="18px 0 0 0"
                size="11px"
                width="auto"
                color="#FF2D55"
                bold
              >
                <IconButton
                  waring
                  color="#FF2D55"
                  size="14.4"
                  height="12px"
                  width="12px"
                  margin="1px 6px 0 0"
                />
                러닝 코스는 업로드 이후 수정이 불가능합니다. 해당 위치가 맞는지
                다시 <br></br>한 번 확인해 주세요!
              </Text>
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
          padding="10px 10px"
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
          padding="10px 10px"
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
                    style={{ width: "8px", height: "auto", marginLeft: "16px" }}
                    src={groupRightBtn}
                  ></img>
                </StepBtn2>
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
          position="relative"
          margin="0 auto "
          width="1200px"
          display="flex"
          justifyContent="space-between"
        >
          <Grid margin="80px auto 0 auto" width="865px">
            <Grid display="flex" margin="0 0 18px 0" alignItems="center">
              <Text margin="0" height="auto" display="inline" bold size="20px">
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
        </Grid>
      </>
    );
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
  width: 343px;
  height: 44px;
  box-sizing: border-box;
  border-radius: 3px;
  border: solid 1px #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 16px;
  margin: 0 0 8px 0;
`;

const DistanceInfo = styled.div`
  width: 343px;
  height: 44px;
  box-sizing: border-box;
  margin: 0;
  padding: 14px;
  border-radius: 3px;
  border: solid 1px #ddd;
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
  width: 343px;
  height: 1px;
  margin: 11.5px 16px 23.5px;
  background-color: #000;
`;

const RedPoint = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background: #ff2d55;
`;

export default GroupUploadMob;
