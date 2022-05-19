import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Banner from "../components/main/Banner";
import MGroupRunning from "../components/main/MGroupRunning";

const Main = () => {
  const dispatch = useDispatch();

  const from = localStorage.getItem("from");
  console.log(from);

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
