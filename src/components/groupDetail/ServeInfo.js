import React from "react";
import { useSelector } from "react-redux";
import { Grid, Text } from "../../elements";
import styled from "styled-components";

const ServeInfo = () => {
  const detailGroup = useSelector((state) => state.feed.detail);
  const startTime = detailGroup?.datetime?.slice(-7);

  return (
    <>
      <Grid margin="0 auto 47px auto">
        <Grid display="flex" margin="0 0 16px 0">
          <Grid width="auto" display="flex" margin="0 64px 0 0">
            <Text margin="0 16px 0 0" size="16px" color="#818181">
              스탠바이
            </Text>
            <Text bold margin="0" size="16px">
              {detailGroup?.standbyTime}
            </Text>
          </Grid>

          <Grid width="auto" display="flex" margin="0 64px 0 0">
            <Text margin="0 16px 0 0" size="16px" color="#818181">
              출발 시간
            </Text>
            <Text bold color="" margin="0" size="16px">
              {startTime}
            </Text>
          </Grid>

          <Grid width="auto" display="flex" margin="0 64px 0 0">
            <Text margin="0 16px 0 0" size="16px" color="#818181">
              도착 시간
            </Text>
            <Text bold margin="0" size="16px">
              {detailGroup?.finishTime}
            </Text>
          </Grid>
        </Grid>

        <Grid display="flex" margin="0 0 16px 0">
          <Text margin="0 16px 0 0" size="16px" color="#818181">
            주차시설
          </Text>
          <Text bold margin="0" size="16px">
            {detailGroup?.parking}
          </Text>
        </Grid>

        <Grid display="flex">
          <Text margin="0 16px 0 0" size="16px" color="#818181">
            짐 보관{"    "}
          </Text>
          <Text bold margin="0" size="16px">
            {detailGroup?.baggage}
          </Text>
        </Grid>
      </Grid>
    </>
  );
};

export default ServeInfo;
