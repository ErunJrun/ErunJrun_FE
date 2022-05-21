import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileDB, getMyRunningDB } from "../redux/modules/mypage";
import Profile from "../components/myPage/Profile";
import HostEvaluation from "../components/myPage/HostEvaluation";
import styled from "styled-components";
import { Text, Grid } from "../elements";
import Tabs from "../components/myPage/Tabs";
import { getCookie } from "../shared/Cookie";
import { useMediaQuery } from "react-responsive";

const Mypage = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;

  const isLogin = useSelector((state) => state.user.isLogin);
  const token = getCookie("accessToken");

  useEffect(() => {
    dispatch(getProfileDB(userId));
  }, []);

  if(isMobile) {
    return (
      <Grid width="100%">
        <Profile userId={userId} />
        <HostEvaluation/>
        {/* {MyId === userId ? <Schedule userId={userId} /> : null} */}
        {/* <Tabs /> */}
      </Grid>
    );
  }

  return (
    <Grid width="1200px" margin="auto">
      <Profile userId={userId} />
      <HostEvaluation/>
      {/* {MyId === userId ? <Schedule userId={userId} /> : null} */}
      <Tabs />
    </Grid>
  );
};


export default Mypage;
