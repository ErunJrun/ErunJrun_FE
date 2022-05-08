import React from 'react';
import { Text, Grid }from '../../elements';
import styled from "styled-components";
import { FiChevronRight } from "react-icons/fi";

const Schedule = () => {
    return (
        <Box>
          <Text bold size="16px" margin="0px 0px 32px 0px">
            참여예정 그룹 러닝
          </Text>

          <Text bold size="14px"  color="#696dcd" margin="-53px 0px 0px 1100px">
            전체보기
          </Text>
      
            <Grid display="flex">
                <MyImage src="https://www.outdoornews.co.kr/news/photo/202012/32235_91262_1629.jpg"/>
                <div>
                    <Text bold size="19px" margin="45px 0 0 0">D-2</Text>
                    <Text bold size="16px" margin="8px 0 0 0">벛꽃과 야경 러닝 명소</Text>
                    <Text  size="14px" color="#272d31"  margin="8px 0 0 0">
                      2022.05.30 (토) 10:00 (소요시간 : 2h 30min)
                    </Text>
                    <Grid display="flex">
                      <TextBox>고양시</TextBox>
                      <TextBox>10 km</TextBox>
                      <TextBox>도시</TextBox>
                    </Grid>
                </div>
                <Grid  margin="-120px 0 0 570px">
                    <FiChevronRight  size="30" color='#AAA'/>
                </Grid>
            </Grid>

            <Grid margin="-180px 0 0 630px"  width="550px" height="180px">
              <Grid display="flex" justifyContent="space-between">
                  <Text bold size="17px">D-3 &nbsp;&nbsp;&nbsp;봄에 뛰기 좋은 코스</Text>
                  <div style={{margin:"0 0 0 0px", display:"flex"}}>
                      <TextBox>고양시</TextBox>
                      <TextBox>10 km</TextBox>
                      <TextBox>도시</TextBox> 
                  </div>
                  <Hr/>
              </Grid>
              <Grid display="flex" margin="-125px 0 0 0" justifyContent="space-between">
                  <Text bold size="17px">D-12 &nbsp;&nbsp;&nbsp;봄에  뛰기 좋은 코스</Text>
                  <div style={{margin:"0 0 0 50px", display:"flex"}}>
                      <TextBox>고양시</TextBox>
                      <TextBox>10 km</TextBox>
                      <TextBox>도시</TextBox> 
                  </div>
                  <Hr/>
              </Grid>
              <Grid display="flex" margin="-125px 0 0 0" justifyContent="space-between">
                  <Text bold size="17px">D-24 &nbsp;&nbsp;&nbsp;봄에 뛰기 좋은 코스</Text>
                  <div style={{margin:"0 0 0 50px", display:"flex"}}>
                      <TextBox>고양시</TextBox>
                      <TextBox>10 km</TextBox>
                      <TextBox>도시</TextBox> 
                  </div>
              </Grid>
            </Grid>
        </Box>
    );
};

const Box = styled.div`
  width: 1200px;
  height: 200px;
  margin: 24px auto 64px auto;
  padding: 24px 38px 32px 32px;
  border-radius: 6px;
  background-color: #f5f5f5;
`;

const TextBox = styled.div`
  background-color: #DDDDDD;
  width: 60px;
  height: 24px;
  borderRadius: 1px;
  font-size: 14px;
  text-align:center;
  padding-top: 2px;
  margin-right: 10px;
  margin-top: 20px;
`;

const MyImage = styled.img`
  width: 200px;
  height: 150px;
  margin: 35px 20px 0 0;
`;

const Hr = styled.div`
  width: 540px;
  height:2px;
  background-color: #BBB;
  margin: -62px 0 0 0;
`;
export default Schedule;