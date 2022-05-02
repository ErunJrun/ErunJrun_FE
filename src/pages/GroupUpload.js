import React, { useEffect, useState } from "react";
import ImagesUpload from "../components/groupUpload/ImagesUpload";
import KakaoMap from "../components/groupUpload/KakaoMap";
import GroupUpContent from "../components/groupUpload/GroupUpContent";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addGroupDB } from "../redux/modules/feed";
import { history } from "../redux/configureStore";
import { Grid, Text } from "../elements";
import { imgActions } from "../redux/modules/image";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import "./GruopUpload.css";

const steps = [
  {
    label: "Step 1. 코스 입력",
  },
  {
    label: "Step 2. 이미지 업로드",
  },
  {
    label: "Step 3. 그룹러닝 정보 입력",
  },
];

const GroupUpload = () => {
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(0);

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
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const goBack1 = () => {
    setIsLoad1(false);
    setIsLoad2(false);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const goNext3 = () => {
    if (thumbnail.length == 0) {
      window.alert("최소 1장의 이미지를 추가해 주세요");
    } else {
      setIsLoad2(false);
      setIsLoad3(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const goBack2 = () => {
    setIsLoad2(true);
    setIsLoad3(false);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const addGroupPost = () => {
    if (
      contents.title === "" ||
      contents.standbyTime === "" ||
      contents.finishTime === "" ||
      contents.startTime === "" ||
      contents.maxPeople === "" ||
      contents.date === "" ||
      contents.speed === "" ||
      contents.content === ""
    ) {
      window.alert("모든 값을 입력해주세요");
    } else {
      dispatch(addGroupDB(location, thumbnail, contents, address, distance));
      dispatch(imgActions.resetFile());
      history.replace("/groupfeed");
    }
  };

  if (!isLoaded1) {
    return (
      <>
        <Grid margin="30px auto" padding="5px">
          <StepWrap>
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      <Box sx={{ mb: 5 }}></Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </StepWrap>
          <Grid>
            <Text bold size="20px">
              그룹러닝 등록하기
            </Text>
          </Grid>
          <Grid>
            <Text display="inline" bold size="15px">
              Step 1. 코스입력
            </Text>
            <Text display="inline" margin="0 10px" size="13px">
              지도위에 추천하고 싶은 코스를 표시해주세요.
            </Text>
          </Grid>

          <Grid display="flex">
            <Grid width="500px">
              <Text bold size="15px">
                위치
              </Text>
              <Text size="15px">{address ? address : " "}</Text>
            </Grid>

            <Grid width="500px" margin="0 10px">
              <Text bold size="15px">
                총 거리
              </Text>
              <Text size="15px">{distance ? distance : "0"}km</Text>
            </Grid>
          </Grid>
        </Grid>
        <KakaoMap
          setDistance={setDistance}
          setLocation={setLocation}
        ></KakaoMap>
        <StepBtn onClick={goNext2}>다음단계</StepBtn>
      </>
    );
  }

  if (isLoaded2) {
    return (
      <>
        <Grid margin="30px auto" padding="5px">
          <StepWrap>
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      <Box sx={{ mb: 5 }}></Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </StepWrap>
          <Grid>
            <Text bold size="20px">
              그룹러닝 등록하기
            </Text>
          </Grid>
          <Grid>
            <Text display="inline" bold size="15px">
              Step 2. 이미지 업로드
            </Text>
            <Text display="inline" margin="0 10px" size="13px">
              그룹 러닝 썸네일에 들어갈 대표 이미지와 관련 상세 이미지를
              업로드해주세요.
            </Text>
          </Grid>

          <Grid display="flex">
            <Grid width="500px">
              <Text bold size="15px">
                {`업로드 된 이미지 ${thumbnail.length}/3`}
              </Text>
            </Grid>
          </Grid>
        </Grid>
        <ImagesUpload setImage={setImage}></ImagesUpload>
        <StepBtn onClick={goBack1}>이전단계</StepBtn>
        <StepBtn onClick={goNext3}>다음단계</StepBtn>
      </>
    );
  }

  if (isLoaded3) {
    return (
      <>
        <StepWrap>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Box sx={{ mb: 5 }}></Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </StepWrap>
        <GroupUpContent setContents={setContents}></GroupUpContent>
        <StepBtn onClick={goBack2}>이전단계</StepBtn>

        <StepBtn
          onClick={() => {
            addGroupPost();
          }}
        >
          작성완료
        </StepBtn>
      </>
    );
  }
};

const StepWrap = styled.div`
  position: fixed;
  width: 250px;
  height: 250px;
  right: 200px;
  top: 294px;
  box-shadow: 0px 2px 18px -5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background-color: #ffffff;
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

export default GroupUpload;
