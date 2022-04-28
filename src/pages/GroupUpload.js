import React, { useState } from "react";
import GroupImage from "../components/GroupImage";
import KakaoMap from "../components/KakaoMap";
import GroupContent from "../components/GroupContent";
import styled from "styled-components";

const GroupUpload = () => {
  const [isLoaded1, setIsLoad1] = useState(false);
  const [isLoaded2, setIsLoad2] = useState(false);
  const [isLoaded3, setIsLoad3] = useState(false);

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
        <KakaoMap></KakaoMap>
        <StepBtn onClick={goNext2}>다음단계</StepBtn>
      </>
    );
  }

  if (isLoaded2) {
    return (
      <>
        <GroupImage></GroupImage>
        <StepBtn onClick={goBack1}>이전단계</StepBtn>
        <StepBtn onClick={goNext3}>다음단계</StepBtn>
      </>
    );
  }

  if (isLoaded3) {
    return (
      <>
        <GroupContent></GroupContent>
        <StepBtn onClick={goBack2}>이전단계</StepBtn>
        <StepBtn>작성완료</StepBtn>
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
