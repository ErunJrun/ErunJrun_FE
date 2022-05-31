import React, { useEffect, useState } from "react";

//Redux
import { useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";
import { logoutDB } from "../../redux/modules/user";
import {
  getProfileDB,
  getRunningDB,
  getMyRunningDB,
} from "../../redux/modules/mypage";

//css, library, package
import styled from "styled-components";

//Modal
import ModalPortal from "./ModalPortal";

//elements
import { Text } from "../../elements";

const ProfileModal = ({ onClose }) => {
  const userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
                dispatch(getProfileDB(userId));
                dispatch(getRunningDB(userId));
                dispatch(getMyRunningDB(userId));
                history.push(`/mypage/${userId}`);
                onClose();
              }}
              margin="16px 0 15px 24px"
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
              margin="15px 0 16px 24px"
              size="18px"
              regular
            >
              계정설정
            </Text>
            <Hr />
            <Text
              cursor="pointer"
              _onClick={() => {
                dispatch(logoutDB());
                onClose();
              }}
              margin="0px 0 16px 24px"
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
  margin: 0 auto;
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
  top: 6%;
  left: 73%;
  padding: 16px 0;

  animation: scale-up-tr 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;

  @keyframes scale-up-tr {
    0% {
      transform: scale(0.5);
      transform-origin: 100% 0%;
    }
    100% {
      transform: scale(1);
      transform-origin: 100% 0%;
    }
  }
`;

const Hr = styled.div`
  border-top: 1px solid #e4e4e4;
  width: 158px;
  margin: 0px 0px 12px 0px;
`;

export default ProfileModal;
