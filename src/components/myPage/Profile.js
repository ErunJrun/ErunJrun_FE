import React from 'react';
import Level from './Level';
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Text, Grid } from "../../elements"

const Profile = () => {


  const profile_list = useSelector((state) => state.mypage.list);

  if (profile_list.length === 0) { return <></>; }

  // if(profile_list.userInfo.likeDistance === "1") {
  //   return  profile_list.userInfo.likeDistance = "5km 미만"
  // }

    return (
        <Box>
            <MiddleBox>

              <ImgBox>
                <MyImage src={profile_list.userInfo.profileUrl}/>
                <Text bold size="20px"> {profile_list.userInfo.nickname} </Text>
              </ImgBox>

              <Introduce>
                 {profile_list.userInfo.bio}
                <Triangle/>
              </Introduce>

              <Information>
                  <SmallBox>
                    <Text bold size="16px"> 러닝레벨 </Text>
                    <Text 
                      size="14px"
                      margin="8px 0 0 0" 
                      padding="10px 10px 0 7px"
                      color="#fff"
                      height="13px"
                      borderRadius="3px"
                      bg="#ff3d3d"
                      textalign="center"
                    > {profile_list.userInfo.userLevel} RUNNER</Text>
                  </SmallBox>
                  <SmallBox>
                    <Text bold size="16px"> 선호거리 </Text>
                    <Text size="17px" color="#000"> {profile_list.userInfo.likeDistance}</Text>
                  </SmallBox>
                  <SmallBox>
                    <Text bold size="16px"> 선호지역 </Text>
                    <Text size="17px" color="#000"> {profile_list.userInfo.likeLocation}</Text>
                  </SmallBox>
              </Information>

            </MiddleBox>
            <Level/>
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
  display: felx;

`;

const SmallBox = styled.div`
  display: felx;
  width: 255px;
  height: 23px;
  gap: 20px;
  margin-top: 10px;
`;

const ImgBox = styled.div`
  width: 100px;
  height: 141px;
  text-align:center;
  line-height: 0.5;
  margin-top: 8px;
`;

const MyImage = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%
`;

const Introduce = styled.div`
  white-space: nowrap;
  transform: translate(12%);
  width: 480px;
  height: 90px;
  border-radius: 6px;
  background-color: #e1e1e1;
  font-size: 16.5px;
  font-weight: 550;
  color: #000;
  text-align: center;
  padding-top: 25px;
  margin-top: 8px;
`;

const Triangle= styled.div`
  width:0;
  height: 0;
  border-style: solid;
  border-width: 1rem;
  border-color:transparent #e1e1e1 transparent transparent;
  transform: translate(-95%, 50%);
`

const Information= styled.div`
width: 450px;
height: 90px;
line-height: 0.2;
margin: 7px 0 0 110px;
`
export default Profile;