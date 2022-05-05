import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroupDetailDB } from "../redux/modules/feed";
import ImageSlide from "../components/groupDetail/ImageSlide";
import MainInfo from "../components/groupDetail/MainInfo";
import { Grid, Text } from "../elements";
import ServeInfo from "../components/groupDetail/ServeInfo";
import MapInfo from "../components/groupDetail/MapInfo";
import CrewLeaderInfo from "../components/groupDetail/CrewLeaderInfo";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);
  console.log(detailGroup);

  useEffect(() => {
    dispatch(getGroupDetailDB(groupId));
  }, []);

  return (
    <>
      <Grid width="1360px" display="flex" justifyContent="center" margin="0">
        <ImageSlide />
        <MainInfo />
      </Grid>

      <Text margin="20px 0 0 0" bold>
        그룹러닝 상세
      </Text>

      <Grid
        display="flex"
        width="1360px"
        justifyContent="left"
        flexDirection="row"
      >
        <ServeInfo />
      </Grid>

      <Text bold>코스지도</Text>
      <MapInfo />

      <Text bold>그룹러닝 안내</Text>
      <Grid margin="0 0 100px 0">
        <Text margin="0 0 100px 0">{detailGroup?.content}</Text>
      </Grid>

      <Text bold>크루장 프로필</Text>
      <CrewLeaderInfo />
    </>
  );
};

export default GroupDetail;
