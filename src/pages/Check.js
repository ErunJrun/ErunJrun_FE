import React, { useState } from 'react';
import { Text } from "../elements"
import styled from "styled-components";

const Check = () => {

    const [color, setColor] = useState("yellow");

    const change = () => {
        color === "yellow" ? setColor("red") : setColor("yellow");
        //console.log(change);
    };
   

    return (
        <Box>
            <div>
                <img src="https://ifh.cc/g/fkqsm3.png"/>
                이RUN저RUN
            </div>
            <div>
                2022.04.27. 10:00 토 벚꽃과 야경 러닝 명소  3/10
            </div>
            <div>
                <MyImage src="https://ifh.cc/g/qT8V9W.jpg"/>
                <Text bold size="16px">
                    김다운
                </Text>
                <Text bold size="16px">
                    크루장
                </Text>
            </div>
            <hr/>
            <div>
                <MyImage src="https://ifh.cc/g/40ohfh.jpg"/>
                <Text bold size="16px">
                    누룽지
                </Text>
                <Button color={color} onClick={change}>
                   출석
                </Button>
            </div>
            <button>
                출석체크 완료
            </button>
        </Box>
        
    );
};

const Box = styled.div`
  height: 1000px;
  width: 540px;
  border: 1px solid #ccc;
  margin: 100px auto 30px auto;
`;

const MyImage = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 50%
`;

const Button = styled.button`
background-color: ${props => props.color};
padding: 10px 30px;
`;

export default Check;