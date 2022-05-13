import React from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { Grid } from "../elements";

const Footer = () => {
  return (
    <HeaderBox>
      <Grid maxWidth="1200px">
        <Grid
          display="flex"
          maxWidth="685px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Logo
            onClick={() => {
              history.push("/");
            }}
          >
            <img src="https://ifh.cc/g/fkqsm3.png" />
          </Logo>
          <Btn
            onClick={() => {
              history.push("/serviceInfo");
            }}
          >
            서비스 소개
          </Btn>
          <Btn
            onClick={() => {
              history.push("/privacyPolicy");
            }}
          >
            개인정보처리방침
          </Btn>
          <Btn
            onClick={() => {
              history.push("/serviceTerms");
            }}
          >
            이용약관
          </Btn>
          <Btn
            onClick={() => {
              history.push("/contact");
            }}
          >
            Contact
          </Btn>
        </Grid>
      </Grid>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  display: flex;
  height: 216px;
  background-color: #030c37;
  align-items: center;
  margin-top: auto;
  justify-content: center;
`;

const Logo = styled.div`
  max-width: 128px;
  width: 100%;
  max-height: 71.1px;
  height: 100%;
  margin-right: 20px;
  cursor: pointer;
`;

const Btn = styled.button`
  cursor: pointer;
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
