import React from "react";
import Profile from "../components/myPage/Profile";
import Schedule from "../components/myPage/Schedule";
import RunningBox from "../components/myPage/RunningBox";

const Mypage = () => {
  return (
    <div>
      Mypage 
        <Profile/>
        <Schedule/>
        <RunningBox/>
    </div>
  );
};

export default Mypage;
