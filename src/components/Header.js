import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements";

const Header = () => {
  return (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="131px"
        bg="#C4C4C4"
      >
        <Text bold size="30px" color="black" textalign="center">
          헤더
        </Text>
      </Grid>
    </>
  );
};

export default Header;
