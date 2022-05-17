import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "../components/main/Banner";
import MGroupRunning from "../components/main/MGroupRunning";

const Main = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Banner />
      <MGroupRunning />
    </div>
  );
};

export default Main;
