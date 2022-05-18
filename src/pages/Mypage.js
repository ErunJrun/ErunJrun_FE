import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileDB, getMyRunningDB } from "../redux/modules/mypage";
import Profile from "../components/myPage/Profile";
import Schedule from "../components/myPage/Schedule";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import Group from "../components/myPage/Group";
import MyGroup from "../components/myPage/MyGroup";
import { Text, Grid } from "../elements";
import Tabs from "../components/myPage/Tabs";
import { getCookie } from "../shared/Cookie";

const Mypage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  const userId = params.userId;
  console.log(userId);
  const MyId = localStorage.getItem("userId");

  const isLogin = useSelector((state) => state.user.isLogin);
  const token = getCookie("accessToken");

  useEffect(() => {
    dispatch(getProfileDB(userId));
  }, []);

  // useEffect(() => {
  //     if(isLogin || token) history.push("/");
  //   }, [])

  return (
    <Grid width="1200px" margin="auto">
      <Profile userId={userId} />
      {MyId === userId ? <Schedule userId={userId} /> : null}

      <Tabs />
    </Grid>
  );
};

const Hr = styled.div`
  width: 1240px;
  height: 3px;
  background-color: #bbb;
`;

const Btn = styled.button`
  width: 184px;
  height: 40px;
  margin: 20px 20px 30px 0;
  padding-top: 1px;
  border-radius: 50px;
  border: none;
  background-color: #95fbc7;
  color: #030c37;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
export default Mypage;
