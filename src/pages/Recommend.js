import React from "react";
import Profile from "../components/myPage/Profile";
import Schedule from "../components/myPage/Schedule";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Text, Grid } from "../elements";

const Recommend = () => {
  return (
    <Box1>
      <Profile />
      <Schedule />
      <Grid display="flex">
        <Text
          _onClick={() => {
            history.push("/mypage");
          }}
          margin="-15px 0 0 30px"
          size="17px"
          color="#AAA"
          bold
        >
          그룹 러닝
        </Text>
        <Text
          _onClick={() => {
            history.push("/mypage/recommend");
          }}
          margin="-15px 0 0 50px"
          size="17px"
          bold
        >
          추천 코스
        </Text>
        <Text
          _onClick={() => {
            history.push("/mypage/badge");
          }}
          margin="-15px 0 0 50px"
          size="17px"
          color="#AAA"
          bold
        >
          뱃지
        </Text>
      </Grid>
      추천 코스
    </Box1>
  );
};

const Box1 = styled.div`
  width: 1200px;
  margin: auto;
`;

export default Recommend;
