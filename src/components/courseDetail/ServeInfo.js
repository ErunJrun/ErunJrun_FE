import React from "react";
import { useSelector } from "react-redux";
import { Grid, Text } from "../../elements";
import styled from "styled-components";

import dayjs from "dayjs";

import { useMediaQuery } from "react-responsive";

const ServeInfo = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const detailCourse = useSelector((state) => state.course.detail);

  if (isMobile) {
    return (
      <>
        <Grid
          width="343px"
          border="1px solid #DDDDDD"
          borderRadius="3px"
          margin="0 auto 60px auto"
          display="flex"
          padding="16px"
        >
          <Grid display="flex" margin="0" flexDirection="column">
            <Grid width="auto" display="flex" margin="0 0 16px 0">
              <Text margin="0 8px 0 0" size="12px" color="#7B7B7B">
                주차시설
              </Text>
              <Text margin="0" size="12px">
                {detailCourse?.parking}
              </Text>
            </Grid>

            <Grid width="auto" display="flex" margin="0">
              <Text margin="0 8px 0 0" size="12px" color="#7B7B7B">
                짐 보관{"    "}
              </Text>
              <Text margin="0" size="12px">
                {detailCourse?.baggage}
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid margin="0 auto 47px auto">
        <Grid display="flex" margin="0 0 16px 0">
          <Grid width="auto" display="flex" margin="0 64px 0 0">
            <Text margin="0 16px 0 0" size="16px" color="#818181">
              주차 시설
            </Text>
            <Text bold color="" margin="0" size="16px">
              {detailCourse?.parking}
            </Text>
          </Grid>

          <Grid width="auto" display="flex" margin="0 64px 0 0">
            <Text margin="0 16px 0 0" size="16px" color="#818181">
              짐 보관
            </Text>
            <Text bold margin="0" size="16px">
              {detailCourse?.baggage}
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ServeInfo;
