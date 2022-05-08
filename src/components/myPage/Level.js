import React from 'react';
import MyModal from './MyModal';
import Progress from './Progress';
import styled from "styled-components";
import { Text } from "../../elements"

const Level = () => {

    return (
        <div> 
            <Box>
               <Text bold size="16px">
                굿러너 레벨          
               </Text> 
               <MyModal/> 
            </Box>          
            <Progress done="70"/>         
        </div>
    );
};

const Box = styled.div`
 display: flex;
 align-items: center;
 margin: -20px 0px -10px 150px;
`;

export default Level;