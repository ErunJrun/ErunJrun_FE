import React from 'react';
import { history } from "../../redux/configureStore";
import styled from "styled-components";

const MGroupRunning = () => {
    return (
        <div>
            <Box>
                <h2>그룹 러닝</h2>
                <Btn onClick={() => {history.push("/main");}}>
                    더보기
                </Btn>
            </Box>

            <Box>
                <h2>코스추천</h2>
                <Btn onClick={() => {history.push("/coursefeed");}}>
                    더보기
                </Btn>
            </Box>
        </div>
    );
};

const Box = styled.div`
  padding: 5%;
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
  border: none;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 0.9rem;
  color:#000000;
  background-color: #ffffff;
  font-weight: 1000;
  text-align: center;
  text-decoration: none;
  margin-left: 30px; 
`;

export default MGroupRunning;