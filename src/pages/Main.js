import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Banner from "../components/main/Banner";
import IntroModal from "../components/main/IntroModal";
import MGroupRunning from "../components/main/MGroupRunning";
import { loginCheckDB } from "../redux/modules/user";
import { getCookie, setCookie } from "../shared/Cookie";

const Main = () => {
  const dispatch = useDispatch();

  const from = localStorage.getItem("from");
  const userId = localStorage.getItem("userId");
  const firstLogin = localStorage.getItem("firstLogin");
  const introModal = getCookie("introModal");

  useEffect(() => {
    if (userId) dispatch(loginCheckDB());
  }, [userId]);

  // useEffect(() => {
  //   if (!introModal) setCookie("introModal", true);
  // }, []);

  if (from) {
    return <Redirect to={{ pathname: from }}></Redirect>;
  }

  if (!from) {
    return (
      <>
        <Banner />
        <MGroupRunning />
        {introModal === "true" ||
        introModal === true ||
        introModal === undefined ? (
          <IntroModal />
        ) : null}
      </>
    );
  }
};

export default Main;
