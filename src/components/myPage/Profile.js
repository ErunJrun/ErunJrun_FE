import React from 'react';
import Level from './Level';
import styled from "styled-components";
import { Text } from "../../elements"

const Profile = () => {

  const userName = localStorage.getItem("nickname");
  const profile = localStorage.getItem("profileUrl");

    return (
        <Box>
            <MiddleBox>
              <ImgBox>
                <MyImage src={profile}/>
                <Text bold size="19px">
                  {userName}
                </Text>
              </ImgBox>
              <Introduce>
                 자기소개
                <Triangle/>
              </Introduce>
              <Information>
                <SmallBox>
                  <Text bold size="16px">
                    러닝레벨 
                  </Text>
                  <Text  bold size="17px" color="#4A4A4A">
                    블루
                  </Text>
                </SmallBox>
                <SmallBox>
                  <Text bold size="16px">
                    선호거리
                  </Text>
                  <Text bold size="17px" color="#4A4A4A">
                    10km
                  </Text>
                </SmallBox>
                <SmallBox>
                  <Text bold size="16px">
                    선호지역
                  </Text>
                  <Text size="17px" color="#4A4A4A">
                    경기도
                  </Text>
                </SmallBox>
              </Information>
            </MiddleBox>
            <Level/>
        </Box>
    );
};

const Box = styled.div`
  width: 1200px;
  height: 365px;
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
  height: 112px;
  border-radius: 6px;
  background-color: #e1e1e1;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  text-align: center;
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
width: 400px;
height: 90px;
margin-left: 100px;
line-height: 0.2;
`
export default Profile;