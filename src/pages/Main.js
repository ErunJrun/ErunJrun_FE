import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Banner from "../components/main/Banner";
import MGroupRunning from "../components/main/MGroupRunning";
import { useMediaQuery } from "react-responsive";

const Main = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const from = localStorage.getItem("from");
  console.log(from);

  if (from) {
    return <Redirect to={{ pathname: from }}></Redirect>;
  }

  if (isMobile) {
    return <p>모바일</p>;
  }

  return (
    <div>
      <Banner />
      <MGroupRunning />
    </div>
  );
};

export default Main;
