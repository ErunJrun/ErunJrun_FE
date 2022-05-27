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

  const detailGroup = useSelector((state) => state.feed.detail);
  const startTime = detailGroup?.datetime?.slice(-7);

  const editStandbyTime = detailGroup?.standbyTime
    ? detailGroup?.standbyTime?.substr(0, 2) +
      "시" +
      " " +
      detailGroup?.standbyTime.substr(3, 2) +
      "분"
    : "";

  const editStartTime = detailGroup?.startTime
    ? detailGroup?.startTime?.substr(0, 2) +
      "시" +
      " " +
      detailGroup?.startTime.substr(3, 2) +
      "분"
    : "";

  const editFinishTime = detailGroup?.finishTime
    ? detailGroup?.finishTime?.substr(0, 2) +
      "시" +
      " " +
      detailGroup?.finishTime.substr(3, 2) +
      "분"
    : "";

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
                타입
              </Text>
              <Text margin="0" size="12px">
                {detailGroup?.thema}
              </Text>
            </Grid>

            <Grid width="auto" display="flex" margin="0 0 16px 0">
              <Text margin="0 8px 0 0" size="12px" color="#7B7B7B">
                속도
              </Text>
              <Text margin="0" size="12px">
                {detailGroup?.speed}
              </Text>
            </Grid>

            <Grid width="auto" display="flex" margin="0 0 16px 0">
              <Text margin="0 8px 0 0" size="12px" color="#7B7B7B">
                출발 시간
              </Text>
              <Text margin="0" size="12px">
                {editStandbyTime}
              </Text>
            </Grid>

            <Grid width="auto" display="flex" margin="0 0 16px 0">
              <Text margin="0 8px 0 0" size="12px" color="#7B7B7B">
                주차시설
              </Text>
              <Text margin="0" size="12px">
                {detailGroup?.parking}
              </Text>
            </Grid>

            <Grid width="auto" display="flex" margin="0">
              <Text margin="0 8px 0 0" size="12px" color="#7B7B7B">
                짐 보관{"    "}
              </Text>
              <Text margin="0" size="12px">
                {detailGroup?.baggage}
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
              출발 시간
            </Text>
            <Text bold margin="0" size="16px">
              {editStandbyTime}
            </Text>
          </Grid>

          <Grid width="auto" display="flex" margin="0 64px 0 0">
            <Text margin="0 16px 0 0" size="16px" color="#818181">
              주차 시설
            </Text>
            <Text bold color="" margin="0" size="16px">
              {detailGroup?.parking}
            </Text>
          </Grid>

          <Grid width="auto" display="flex" margin="0 64px 0 0">
            <Text margin="0 16px 0 0" size="16px" color="#818181">
              짐 보관
            </Text>
            <Text bold margin="0" size="16px">
              {detailGroup?.baggage}
            </Text>
          </Grid>
        </Grid>

        {/* <Grid display="flex" margin="0 0 16px 0">
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
        </Grid> */}
      </Grid>
    </>
  );
};

export default ServeInfo;
