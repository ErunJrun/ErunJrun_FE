/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
import Level from "./Level";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Text, Grid } from "../../elements";
import LevelBox from "../groupDetail/LevelBox";
import { useMediaQuery } from "react-responsive";
import { history } from "../../redux/configureStore";

const Profile = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const myId = localStorage.getItem("userId");
  const profile_list = useSelector((state) => state.mypage.list);

  if(isMobile) {
    return (
      <Grid width="350px" >
        <_MyImage src={profile_list?.userInfo?.profileUrl} />
        <Grid 
          width="225px" 
          height="65px" 
          margin="-70px 0 0 85px"
        >
          <Text bold size="14px" >
            {profile_list?.userInfo?.nickname}
          </Text> 
          <Text regular size="12px" width="225px"  margin="-12px 0 0 0">
            {profile_list?.userInfo?.bio}
          </Text> 
        </Grid>

        {profile_list?.userInfo?.userId === myId ?
          <Text bold size="20px" margin="-60px 0 0 90%" _onClick={()=>{history.push("/edit")}}>
            >
          </Text>
        :
          null
        }
        <Level/>
        <_Box>
          <_SmallBox>
            <Text  size="12px" color="#7b7b7b">
              {" "}
              러닝레벨{" "}
            </Text>
            <LevelBox userLevel={profile_list?.userInfo?.userLevel} />
          </_SmallBox>
          <_SmallBox>
            <Text  size="12px" color="#7b7b7b">
              {" "}
              선호거리{" "}
            </Text>
            <Text size="12px" color="#000">
              {" "}
              {profile_list?.userInfo?.likeDistance}
            </Text>
          </_SmallBox>
          <_SmallBox>
            <Text  size="12px" color="#7b7b7b">
              {" "}
              선호지역{" "}
            </Text>
            <Text size="12px" color="#000">
              {" "}
              {profile_list?.userInfo?.likeLocation}
            </Text>
          </_SmallBox>
        </_Box>
      </Grid>
    );
  }
  
  return (
    <Box>
      <MiddleBox> 
          <MyImage src={profile_list?.userInfo?.profileUrl} />
          <TextBox>
            <Text 
              margin="39px 0 0 0"
              size="18px"
              >
                <span style={{fontWeight:"700"}}>
                {" "}
                {profile_list?.userInfo?.nickname}{" "} 
                </span>
                님의 한 줄 소개
            </Text> 
          </TextBox>

        <Introduce>
          <Triangle />    
            <Text 
              size="14px"
              margin="-30px 0 0 0"
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
            <Text size="18px" color="#000">
              {" "}
              {profile_list?.userInfo?.likeDistance}
            </Text>
          </SmallBox>
          <SmallBox>
            <Text bold size="16px">
              {" "}
              선호지역{" "}
            </Text>
            <Text size="18px" color="#000">
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
  width: 1198px;
  height: 348px;
  margin: 64px auto 24px auto;
  //padding: 24px 38px 32px 32px;
  border-radius: 6px;
  border: solid 1px #b8b8b8;
`;

const _Box = styled.div`
  width: 343px;
  height: 95px;
  margin: 28px auto;
  border-radius: 3px;
  border: solid 1px #ddd;
  background-color: #fff;
  padding: 7px 0px;
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
  margin-top: 16px;
`;

const _SmallBox = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 16px;
  gap: 16px;
  margin: 12px 0 0 24px;

`;

const TextBox = styled.div`
  width: 431px;
  height: 23px;
  text-align: left;
  margin: -3px 0 0 32px;
`;

const MyImage = styled.img`
  height: 96px;
  width: 96px;
  border-radius: 50%;
  margin: 38px 0 0 40px;
  border: solid 2px #ddd;
  object-fit: cover;
`;

const _MyImage = styled.img`
  height: 68px;
  width: 68px;
  border-radius: 50%;
  margin: 80px 0 0 0px;
  border: solid 2px #ddd;
  object-fit: cover;
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
  height: 62px;
  border-radius: 6px;
  background-color:  #f0f0f0;
  font-size: 16.5px;
  font-weight: 550;
  color: #000;
  text-align: center;
  padding-top: -5px;
  margin: 72px 0 30px -479px;
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
  height: 101px;
  line-height: 0.6;
  margin: 22px 0 0 120px;
`;

const _Hr = styled.div`
  width: 94%;
  height: 1px;
  margin: 0px 0 40px 2.5%;
  background-color: #ddd;
`;
export default Profile;