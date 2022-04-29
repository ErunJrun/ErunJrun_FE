import React from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";


const Header = () => {

  return (
    <HeaderBox>
      <div onClick={() => {history.push("/main");}}>이RUN저RUN</div>
      <Btn onClick={() => {history.push("/main");}}>Home</Btn>
      <Btn onClick={() => {history.push("/main");}}>그룹러닝</Btn>
      <Btn onClick={() => {history.push("/coursefeed");}}>코스추천</Btn>
      <IoMdNotifications size="20px" />
      <div onClick={() => {history.push("mypage");}}>
        <FaUser/>
      </div>
      
    </HeaderBox>
    
  );
};

const HeaderBox = styled.div`
  display: flex;
  padding: 5%;
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
export default Header;
