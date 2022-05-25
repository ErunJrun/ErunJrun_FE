import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import MyModal from './MyModal';
import Progress from './Progress';
import styled from "styled-components";
import { Text,Grid } from "../../elements"
import { useMediaQuery } from "react-responsive";

const Level = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const profile_list = useSelector((state) => state.mypage.list);
  console.log(profile_list);
  if(isMobile) {
    return (
      <Grid 
        width="350px" 
        margin="45px auto 0px auto"    
      >
        <Text 
          size="12px"
          margin="0 0 0 0px"
          >
          굿러너 레벨 &nbsp;
          <span style={{color: "#2f80ed"}}>
            {profile_list?.userInfo?.mannerPoint}km    
          </span>
        </Text > 
        <MyModal/>   
        <Progress done={profile_list?.userInfo?.mannerPoint}/> 
      </Grid>
    );
  }
  return (
      <div> 
          <Box>
            <Text 
              bold
              size="12px"
            >
                굿러너 레벨          
            </Text> 
            <MyModal/> 
          </Box>        
          <Progress done={profile_list?.userInfo?.mannerPoint}/>        
        </div>
    );
};

const Box = styled.div`
 display: flex;
 align-items: center;
 margin: -12px 0px -20px 172px;
`;

export default Level;