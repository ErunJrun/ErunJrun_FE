import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Banner from "../components/main/Banner";
import MGroupRunning from "../components/main/MGroupRunning";
import { loginCheckDB } from "../redux/modules/user";

const Main = () => {
  const dispatch = useDispatch();

  const from = localStorage.getItem("from");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) dispatch(loginCheckDB());
  }, [userId]);

  if (from) {
    return <Redirect to={{ pathname: from }}></Redirect>;
  }

  return (
    <>
      <Banner />
      <MGroupRunning />
    </>
  );
};

export default Main;
