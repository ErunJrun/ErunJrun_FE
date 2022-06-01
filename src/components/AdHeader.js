import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

//Redux
import { history } from "../redux/configureStore";

//elements
import { Grid, Text } from "../elements";

const AdHeader = () => {
  const [header, setHeader] = useState(true);

  const closeHeader = () => {
    setHeader(false);
  };

  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  if (isMobile) {
    return (
      <>
        {header ? (
          <Grid
            bg="#030C37"
            width="100%"
            height="36px"
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Grid
              width="375px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              padding="0 15px"
            >
              <Text
                margin="0"
                color="white"
                regular
                size="12px"
                cursor="pointer"
                _onClick={() => {
                  history.push("/edit");
                  closeHeader();
                }}
              >
                지금 <span style={{ fontWeight: "600" }}>휴대폰 인증</span>하고
                알림을 받아보세요! &nbsp; >
              </Text>
              <Text
                cursor="pointer"
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
          width="100%"
          height="54px"
          justifyContent="center"
          alignItems="center"
          display="flex"
          zIndex="1"
        >
          <Grid
            width="1200px"
            margin="0 auto"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              textalign
              width="auto"
              margin="0 auto"
              color="white"
              regular
              size="18px"
              cursor="pointer"
              _onClick={() => {
                history.push("/edit");
                closeHeader();
              }}
              hover="color:#68F99E;"
            >
              지금 <span style={{ fontWeight: "600" }}>휴대폰 인증</span>하고
              알림을 받아보세요!{"     "} >
            </Text>
            <Text
              width="auto"
              height="auto"
              cursor="pointer"
              regular
              margin="0"
              color="#999"
              size="17px"
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
