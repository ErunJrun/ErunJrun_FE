import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroupDB, getGroupDetailDB } from "../redux/modules/feed";
import ImageSlide from "../components/groupDetail/ImageSlide";
import MainInfo from "../components/groupDetail/MainInfo";
import { Grid, Text, IconButton } from "../elements";
import ServeInfo from "../components/groupDetail/ServeInfo";
import MapInfo from "../components/groupDetail/MapInfo";
import CrewLeaderInfo from "../components/groupDetail/CrewLeaderInfo";
import Appliers from "../components/groupDetail/Appliers";
import CommentList from "../components/comments/CommentList";
import InfoCategory from "../components/groupDetail/InfoCategory";
import mapIcon from "../assets/groupDetail/map.png";
import { useMediaQuery } from "react-responsive";
import backIcon from "../assets/groupDetail/backIcon.png";
import Permit from "../shared/Permit";
import { history } from "../redux/configureStore";

const GroupDetail = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);
  const [editMenu, setEditMenu] = React.useState(false);

  const nickname = localStorage.getItem("nickname");
  const isLogin = useSelector((state) => state.user.isLogin);

  const handleEditMenu = () => {
    return setEditMenu(!editMenu);
  };

  const closeEditMenu = () => {
    return setEditMenu(false);
  };

  const editGroup = () => {
    if (detailGroup.applyEndTime === "0 일") {
      return window.alert("모집이 마감 된 공고입니다.");
    } else {
      closeEditMenu();
      history.push(`/groupEdit/${groupId}`);
    }
  };

  useEffect(() => {
    dispatch(getGroupDetailDB(groupId));
  }, [groupId]);

  if (isMobile) {
    return (
      <>
        <Grid
          width="375px"
          height="auto"
          display="flex"
          margin="0 auto"
          justifyContent="center"
        >
          <Grid width="375px" display="flex" justifyContent="center">
            <TitleWrap>
              <img
                style={{ width: "8px", height: "16px", marginRight: "24px" }}
                src={backIcon}
              />
              <TitleBar>{detailGroup?.title}</TitleBar>
              <Permit>
                {nickname === detailGroup?.nickname ? (
                  <Grid margin="0" display="flex" width="auto" height="auto">
                    <IconButton
                      cursor="pointer"
                      _onClick={handleEditMenu}
                      moreDot
                      color="gray"
                    ></IconButton>
                    {editMenu ? (
                      <DropContent>
                        <Text
                          margin="0"
                          _onClick={() => {
                            editGroup();
                          }}
                        >
                          수정하기
                        </Text>
                        <Line />
                        <Text
                          margin="0"
                          _onClick={() => {
                            dispatch(deleteGroupDB(detailGroup.groupId));
                            closeEditMenu();
                          }}
                        >
                          삭제하기
                        </Text>
                      </DropContent>
                    ) : null}
                  </Grid>
                ) : null}
              </Permit>
            </TitleWrap>

            <ImageSlide />
            <MainInfo groupId={groupId} />
            <CrewLeaderInfo {...detailGroup} />
            <InfoCategory {...detailGroup} />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid
        width="1200px"
        height="auto"
        display="flex"
        justifyContent="space-between"
        margin="80px auto 65px auto"
        position="relative"
      >
        <Grid width="758px">
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
          <Appliers />

          <CommentList />
          <div id="Q&A"></div>
        </Grid>
        <Grid
          position="sticky"
          top="170px"
          display="flex"
          flexDirection="column"
          margin="0"
          width="auto"
        >
          <MainInfo groupId={groupId} />
          <CrewLeaderInfo {...detailGroup} />
        </Grid>
      </Grid>
    </>
  );
};

const MapIconImg = styled.img`
  width: 14px;
  height: 20px;
  margin: 0 10px 0 0;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 375px;
  height: 51px;
  position: fixed;
  top: 90px;
  z-index: 3;
  background-color: white;
`;

const TitleBar = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "Spoqa Han Sans Neo";
  font-weight: 500;
  font-size: 14px;
  width: 268px;
  height: 19px;
`;

const DropContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  box-sizing: border-box;
  left: 250px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  width: 107px;
  height: 104px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(149, 149, 149, 0.35);
  padding: 10px;
`;

const Line = styled.hr`
  width: 106px;
  margin: 16px 0;
  border: 1px solid #dddddd;
`;

export default GroupDetail;
