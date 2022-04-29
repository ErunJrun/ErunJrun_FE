import React from "react";
import Weather from "../components/Weather";
import Banner from "../components/Banner";
import MGroupRunning from "../components/MGroupRunning";

const Main = () => {
  return (
    <div>
      <Banner/>
      <Weather/>
      <MGroupRunning/>
    </div>
  );
};

export default Main;
