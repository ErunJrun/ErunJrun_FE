import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProfileDB } from "../../redux/modules/mypage"
import MyModal from './MyModal';
import Progress from './Progress';
import styled from "styled-components";
import { Text } from "../../elements"

const Level = () => {

    const profile_list = useSelector((state) => state.mypage.list);
    console.log(profile_list);

    return (
        <div> 
            <Box>
               <Text bold size="16px">
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
 margin: -20px 0px -10px 135px;
`;

export default Level;