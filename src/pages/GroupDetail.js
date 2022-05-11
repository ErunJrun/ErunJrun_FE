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
import Appliers from "../components/groupDetail/Appliers";
import CommentList from "../components/comments/CommentList";
import InfoCategory from "../components/groupDetail/InfoCategory";
import mapIcon from "../assets/mapIcon.png";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);

  useEffect(() => {
    dispatch(getGroupDetailDB(groupId));
  }, []);

  return (
    <>
      <Grid
        maxWidth="758px"
        width="100%"
        display="flex"
        justifyContent="center"
        margin="80px auto 65px 360px"
        position="relative"
      >
        {/* <ImageCollage detailGroup={detailGroup} /> */}
        <ImageSlide />

        <InfoCategory />
        <div id="코스정보"></div>
        <ServeInfo />

        <Grid display="flex" alignItems="center" margin="0 0 15px 0">
          <MapIconImg src={mapIcon} />
          <Text bold size="18px">
            지도로 보는 코스 정보
          </Text>
          <MapInfo />
          <div id="소개"></div>
        </Grid>

        <Grid margin="0 0 96px 0">
          <Text bold size="18px" margin="0 0 22px 0">
            크루장의 소개글
          </Text>
          <Text size="16px">{detailGroup?.content}</Text>
          <div id="크루원"></div>
        </Grid>
        <div id="Q&A"></div>
        <Appliers />
        <CommentList />
      </Grid>
      <Grid>
        <MainInfo groupId={groupId} />
        <CrewLeaderInfo {...detailGroup} />
      </Grid>
    </>
  );
};

const MapIconImg = styled.img`
  width: 14px;
  height: 20px;
  margin: 0 10px 0 0;
`;

export default GroupDetail;
