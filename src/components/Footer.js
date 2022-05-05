import React from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";

const Footer = () => {

  return (
    <HeaderBox>
        <Box
          onClick={() => {
            history.push("/");
          }}
        >
          <img src="https://ifh.cc/g/fkqsm3.png"/>
        </Box>
        <Btn
          onClick={() => {
            history.push("/");
          }}
        >
          서비스 소개
        </Btn>
        <Btn
          onClick={() => {}}
        >
          개인정보처리방침
        </Btn>
        <Btn
          onClick={() => {}}
        >
          이용약관
        </Btn>
        <Btn
          onClick={() => {}}
        >
          찾아오시는 길
        </Btn>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  display: flex;
  height:214px;
  background-color: #030c37;
  align-items: center; 
`;

const Box = styled.div`
  margin-left: 9%;
`;

const Btn = styled.button`
  border: none;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 0.8rem;
  color: #ffffff;
  background-color: transparent;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  margin-left: 30px;
  :hover {
    color: #68f99e;
  }
`;

export default Footer;
