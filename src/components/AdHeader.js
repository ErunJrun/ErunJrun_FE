import React, { useState } from "react";
import { Grid, Text } from "../elements";
import { useMediaQuery } from "react-responsive";
import { history } from "../redux/configureStore";

const AdHeader = () => {
  const [header, setHeader] = useState(true);

  const closeHeader = () => {
    setHeader(false);
  };

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  if (isMobile) {
    return (
      <>
        {header ? (
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
              <Text
                margin="0"
                color="white"
                regular
                size="12px"
                _onClick={() => {
                  history.push("/edit");
                }}
              >
                지금 <span style={{ fontWeight: "600" }}>휴대폰 인증</span>하고
                알림을 받아보세요! &nbsp; >
              </Text>
              <Text
                regular
                margin="0"
                color="white"
                size="12px"
                _onClick={closeHeader}
              >
                x
              </Text>
            </Grid>
          </Grid>
        ) : null}
      </>
    );
  }

  return (
    <>
      {header ? (
        <Grid
          bg="#000"
          width="1925px"
          height="54px"
          padding="10px 838px"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Grid
            width="725px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              margin="0"
              color="white"
              regular
              size="18px"
              _onClick={() => {
                history.push("/edit");
              }}
            >
              지금 <span style={{ fontWeight: "600" }}>휴대폰 인증</span>하고
              알림을 받아보세요! >
            </Text>
            <Text
              regular
              margin="-2px -470px 0 0"
              color="#999"
              size="25px"
              _onClick={closeHeader}
            >
              x
            </Text>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default AdHeader;
