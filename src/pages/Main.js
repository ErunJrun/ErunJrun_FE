import React from "react";
import Weather from "../components/main/Weather";
import Banner from "../components/main/Banner";
import MGroupRunning from "../components/main/MGroupRunning";
import styled from "styled-components";

const Main = () => {
  return (
    <div>
      <Box>
        <Banner/>
        <Weather/>
      </Box>
      <MGroupRunning/>
    </div>
  );
};

const Box = styled.div`
  display: flex;
  
`;
export default Main;