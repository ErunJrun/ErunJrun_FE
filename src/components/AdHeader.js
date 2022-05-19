import React from "react";
import { Grid, Text } from "../elements";

const AdHeader = () => {
  return (
    <>
      <Grid
        bg="#030C37"
        width="100%"
        height="36px"
        padding="10px 16px"
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <Grid
          width="375px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text margin="0" color="white" regular size="12px">
            지금 <span style={{ fontWeight: "600" }}>휴대폰 인증</span>하고
            알림을 받아보세요! >
          </Text>
          <Text regular margin="0" color="white" size="12px">
            x
          </Text>
        </Grid>
      </Grid>
    </>
  );
};

export default AdHeader;
