import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { loginCheckDB } from "../redux/modules/user";

//cookie
import { getCookie } from "../shared/Cookie";

//components
import Banner from "../components/main/Banner";
import IntroModal from "../components/main/IntroModal";
import MGroupRunning from "../components/main/MGroupRunning";

const Main = () => {
  const dispatch = useDispatch();

  const from = localStorage.getItem("from");
  const userId = localStorage.getItem("userId");

  const introModal = getCookie("introModal");

  useEffect(() => {
    if (userId) dispatch(loginCheckDB());
  }, [userId]);

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
