import React from 'react';
import { useSelector } from "react-redux";
import { Text, Grid }from '../../elements';
import styled from "styled-components";
import { FiChevronRight } from "react-icons/fi";

const Schedule = () => {

    const profile_list = useSelector((state) => state.mypage.list);
    
    if (profile_list.length === 0) { return <></>; }
    
    return (
        <Box>
          <Text bold size="16px" margin="0px 0px 32px 0px">
            참여예정 그룹 러닝
          </Text>

          <Text bold size="14px"  color="#696dcd" margin="-53px 0px 0px 1100px">
            전체보기
          </Text>
      
            <Grid display="flex">
                <MyImage src={profile_list.waiting[0].thumbnailUrl}/>
                <div>
                    <Text bold size="19px" margin="45px 0 0 0" color="#0a29c4">
                      D-{profile_list.waiting[0].dDay}
                    </Text>
                    <Text bold size="16px" margin="8px 0 0 0">{profile_list.waiting[0].title}</Text>
                    <Text  size="14px" color="#272d31"  margin="8px 0 0 0">
                        {profile_list.waiting[0].date} &nbsp;
                        ( 소요시간 : {profile_list.waiting[0].totalTime} )
                    </Text>
                    <Grid display="flex">
                      <TextBox>{profile_list.waiting[0].location}</TextBox>
                      <TextBox>{profile_list.waiting[0].distance}</TextBox>
                      <TextBox>{profile_list.waiting[0].thema}</TextBox>
                    </Grid>
                </div>
                <Grid  margin="-120px 0 0 570px">
                    <FiChevronRight  size="30" color='#AAA'/>
                </Grid>       
            </Grid>  

            <Grid margin="-180px 0 0 0px">
            {profile_list.waiting.map((waiting, index) =>
            index > 0 && 4 > index &&(
              
              <div key={waiting.groupId}>
                  <Grid 
                    display="flex" 
                    justifyContent="space-between"  
                    width="550px" 
                    height="180px" 
                    margin="-130px 0 0 650px"
                  >
                    <Text bold size="18px" color="#0a29c4">D-{waiting.dDay}</Text>
                        <Text bold size="18px">&nbsp;{waiting.title}</Text>
                        <div style={{margin:"0 0 0 140px", display:"flex"}}>
                            <TextBox>{waiting.location}</TextBox>
                            <TextBox>{waiting.distance}</TextBox>
                            <TextBox>{waiting.thema}</TextBox> 
                        </div>
                        <Hr/>
                  </Grid>
              </div>  
              )
            )}
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
  height: 24px;
  borderRadius: 1px;
  font-size: 14px;
  text-align:center;
  padding: 2.5px 6px;
  margin: 20px 10px 0 0;
`;

const MyImage = styled.img`
  width: 200px;
  height: 150px;
  margin: 35px 20px 0 0;
`;

const Hr = styled.div`
  width: 540px;
  height:1px;
  background-color: #BBB;
  margin: -62px 0 0 0;
`;
export default Schedule;