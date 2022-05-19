import React from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import { useMediaQuery } from "react-responsive";

import courseIcon from "../assets/footer/courseIcon.png";
import groupIcon from "../assets/footer/groupIcon.png";
import homeIcon from "../assets/footer/homeIcon.png";
import mypageIcon from "../assets/footer/mypageIcon.png";

const Footer = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const userId = localStorage.getItem("userId");

  if (isMobile) {
    return (
      <>
        <Grid
          zIndex="2"
          bg="white"
          justifyContent="center"
          position="fixed"
          bottom="0"
          left="0"
          width="100%"
          height="59px"
          display="flex"
          padding="11px 42px"
          boxShadow="0px -4px 6px rgba(227, 227, 227, 0.4);"
        >
          <Grid
            width="375px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid
              display="flex"
              alignItems="center"
              width="auto"
              flexDirection="column"
            >
              <FooterIcon
                src={homeIcon}
                onClick={() => {
                  history.push("/");
                }}
              />
              <Text margin="0" width="auto" color="#B8B8B8" size="10px">
                Home
              </Text>
            </Grid>

            <Grid
              display="flex"
              alignItems="center"
              width="auto"
              flexDirection="column"
            >
              <FooterIcon
                src={groupIcon}
                onClick={() => {
                  history.push("/groupfeed");
                }}
              />
              <Text margin="0" color="#B8B8B8" size="10px">
                그룹 러닝
              </Text>
            </Grid>
            <Grid
              display="flex"
              alignItems="center"
              width="auto"
              flexDirection="column"
            >
              <FooterIcon
                src={courseIcon}
                onClick={() => {
                  history.push("/coursefeed");
                }}
              />
              <Text margin="0" color="#B8B8B8" size="10px">
                추천 코스
              </Text>
            </Grid>
            <Grid
              display="flex"
              alignItems="center"
              width="auto"
              flexDirection="column"
            >
              <FooterIcon
                src={mypageIcon}
                onClick={() => {
                  history.push(`/mypage/${userId}`);
                }}
              />
              <Text margin="0" color="#B8B8B8" size="10px">
                마이페이지
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }

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
  font-family: "Spoqa Han Sans Neo", "sans-serif";
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

const FooterIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export default Footer;
