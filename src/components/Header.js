import React, { useEffect, useState } from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import { Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { _getAlarmDB, _readAlarmDB } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";
import headerLogo from "../assets/header/headerLogo.png";
import headerLogoMobile from "../assets/header/headerLogoMobile.png";

import alarmIcon from "../assets/header/alarmIcon.png";
import alarmIconMob from "../assets/header/alarmIconMob.png";

import AlarmModal from "../shared/modal/AlaramModal";
import Modal from "./Modal";

import { useLocation } from "react-router-dom";

import { useMediaQuery } from "react-responsive";
import AdHeader from "./AdHeader";

const Header = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.isLogin);
  const alarmList = useSelector((state) => state.user.alarm);

  const path = useLocation().pathname;

  const isHome = path === "/";
  const isGroup = path === "/groupfeed";
  const isCourse = path === "/coursefeed";
  const isLoginInfo = path === "/loginInfo";

  const [alarmOpen, setAlarmOpen] = useState(false);

  console.log(alarmList);

  const alarmToggle = () => {
    setAlarmOpen(!alarmOpen);
  };

  const readAlarm = () => {
    dispatch(_readAlarmDB());
    dispatch(_getAlarmDB());
  };

  const token = getCookie("accessToken");

  useEffect(() => {
    if (token) {
      dispatch(_getAlarmDB());
    }
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(_getAlarmDB());
    }
  }, [token]);

  if (isMobile) {
    return (
      <HeaderBoxMob>
        <Grid display="flex">
          {isLoginInfo ? null : <AdHeader />}
          <Grid
            height="54px"
            margin="0"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
            bg="white"
            borderBottom="1px solid #F0F0F0"
          >
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="375px"
              padding="0 15px"
            >
              <Grid display="flex" alignItems="center" width="auto">
                <HeaderCiMob
                  onClick={() => {
                    history.push("/");
                  }}
                  src={headerLogoMobile}
                />
              </Grid>
              {token ? (
                <Grid
                  position="relative"
                  zIndex="200"
                  width="auto"
                  margin="0"
                  height="auto"
                  display="flex"
                >
                  <AlarmIconMob
                    src={alarmIconMob}
                    onClick={() => {
                      readAlarm();
                      alarmToggle();
                    }}
                  ></AlarmIconMob>
                  {alarmList?.unreadCount === 0 || alarmList === [] ? null : (
                    <BadgeMob />
                  )}

                  {alarmOpen ? (
                    <AlarmModal onClose={alarmToggle}></AlarmModal>
                  ) : null}
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </HeaderBoxMob>
    );
  }

  if (is_login) {
    return (
      <>
        {path === "/loginInfo" ? null : (
          <>
            <AdHeader />
            <HeaderBox id="1">
              <Grid
                height="auto"
                margin="0 auto 0 360px"
                width="1200px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                position="relative"
              >
                <Grid
                  display="flex"
                  alignItems="center"
                  width="473px"
                  justifyContent="space-between"
                >
                  <Logo
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    <HeaderCi src={headerLogo} />
                  </Logo>

                  {isHome ? (
                    <>
                      <Btn
                        onClick={() => {
                          history.push("/");
                        }}
                      >
                        Home
                      </Btn>
                      <Btn
                        style={{ color: "#687096" }}
                        onClick={() => {
                          history.push("/groupfeed");
                        }}
                      >
                        그룹 러닝
                      </Btn>
                      <Btn
                        style={{ color: "#687096" }}
                        onClick={() => {
                          history.push("/coursefeed");
                        }}
                      >
                        추천 코스
                      </Btn>
                    </>
                  ) : isGroup ? (
                    <>
                      <Btn
                        onClick={() => {
                          history.push("/");
                        }}
                        style={{ color: "#687096" }}
                      >
                        Home
                      </Btn>
                      <Btn
                        onClick={() => {
                          history.push("/groupfeed");
                        }}
                      >
                        그룹 러닝
                      </Btn>
                      <Btn
                        style={{ color: "#687096" }}
                        onClick={() => {
                          history.push("/coursefeed");
                        }}
                      >
                        추천 코스
                      </Btn>
                    </>
                  ) : isCourse ? (
                    <>
                      <Btn
                        onClick={() => {
                          history.push("/");
                        }}
                        style={{ color: "#687096" }}
                      >
                        Home
                      </Btn>
                      <Btn
                        style={{ color: "#687096" }}
                        onClick={() => {
                          history.push("/groupfeed");
                        }}
                      >
                        그룹 러닝
                      </Btn>
                      <Btn
                        onClick={() => {
                          history.push("/coursefeed");
                        }}
                      >
                        추천 코스
                      </Btn>
                    </>
                  ) : (
                    <>
                      <Btn
                        onClick={() => {
                          history.push("/");
                        }}
                        style={{ color: "#687096" }}
                      >
                        Home
                      </Btn>
                      <Btn
                        style={{ color: "#687096" }}
                        onClick={() => {
                          history.push("/groupfeed");
                        }}
                      >
                        그룹 러닝
                      </Btn>
                      <Btn
                        style={{ color: "#687096" }}
                        onClick={() => {
                          history.push("/coursefeed");
                        }}
                      >
                        추천 코스
                      </Btn>
                    </>
                  )}
                </Grid>

                <Grid
                  display="flex"
                  width="140px"
                  alignItems="center"
                  justifyContent="right"
                >
                  <Grid
                    margin="0 24px 0 0"
                    height="auto"
                    display="flex"
                    width="29px"
                  >
                    <AlarmIcon
                      src={alarmIcon}
                      onClick={() => {
                        readAlarm();
                        alarmToggle();
                      }}
                    ></AlarmIcon>
                    {alarmList?.unreadCount === 0 || alarmList === [] ? null : (
                      <Badge>
                        {alarmList?.unreadCount ? alarmList?.unreadCount : null}
                      </Badge>
                    )}

                    {alarmOpen ? (
                      <AlarmModal onClose={alarmToggle}></AlarmModal>
                    ) : null}
                  </Grid>

                  <Modal />
                </Grid>
              </Grid>
            </HeaderBox>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {path === "/loginInfo" ? null : (
        <HeaderBox id="1">
          <Grid width="1200px" display="flex" justifyContent="space-between">
            <Grid
              display="flex"
              alignItems="center"
              width="473px"
              justifyContent="space-between"
            >
              <Logo
                onClick={() => {
                  history.push("/");
                }}
              >
                <HeaderCi src={headerLogo} />
              </Logo>
              {isHome ? (
                <>
                  <Btn
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    Home
                  </Btn>
                  <Btn
                    style={{ color: "#687096" }}
                    onClick={() => {
                      history.push("/groupfeed");
                    }}
                  >
                    그룹 러닝
                  </Btn>
                  <Btn
                    style={{ color: "#687096" }}
                    onClick={() => {
                      history.push("/coursefeed");
                    }}
                  >
                    추천 코스
                  </Btn>
                </>
              ) : isGroup ? (
                <>
                  <Btn
                    onClick={() => {
                      history.push("/");
                    }}
                    style={{ color: "#687096" }}
                  >
                    Home
                  </Btn>
                  <Btn
                    onClick={() => {
                      history.push("/groupfeed");
                    }}
                  >
                    그룹 러닝
                  </Btn>
                  <Btn
                    style={{ color: "#687096" }}
                    onClick={() => {
                      history.push("/coursefeed");
                    }}
                  >
                    추천 코스
                  </Btn>
                </>
              ) : isCourse ? (
                <>
                  <Btn
                    onClick={() => {
                      history.push("/");
                    }}
                    style={{ color: "#687096" }}
                  >
                    Home
                  </Btn>
                  <Btn
                    style={{ color: "#687096" }}
                    onClick={() => {
                      history.push("/groupfeed");
                    }}
                  >
                    그룹 러닝
                  </Btn>
                  <Btn
                    onClick={() => {
                      history.push("/coursefeed");
                    }}
                  >
                    추천 코스
                  </Btn>
                </>
              ) : (
                <>
                  <Btn
                    onClick={() => {
                      history.push("/");
                    }}
                    style={{ color: "#687096" }}
                  >
                    Home
                  </Btn>
                  <Btn
                    style={{ color: "#687096" }}
                    onClick={() => {
                      history.push("/groupfeed");
                    }}
                  >
                    그룹 러닝
                  </Btn>
                  <Btn
                    style={{ color: "#687096" }}
                    onClick={() => {
                      history.push("/coursefeed");
                    }}
                  >
                    추천 코스
                  </Btn>
                </>
              )}
            </Grid>

            <Btn
              style={{ fontSize: "16px" }}
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </Btn>
          </Grid>
        </HeaderBox>
      )}
    </>
  );
};

const HeaderBox = styled.div`
  display: flex;
  height: 90px;
  background-color: #030c37;
  align-items: center;
  min-width: 1200px;
  justify-content: center;
  position: relative;
`;

const HeaderBoxMob = styled.div`
  display: flex;
  height: 54px;
  background-color: white;
  align-items: center;
  width: 100%;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 2;
  border-bottom: 1px solid #f0f0f0;
`;

const HeaderCi = styled.img`
  width: 140px;
  height: auto;
`;

const HeaderCiMob = styled.img`
  width: 68.8px;
  height: auto;
`;

const AlarmIcon = styled.img`
  width: 28px;
  height: auto;
  cursor: pointer;
`;

const AlarmIconMob = styled.img`
  width: 19px;
  height: auto;
  cursor: pointer;
`;

const Badge = styled.div`
  position: absolute;
  right: 4.9%;
  top: 18px;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  border: none;
  color: black;
  background-color: #68f99e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  padding: 1px;
  box-sizing: border-box;
`;

const BadgeMob = styled.div`
  position: absolute;
  right: 0;
  bottom: 20px;
  border-radius: 100%;
  width: 4px;
  height: 4px;
  border: none;
  color: black;
  background-color: #68f99e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  padding: 1px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  width: 128px;
  height: 71.1px;
  margin-right: 20px;
  cursor: pointer;
`;

const Btn = styled.button`
  cursor: pointer;
  width: auto;
  height: auto;
  border: none;
  font-size: 18px;
  color: #ffffff;
  background-color: transparent;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  :hover {
    color: #68f99e;
  }
`;

export default Header;
