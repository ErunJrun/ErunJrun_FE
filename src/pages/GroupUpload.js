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
import { Grid, Text } from "../elements";
import { imgActions } from "../redux/modules/image";

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
    history.replace("/groupfeed");
  };

  if (!isLoaded1) {
    return (
      <>
        <UploadStep />
        <Grid margin="80px 0 0 280px" maxWidth="1032px" width="100%">
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
              지도위에 그룹러닝할 코스를 표시해주세요.
            </Text>
          </Grid>

          <Grid>
            <Text bold size="15px" bg="#EAEAEA" padding="10px" color="black">
              ⚠ 코스는 업로드 이후 수정이 불가능합니다. 다음 단계로 넘어가기
              전에 해당 위치가 맞는지 확인해 주세요!
            </Text>
          </Grid>

          <Grid>
            <KakaoMap
              setDistance={setDistance}
              setLocation={setLocation}
            ></KakaoMap>
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

          <StepBtn onClick={goNext2}>다음단계</StepBtn>
        </Grid>
      </>
    );
  }

  if (isLoaded2) {
    return (
      <>
        <GroupUpContent setContents={setContents}></GroupUpContent>
        <StepBtn onClick={goBack1}>이전단계</StepBtn>
        <StepBtn onClick={goNext3}>다음단계</StepBtn>
      </>
    );
  }

  if (isLoaded3) {
    return (
      <>
        <Grid margin="30px auto" padding="5px">
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
