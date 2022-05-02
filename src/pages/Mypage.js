import React from "react";
import Profile from "../components/myPage/Profile";
import Schedule from "../components/myPage/Schedule";
import RunningBox from "../components/myPage/RunningBox";
import styled from "styled-components";
import Badge from "../components/myPage/Badge";

const Mypage = () => {
  return (
    <Box>
      <Box2>
        <Profile/>
        <Schedule/>
      </Box2>  
        <RunningBox/>
        <Badge/>
    </Box>
  );
};

const Box2 = styled.div`
  display: flex;
`;

const Box = styled.div`
  justify-content: center;
  align-item: center;
  margin: auto;
`;

export default Mypage;
