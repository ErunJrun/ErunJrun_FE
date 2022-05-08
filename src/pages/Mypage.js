import React from "react";
import Profile from "../components/myPage/Profile";
import Schedule from "../components/myPage/Schedule";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import MGroupCard from "../components/myPage/MGroupCard";
import { Text, Grid } from "../elements"

const Mypage = () => {
  return (
    <Grid  width="1200px" margin="auto">
        <Profile/>
        <Schedule/>
        <Grid display="flex">
            <Text
            _onClick={() => {history.push("/mypage");}}
            margin="-15px 0 0 30px"
            size="17px"
            bold>
              그룹 러닝
            </Text>
            <Text
            _onClick={() => {history.push("/mypage/recommend");}} 
            margin="-15px 0 0 50px"
            size="17px"
            color="#AAA"
            bold>
              코스 추천
            </Text>
            <Text
            _onClick={() => {history.push("/mypage/badge");}}
            margin="-15px 0 0 50px"
            size="17px"
            color="#AAA"
            bold>
              뱃지
            </Text>
        </Grid>  
          <MGroupCard/>
    </Grid>  
    
  );
};

export default Mypage;
