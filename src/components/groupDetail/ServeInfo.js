import React from "react";
import { useSelector } from "react-redux";
import { Grid, Text } from "../../elements";
import styled from "styled-components";

const ServeInfo = () => {
  const detailGroup = useSelector((state) => state.feed.detail);

  return (
    <>
      <Grid
        maxWidth="920px"
        width="100%"
        height="471px"
        margin="10px 0"
        padding="42px 32px 32px 32px "
        borderRadius="10px"
        bg="#efefef"
      >
        <Grid display="flex" height="auto">
          <Text margin="0 48px 0 0" bold>
            러닝날짜
          </Text>
          <Text margin="0" bold>
            {detailGroup?.date}
          </Text>
        </Grid>

        <Hr></Hr>

        <Grid display="flex" height="auto">
          <Text margin="0 48px 0 0" bold>
            러닝장소
          </Text>
          <Text margin="0" bold>
            {detailGroup?.location}
          </Text>
        </Grid>

        <Hr></Hr>

        <Grid is_flex height="auto">
          <Grid display="flex">
            <Text margin="0 48px 0 0" bold>
              스탠바이
            </Text>
            <Text margin="0" bold>
              {detailGroup?.standbyTime}
            </Text>
          </Grid>

          <Grid display="flex">
            <Text margin="0 48px 0 0" bold>
              출발시간
            </Text>
            <Text margin="0" bold>
              {detailGroup?.startTime}
            </Text>
          </Grid>

          <Grid display="flex">
            <Text margin="0 48px 0 0" bold>
              종료시간
            </Text>
            <Text margin="0" bold>
              {detailGroup?.finishTime}
            </Text>
          </Grid>
        </Grid>

        <Hr></Hr>

        <Grid is_flex height="auto">
          <Grid display="flex">
            <Text margin="0 48px 0 0" bold>
              러닝거리
            </Text>
            <Text margin="0" bold>
              {detailGroup?.distance}km
            </Text>
          </Grid>

          <Grid display="flex">
            <Text margin="0 48px 0 0" bold>
              러닝타입
            </Text>
            <Text margin="0" bold>
              {detailGroup?.thema}
            </Text>
          </Grid>

          <Grid display="flex">
            <Text margin="0 48px 0 0" bold>
              페이스
            </Text>
            <Text margin="0" bold>
              {detailGroup?.speed}
            </Text>
          </Grid>
        </Grid>

        <Hr></Hr>

        <Grid display="flex" height="auto">
          <Text margin="0 48px 0 0" bold>
            모집인원
          </Text>
          <Text margin="0" bold>
            {detailGroup?.maxPeople}
          </Text>
        </Grid>

        <Hr></Hr>

        <Grid display="flex" height="auto">
          <Text margin="0 48px 0 0" bold>
            주차정보
          </Text>
          <Text margin="0" bold>
            {detailGroup?.parking}
          </Text>
        </Grid>

        <Hr></Hr>

        <Grid display="flex" height="auto">
          <Text margin="0 48px 0 0" bold>
            짐보관방법
          </Text>
          <Text margin="0" bold>
            {detailGroup?.baggage}
          </Text>
        </Grid>

        <Hr></Hr>

        <Grid display="flex" height="auto">
          <Text margin="0 48px 0 0" bold>
            유의사항
          </Text>
          <Text margin="0" bold>
            스탠바이로부터 4시간전에 모집신청이 마감됩니다.
          </Text>
        </Grid>
      </Grid>
    </>
  );
};

const Hr = styled.div`
  border: 1px solid gray;
  width: 100%;
  margin: 16px auto;
`;

export default ServeInfo;
