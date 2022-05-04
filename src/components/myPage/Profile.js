import React from 'react';
import Level from './Level';
import styled from "styled-components";

const Profile = () => {
    return (
        <Box>
            <div>
              <MyImage src="https://ifh.cc/g/qT8V9W.jpg"/>
              <p>김다운</p>
              <p>블루</p>
              <p>경기도 | 10km</p>
              <Introduce>" 자기소개 "</Introduce>
            </div>
            <hr/>
            <Level/>
        </Box>
    );
};

const Box = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  width: 40%;
  height: 400px;
`;

const MyImage = styled.img`
  height: 80px;
  width: 80px;
  margin: 10px 40px 10px 40px;
  border-radius: 40%
`;

const Introduce = styled.div`
  //margin: 20px 0px 100px 115px;
  font-size: 20px;
  color: #536471;
`;
export default Profile;