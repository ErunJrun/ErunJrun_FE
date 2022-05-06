import React from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import Modal from "./main/Modal";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const Header = () => {
  const is_login = useSelector((state) => state.user.isLogin);

  if (is_login) {
    return (
      <HeaderBox>
        <Box1>
          <Logo
            onClick={() => {
              history.push("/");
            }}
          >
          <img src="https://ifh.cc/g/fkqsm3.png"/>
          </Logo>
          <Btn
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </Btn>
          <Btn
            onClick={() => {
              history.push("/groupfeed");
            }}
          >
            그룹러닝
          </Btn>
          <Btn
            onClick={() => {
              history.push("/coursefeed");
            }}
          >
            코스추천
          </Btn>
        </Box1>

        <Box2>
          <IoMdNotificationsOutline size="35px" color="#BFCED1"/>
          <Modal />
        </Box2>
      </HeaderBox>
    );
  }

  return (
    <HeaderBox>
      <Logo
        onClick={() => {
          history.push("/");
        }}
      >
        <img src="https://ifh.cc/g/fkqsm3.png"/>
      </Logo>
      <Btn
        onClick={() => {
          history.push("/");
        }}
      >
        Home
      </Btn>
      <Btn
        onClick={() => {
          history.push("/groupfeed");
        }}
      >
        그룹러닝
      </Btn>
      <Btn
        onClick={() => {
          history.push("/coursefeed");
        }}
      >
        코스추천
      </Btn>
      <Box2>
        <Btn
          onClick={() => {
            history.push("/login");
          }}
        >
          로그인
        </Btn>
      </Box2>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  display: flex;
  height:90px;
  background-color: #030c37;
  align-items: center; 
`;

const Logo = styled.div`
  margin-left: 9%;
`;

const Box1 = styled.div`
  display: flex;
  align-items: center; 
  margin-left: 9%
`;

const Box2 = styled.div`
  display: flex;
  align-items: center; 
  margin-left: 45%
`;

const Btn = styled.button`
width:100px;
  border: none;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 0.95rem;
  color: #ffffff;
  background-color: transparent;
  font-weight: 1000;
  text-align: center;
  text-decoration: none;
  margin-left: 30px;
  :hover {
    color: #68f99e;
  }
`;

export default Header;
