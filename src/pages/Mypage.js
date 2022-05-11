import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDB } from "../redux/modules/mypage"
import Profile from "../components/myPage/Profile";
import Schedule from "../components/myPage/Schedule";
import { Text, Grid } from "../elements"
import Tabs from "../components/myPage/Tabs";

const Mypage = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

    useEffect(() => {
      dispatch(getProfileDB(userId));
    }, []);
  
  return (
    <Grid  width="1200px" margin="auto">
        <Profile userId={userId}/>
        <Schedule userId={userId}/>   
        <Tabs/>
    </Grid>  
    
  );
};

export default Mypage;
