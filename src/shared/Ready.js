import React from "react";
import styled from "styled-components";
import errorPage from "../assets/errorPage.png";
import { Text } from "../elements";
import { history } from "../redux/configureStore";

const Ready = () => {
  return (
    <Wrap>
      <ErrImg src={errorPage}></ErrImg>
      <Text size="30px" bold margin="0">
        <span style={{ color: "#68F99E" }}>이RUN 저RUN</span> 페이지
        준비중입니다.
      </Text>
      <Btn
        onClick={() => {
          history.push("/");
        }}
      >
        홈으로 돌아가기
      </Btn>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrImg = styled.img`
  width: 386px;
  height: 212px;
  margin: 236px auto 40px auto;
`;

const Btn = styled.button`
  cursor: pointer;
  width: 200px;
  height: 56px;
  background: #030c37;
  border-radius: 6px;
  border: none;
  color: #68f99e;
  font-size: 18px;
  font-weight: 700;
  margin: 64px 0 320px 0;
  :hover {
    box-shadow: 0 0 4px #030c37;
    font-size: 19px;
  }
`;

export default Ready;
