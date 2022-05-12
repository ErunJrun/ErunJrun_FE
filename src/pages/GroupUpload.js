import React, { useEffect, useState } from "react";
import ImagesUpload from "../components/groupUpload/ImagesUpload";
import KakaoMap from "../components/groupUpload/KakaoMap";
import GroupUpContent from "../components/groupUpload/GroupUpContent";
import styled from "styled-components";
import UploadStep from "../components/groupUpload/UploadStep";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addGroupDB } from "../redux/modules/feed";
import { history } from "../redux/configureStore";
import { Grid, IconButton, Text } from "../elements";
import { imgActions } from "../redux/modules/image";
import step1 from "../assets/step1.png";
import step3 from "../assets/step3.png";

import "./GruopUpload.css";

const GroupUpload = () => {
  const dispatch = useDispatch();

  const [isLoaded1, setIsLoad1] = useState(false);
  const [isLoaded2, setIsLoad2] = useState(false);
  const [isLoaded3, setIsLoad3] = useState(false);

  const [location, setLocation] = useState([]);
  const [distance, setDistance] = useState([]);
  const [image, setImage] = useState([]);
  const [contents, setContents] = useState([]);
  const [address, setAddress] = useState("");

  const thumbnail = useSelector((state) => state.image.files);

  console.log(location, distance, thumbnail, contents);

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
      window.alert("경로를 입력해주세요");
    } else {
      setIsLoad1(true);
      setIsLoad2(true);
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const goBack1 = () => {
    setIsLoad1(false);
    setIsLoad2(false);
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // if (contents[0].title === "") {
  //   window.alert("제목을 입력해주세요");
  // }
  // if (contents[0].standbyTime === "") {
  //   window.alert("스탠바이 시간을 입력해주세요");
  // }
  // if (contents[0].finishTime === "") {
  //   window.alert("종료 시간을 입력해주세요");
  // }
  // if (contents[0].maxPeople === "") {
  //   window.alert("모집인원을 입력해주세요");
  // }
  // if (contents[0].date === "") {
  //   window.alert("러닝 날짜를 입력해주세요");
  // }
  // if (contents[0].speed === "") {
  //   window.alert("페이스를 선택해주세요");
  // }
  // if (contents[0].content === "") {
  //   window.alert("상세설명을 입력해주세요");
  // }
  // if (contents[0].theme === "") {
  //   window.alert("러닝타입을 선택해주세요");}

  const goNext3 = () => {
    if (
      contents[0].title === "" ||
      contents[0].standbyTime === "" ||
      contents[0].finishTime === "" ||
      contents[0].maxPeople === "" ||
      contents[0].date === "" ||
      contents[0].speed === "" ||
      contents[0].theme === "" ||
      contents[0].content === ""
    ) {
      window.alert("빈칸을 채워주세요");
    } else {
      setIsLoad2(false);
      setIsLoad3(true);
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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

  if (!isLoaded1) {
    return (
      <>
        {/* <UploadStep /> */}

        <Grid margin="80px 695px 0 auto" maxWidth="865px" width="100%">
          <Step1Img src={step1}></Step1Img>
          <Grid display="flex" margin="0 0 18px 0" alignItems="center">
            <Grid display="flex" width="auto">
              <Text margin="0" height="auto" display="inline" bold size="20px">
                러닝 코스
              </Text>
              <RedPoint></RedPoint>
            </Grid>

            <Text display="inline" margin="0 10px" size="16px">
              왼쪽 클릭을 통해 경로를 설정한 후, 오른쪽 클릭으로 경로를 마무리
              해주세요.
            </Text>
          </Grid>
          <Hr />

          <KakaoMap
            setDistance={setDistance}
            setLocation={setLocation}
          ></KakaoMap>

          <Grid display="flex">
            <Grid display="flex" alignItems="center">
              <Text width="auto" bold size="15px" margin="0 65.7px 0 0">
                코스 위치 정보
              </Text>
              <Grid display="flex" maxWidth="716px">
                <Grid display="flex">
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
            </Grid>
            <Grid display="flex" alignItems="center" margin="14px 0 0 0">
              <IconButton
                waring
                color="#FF2D55"
                size="19.21"
                height="19.2px"
                width="16px"
                margin="0 8px 0 148px"
              />
              <Text width="auto" color="#FF2D55" bold margin="0">
                러닝 코스는 업로드 이후 수정이 불가능합니다. 해당 위치가 맞는지
                다시 한 번 확인해 주세요!
              </Text>
            </Grid>
          </Grid>

          <StepBtn onClick={goNext2}>다음단계</StepBtn>
        </Grid>
      </>
    );
  }

  if (isLoaded2) {
    return (
      <>
        <GroupUpContent setContents={setContents}></GroupUpContent>
        <Grid
          maxWidth="865px"
          width="100%"
          display="flex"
          justifyContent="space-between"
          margin="80px 0 397px 280px"
        >
          <StepBtn2 onClick={goBack1}>이전단계</StepBtn2>
          <StepBtn2 onClick={goNext3}>다음단계</StepBtn2>
        </Grid>
      </>
    );
  }

  if (isLoaded3) {
    return (
      <>
        <Grid margin="80px 695px 0 auto" maxWidth="865px" width="100%">
          <Step1Img src={step3}></Step1Img>
          <Grid display="flex" margin="0 0 18px 0" alignItems="center">
            <Grid display="flex" width="auto">
              <Text margin="0" height="auto" display="inline" bold size="20px">
                러닝 코스
              </Text>
              <RedPoint></RedPoint>
            </Grid>
          </Grid>
          <Hr />

          <Grid display="flex" maring="0">
            <Text bold>{`업로드 된 이미지 (${thumbnail.length}/3`})</Text>
          </Grid>
          <ImagesUpload setImage={setImage}></ImagesUpload>

          <Grid
            display="flex"
            justifyContent="space-between"
            margin="160px 0 397px 0"
          >
            <StepBtn2 onClick={goBack2}>이전단계</StepBtn2>
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
      </>
    );
  }
};

const Step1Img = styled.img`
  position: fixed;
  max-width: 295px;
  width: 100%;
  right: 360px;
  top: 170px;
`;

const LocationInfo = styled.div`
  max-width: 546px;
  width: 100%;
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
  max-width: 168px;
  width: 100%;
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
  max-width: 173px;
  width: 100%;
  height: 45px;
  background: #030c37;
  border-radius: 3px;
  font-weight: 700;
  font-size: 18px;
  padding: 10px 40px;
  color: white;
  display: flex;
  align-items: center;
  margin: 160px 0 200px auto;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #030c37;
  }
`;

const StepBtn2 = styled.button`
  max-width: 173px;
  width: 100%;
  height: 45px;
  background: #030c37;
  border-radius: 3px;
  font-weight: 700;
  font-size: 18px;
  padding: 10px 40px;
  color: white;
  display: flex;
  align-items: center;
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
  border: 1px solid #000000;
  transform: rotate(180deg);
`;

const RedPoint = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: #ff2d55;
`;

export default GroupUpload;