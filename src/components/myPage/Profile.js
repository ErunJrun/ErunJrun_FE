import React, { useEffect } from "react";
import Level from "./Level";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Text, Grid } from "../../elements";
import LevelBox from "../groupDetail/LevelBox";

const Profile = () => {
  const profile_list = useSelector((state) => state.mypage.list);
  // console.log(profile_list.userInfo.userLevel);
  //if (profile_list.length === 0) { return <></>; }

  return (
    <Box>
      <MiddleBox> 
          <MyImage src={profile_list?.userInfo?.profileUrl} />
          <TextBox>
            <Text 
              bold 
              size="18px"
              >
                {" "}
                {profile_list?.userInfo?.nickname}{" "} 님의 한 줄 소개
            </Text> 
          </TextBox>

        <Introduce>
          <Triangle />    
            <Text 
            margin="-35px 0 0 0"
            padding="20px">
              {profile_list?.userInfo?.bio}
            </Text>   
        </Introduce>

        <Information>
          <SmallBox>
            <Text bold size="16px">
              {" "}
              러닝레벨{" "}
            </Text>
            <LevelBox userLevel={profile_list?.userInfo?.userLevel} />
          </SmallBox>
          <SmallBox>
            <Text bold size="16px">
              {" "}
              선호거리{" "}
            </Text>
            <Text size="17px" color="#000">
              {" "}
              {profile_list?.userInfo?.likeDistance}
            </Text>
          </SmallBox>
          <SmallBox>
            <Text bold size="16px">
              {" "}
              선호지역{" "}
            </Text>
            <Text size="17px" color="#000">
              {" "}
              {profile_list?.userInfo?.likeLocation}
            </Text>
          </SmallBox>
        </Information>
      </MiddleBox>
      <Level />
    </Box>
  );
};

const Box = styled.div`
  width: 1200px;
  height: 310px;
  margin: 64px auto 24px auto;
  padding: 24px 38px 32px 32px;
  border-radius: 6px;
  border: solid 2px #b8b8b8;
`;

const MiddleBox = styled.div`
  display: flex;
`;

const SmallBox = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 23px;
  gap: 20px;
  margin-top: 10px;
`;

const TextBox = styled.div`
  width: 431px;
  height: 23px;
  text-align: left;
  margin: -3px 0 0 32px;
`;

const MyImage = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin-top: 15px;
`;

const Bio = styled.div`
  height: 100px;
  width: 400px;
  border: 1px solid black;
  word-break: break-all;
`;

const Introduce = styled.div`
  white-space: nowrap;
  transform: translate(12%);
  width: 540px;
  height: 70px;
  border-radius: 6px;
  background-color:  #f0f0f0;
  font-size: 16.5px;
  font-weight: 550;
  color: #000;
  text-align: center;
  padding-top: -5px;
  margin: 50px 0 30px -500px;
  white-space: normal;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 1rem;
  border-color: transparent #f0f0f0 transparent transparent;
  transform: translate(-95%, 50%);
`;

const Information = styled.div`
  width: 450px;
  height: 90px;
  line-height: 0.2;
  margin: 7px 0 0 110px;
`;
export default Profile;
