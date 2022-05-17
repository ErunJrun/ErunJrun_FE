import React, { useState } from "react";
import { useDispatch } from "react-redux";

// 라이브러리, 패키지
import styled from "styled-components";
import { Text } from "../../elements";
import { history } from "../../redux/configureStore";
import { logoutDB } from "../../redux/modules/user";

// 모달
import ModalPortal from "./ModalPortal";

const ProfileModal = ({ onClose }) => {
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const dispatch = useDispatch();

  return (
    <>
      <ModalPortal>
        <Background
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <Content
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Text
              cursor="pointer"
              _onClick={() => {
                history.push(`/mypage/${userId}`);
                onClose();
              }}
              margin="0 0 16px 24px"
              size="18px"
              regular
            >
              마이 페이지
            </Text>
            <Text
              cursor="pointer"
              _onClick={() => {
                history.push("/edit");
                onClose();
              }}
              margin="0 0 0 24px"
              size="18px"
              regular
            >
              계절설정
            </Text>
            <Hr />
            <Text
              cursor="pointer"
              _onClick={() => {
                dispatch(logoutDB());
                onClose();
              }}
              margin="0 0 0 24px"
              size="18px"
              regular
              color="#FF2D55"
            >
              로그아웃
            </Text>
          </Content>
        </Background>
      </ModalPortal>
    </>
  );
};

const Background = styled.div`
  z-index: 206;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  z-index: 205;
  width: 160px;
  height: 165px;
  border: 1px solid rgba(149, 149, 149, 0.25);
  box-shadow: 3px 4px 5px rgba(149, 149, 149, 0.25);
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 81px;
  left: 1380px;
  padding: 16px 0;
`;

const Hr = styled.hr`
  width: 158px;
  height: 0px;
  border: 1px solid rgba(149, 149, 149, 0.25);
  margin: 16px 0;
`;

export default ProfileModal;
