import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Banner from "../components/main/Banner";
import IntroModal from "../components/main/IntroModal";
import MGroupRunning from "../components/main/MGroupRunning";
import { loginCheckDB } from "../redux/modules/user";

const Main = () => {
  const dispatch = useDispatch();

  const from = localStorage.getItem("from");
  const userId = localStorage.getItem("userId");
  const firstLogin = localStorage.getItem("firstLogin");
  const introModal = localStorage.getItem("introModal");

  useEffect(() => {
    if (userId) dispatch(loginCheckDB());
  }, [userId]);

  useEffect(() => {
    if (!introModal) {
      localStorage.setItem("introModal", true);
    }
  }, []);

  if (from) {
    return <Redirect to={{ pathname: from }}></Redirect>;
  }

  return (
    <>
      <Banner />
      <MGroupRunning />
      {introModal === "true" || introModal === null ? <IntroModal /> : null}
    </>
  );
};

export default Main;
