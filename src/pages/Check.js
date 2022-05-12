import React, { useState } from 'react';
import { Text,Grid } from "../elements"
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Check = () => {
    
    const [bgColor, setBgColor] = useState("white")
    const [color, setColor] = useState("#05ae24");
    const [check, setCheck] = useState("출석확인");
    const [ckColor, setCkColor] = useState("white");

    const check_list = useSelector((state) => state.mypage.attend);
    console.log(check_list);
     //if (check_list.length === 0) { return <></>; }

    const bgChange = () => {
        bgColor === "#ebfbd7" ? setBgColor("white") : setBgColor("#ebfbd7");
    };
   
    const change = () => {
        color === "white" ? setColor("#05ae24") : setColor("white");
    };

    const ckChange = () => {
        check === "출석확인" ? setCheck("출석취소") : setCheck("출석확인");
        ckColor === "white" ? setCkColor("black") : setCkColor("white");
    };

    return (
        <Box>
            <Grid width="540px" height="129px">
                <MyImage src="https://ifh.cc/g/qT8V9W.jpg"/>
                <img src="https://ifh.cc/g/fkqsm3.png"/>
            </Grid>
            
            <div>
                2022.04.27. 10:00 토 벚꽃과 야경 러닝 명소  3/10
            </div>
  
            <Leader>
                <MyImage src="https://ifh.cc/g/qT8V9W.jpg"/>
                <Text bold size="16px">
                    김다운
                </Text>
                <Text bold size="16px" color="#32aa3a">
                    크루장
                </Text>
            </Leader>
           {/* {check_list?.applyUser?.user.map((user, index) => (
               <UserBox key={index} bgColor={bgColor} onClick={bgChange} >             
                <MyImage src={user.profileUrl}/>
                <Text bold size="16px">
                    {user.nickname}
                </Text>
                <Button color={color} ckColor={ckColor} onClick={() => {
                  change();
                  ckChange();
                }}>
                   {check}
                </Button>
            </UserBox>
           ))} */}
            
            
        </Box>
        
    );
};

const Box = styled.div`
  height: 1000px;
  width: 540px;
  border: 1px solid #ccc;
  margin: 100px auto 30px auto;
`;

const Leader = styled.div`
  width: 500px;
  height: 98px;
  margin: 16px 0;
  padding: 0px 21px 0px 19px;
  display: flex;
  background-color: #ebfbd7;
`;

const MyImage = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 50%
`;

const UserBox = styled.div`
  width: 500px;
  height: 98px;
  margin: 16px 0;
  padding: 0px 21px 0px 19px;
  display: flex;
  background-color: ${props => props.bgColor};
`;

const Button = styled.button`
  width: 104px;
  height: 44px;
  margin: 26px 21px 26px 53px;
  padding: 11px 23px 11px 22px;
  border-radius: 10px;
  border: none;
  background-color: ${props => props.color};
  color: ${props => props.ckColor};
`;

export default Check;