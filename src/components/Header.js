import React, { useEffect, useState } from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import Modal from "./main/Modal";
import { Grid, IconButton } from "../elements";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Alarm from "./alarm/Alarm";
import { _getAlarmDB, _readAlarmDB } from "../redux/modules/user";

const Header = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.isLogin);
  const alarmList = useSelector((state) => state.user.alarm);

  const [alarmOpen, setAlarmOpen] = useState(false);
  console.log(alarmOpen);

  const readAlarm = () => {
    setAlarmOpen(!alarmOpen);
    dispatch(_readAlarmDB());
  };

  useEffect(() => {
    dispatch(_getAlarmDB());
  }, []);

  if (is_login) {
    return (
      <HeaderBox id="1">
        <Grid maxWidth="1240px" display="flex" justifyContent="space-between">
          <Grid
            display="flex"
            alignItems="center"
            maxWidth="473px"
            justifyContent="space-between"
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
          </Grid>
          <Grid display="flex" width="auto" alignItems="center">
            <Grid height="auto" display="flex" width="auto">
              <IconButton
                _onClick={() => {
                  readAlarm();
                }}
                alarm
                color="#BFCED1"
                size="35px"
                height="62px"
                padding="28px 0 0 0"
                margin="0"
              ></IconButton>
              {alarmList?.unreadCount !== 0 ? (
                <Badge>
                  {alarmList?.unreadCount ? alarmList?.unreadCount : null}
                </Badge>
              ) : null}

              {alarmOpen ? <Alarm></Alarm> : null}
            </Grid>
            <Modal />
          </Grid>
        </Grid>
      </HeaderBox>
    );
  }

  return (
    <HeaderBox id="1">
      <Grid maxWidth="1240px" display="flex" justifyContent="space-between">
        <Grid
          display="flex"
          alignItems="center"
          maxWidth="473px"
          justifyContent="space-between"
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
        </Grid>

        <Btn
          onClick={() => {
            history.push("/login");
          }}
        >
          로그인
        </Btn>
      </Grid>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  display: flex;
  height: 90px;
  background-color: #030c37;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const Badge = styled.div`
  position: absolute;
  right: 21.5%;
  top: 28px;
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
  width: auto;
  border: none;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  color: #ffffff;
  background-color: transparent;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  :hover {
    color: #68f99e;
  }
`;

export default Header;
