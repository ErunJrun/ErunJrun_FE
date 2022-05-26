import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// 라이브러리, 패키지
import styled from "styled-components";
import { Text } from "../../elements";
import { history } from "../../redux/configureStore";
import { logoutDB } from "../../redux/modules/user";

// 모달
import ModalPortal from "./ModalPortal";

import AlarmStart from "../../components/alarm/AlarmStart";
import AlarmComment from "../../components/alarm/AlarmComment";
import AlarmUpdate from "../../components/alarm/AlarmUpdate";

import { useMediaQuery } from "react-responsive";

const AlarmModal = ({ onClose }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const alarmList = useSelector((state) => state.user.alarm);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <ModalPortal>
          <BackgroundMob
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <ContentMob
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Text size="12px" bold margin="0 0 16px 0">
                알림
              </Text>
              {alarmList?.data?.length === {}
                ? null
                : alarmList?.data?.map((alarm, idx) => {
                    if (alarm.category === "start" && alarm.role === "host") {
                      return (
                        <AlarmStart
                          key={idx}
                          category={"start"}
                          role={"host"}
                          {...alarm}
                          onClose={onClose}
                        />
                      );
                    }

                    if (
                      alarm.category === "start" &&
                      alarm.role === "attendance"
                    ) {
                      return (
                        <AlarmStart
                          key={idx}
                          category={"start"}
                          role={"attendance"}
                          {...alarm}
                        />
                      );
                    }

                    if (alarm.category === "Dday") {
                      return (
                        <AlarmStart key={idx} category={"dDay"} {...alarm} />
                      );
                    }

                    if (alarm.category === "end" && alarm.role === "host") {
                      return (
                        <AlarmStart
                          key={idx}
                          category={"end"}
                          role={"host"}
                          {...alarm}
                        />
                      );
                    }

                    if (
                      alarm.category === "end" &&
                      alarm.role === "attendance"
                    ) {
                      return (
                        <AlarmStart
                          key={idx}
                          category={"end"}
                          role={"attendance"}
                          {...alarm}
                        />
                      );
                    }

                    if (alarm.category === "comment") {
                      return (
                        <AlarmComment
                          key={idx}
                          category={"comment"}
                          {...alarm}
                        />
                      );
                    }

                    if (alarm.category === "recomment") {
                      return (
                        <AlarmComment
                          key={idx}
                          category={"recomment"}
                          {...alarm}
                        />
                      );
                    }

                    if (alarm.category === "update") {
                      return (
                        <AlarmUpdate key={idx} category={"update"} {...alarm} />
                      );
                    }

                    if (alarm.category === "delete") {
                      return (
                        <AlarmUpdate key={idx} category={"delete"} {...alarm} />
                      );
                    }
                  })}
            </ContentMob>
          </BackgroundMob>
        </ModalPortal>
      </>
    );
  }

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
            <Text size="18px" bold margin="0 0 24px -0">
              알림
            </Text>
            {alarmList?.data?.length === {}
              ? null
              : alarmList?.data?.map((alarm, idx) => {
                  if (alarm.category === "start" && alarm.role === "host") {
                    return (
                      <AlarmStart
                        key={idx}
                        category={"start"}
                        role={"host"}
                        {...alarm}
                        onClose={onClose}
                      />
                    );
                  }

                  if (
                    alarm.category === "start" &&
                    alarm.role === "attendance"
                  ) {
                    return (
                      <AlarmStart
                        key={idx}
                        category={"start"}
                        role={"attendance"}
                        {...alarm}
                      />
                    );
                  }

                  if (alarm.category === "Dday") {
                    return (
                      <AlarmStart key={idx} category={"dDay"} {...alarm} />
                    );
                  }

                  if (alarm.category === "end" && alarm.role === "host") {
                    return (
                      <AlarmStart
                        key={idx}
                        category={"end"}
                        role={"host"}
                        {...alarm}
                      />
                    );
                  }

                  if (alarm.category === "end" && alarm.role === "attendance") {
                    return (
                      <AlarmStart
                        key={idx}
                        category={"end"}
                        role={"attendance"}
                        {...alarm}
                      />
                    );
                  }

                  if (alarm.category === "comment") {
                    return (
                      <AlarmComment key={idx} category={"comment"} {...alarm} />
                    );
                  }

                  if (alarm.category === "recomment") {
                    return (
                      <AlarmComment
                        key={idx}
                        category={"recomment"}
                        {...alarm}
                      />
                    );
                  }

                  if (alarm.category === "update") {
                    return (
                      <AlarmUpdate key={idx} category={"update"} {...alarm} />
                    );
                  }

                  if (alarm.category === "delete") {
                    return (
                      <AlarmUpdate key={idx} category={"delete"} {...alarm} />
                    );
                  }
                })}
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

const BackgroundMob = styled.div`
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
  transition: 4s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  z-index: 205;
  width: 400px;
  height: 472px;
  border: 1px solid rgba(149, 149, 149, 0.25);
  background: #ffffff;
  box-shadow: 3px 8px 17px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  position: absolute;
  top: 70px;
  left: 56%;
  padding: 24px 32px;
  overflow: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background-color: gray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transition;
  }
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

const ContentMob = styled.div`
  transition: 4s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  z-index: 205;
  width: 249px;
  height: 265px;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  box-shadow: 3px 8px 17px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  position: absolute;
  top: 6%;
  left: 32%;
  padding: 14px 16px;
  overflow: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background-color: gray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transition;
  }
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

export default AlarmModal;
