import React, { useState } from "react";
import ImagesUpload from "../components/ImagesUpload";
import KakaoMap from "../components/KakaoMap";
import GroupContent from "../components/GroupContent";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addGroupDB } from "../redux/modules/feed";
import { history } from "../redux/configureStore";
import { Grid, Text } from "../elements";

const GroupUpload = () => {
  const dispatch = useDispatch();

  const [isLoaded1, setIsLoad1] = useState(false);
  const [isLoaded2, setIsLoad2] = useState(false);
  const [isLoaded3, setIsLoad3] = useState(false);

  const [location, setLocation] = useState([]);
  const [image, setImage] = useState([]);
  const [contents, setContents] = useState([]);

  const thumbnail = useSelector((state) => state.image.files);

  console.log(location, thumbnail, contents);

  const goNext2 = () => {
    setIsLoad1(true);
    setIsLoad2(true);
  };

  const goBack1 = () => {
    setIsLoad1(false);
    setIsLoad2(false);
  };

  const goNext3 = () => {
    setIsLoad2(false);
    setIsLoad3(true);
  };

  const goBack2 = () => {
    setIsLoad2(true);
    setIsLoad3(false);
  };

  if (!isLoaded1) {
    return (
      <>
        <Grid margin="30px auto" border="1px solid blue" padding="5px">
          <Grid>
            <Text border="1px solid red" bold size="20px">
              그룹러닝 등록하기
            </Text>
          </Grid>
          <Grid>
            <Text border="1px solid red" display="inline" bold size="15px">
              Step 1. 코스입력
            </Text>
            <Text
              border="1px solid red"
              display="inline"
              margin="0 10px"
              size="13px"
            >
              지도위에 추천하고 싶은 코스를 표시해주세요.
            </Text>
          </Grid>

          <Grid display="flex">
            <Grid width="500px">
              <Text border="1px solid red" bold size="15px">
                위치
              </Text>
              <Text border="1px solid red" size="15px">
                경기도 용인시 수지구 죽전동 112번지
              </Text>
            </Grid>

            <Grid width="500px" margin="0 10px">
              <Text border="1px solid red" bold size="15px">
                거리
              </Text>
              <Text border="1px solid red" size="15px">
                20km
              </Text>
            </Grid>
          </Grid>
        </Grid>
        <KakaoMap setLocation={setLocation}></KakaoMap>
        <StepBtn onClick={goNext2}>다음단계</StepBtn>
      </>
    );
  }

  if (isLoaded2) {
    return (
      <>
        <Grid margin="30px auto" border="1px solid blue" padding="5px">
          <Grid>
            <Text border="1px solid red" bold size="20px">
              그룹러닝 등록하기
            </Text>
          </Grid>
          <Grid>
            <Text border="1px solid red" display="inline" bold size="15px">
              Step 2. 이미지 업로드
            </Text>
            <Text
              border="1px solid red"
              display="inline"
              margin="0 10px"
              size="13px"
            >
              그룹 러닝 썸네일에 들어갈 대표 이미지와 관련 상세 이미지를
              업로드해주세요.
            </Text>
          </Grid>

          <Grid display="flex">
            <Grid width="500px">
              <Text border="1px solid red" bold size="15px">
                업로드 된 이미지 2/3
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
        <GroupContent setContents={setContents}></GroupContent>
        <StepBtn onClick={goBack2}>이전단계</StepBtn>
        <StepBtn
          onClick={() => {
            dispatch(addGroupDB(location, image, contents));
            history.push("/groupfeed");
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
