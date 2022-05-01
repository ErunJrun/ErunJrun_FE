import React from 'react';
import { history } from "../../redux/configureStore";
import styled from "styled-components";

const MGroupRunning = () => {
    return (
        <div>
            <h2>모집중인 그룹 러닝</h2>
            <Btn onClick={() => {history.push("/main");}}>
                더보기
            </Btn>
        </div>
    );
};

const Btn = styled.button`
  //border: none;
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