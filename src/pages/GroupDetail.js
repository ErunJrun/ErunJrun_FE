import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  applyDetailDB,
  deleteGroupDB,
  getGroupDetailDB,
} from "../redux/modules/feed";
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
import editIcon from "../assets/groupDetail/editIcon.png";
import pageUpIcon from "../assets/groupDetail/pageUpIcon.png";

import Permit from "../shared/Permit";
import { history } from "../redux/configureStore";
import chatMobColor from "../assets/groupDetail/chatMobColor.png";
import chatMob from "../assets/groupDetail/chatMob.png";
import shareMob from "../assets/groupDetail/shareMob.png";
import KakaoShareButton from "../components/KakaoShareButton";

import swal from "sweetalert";

import { Link } from "react-scroll";

const GroupDetail = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);
  const [editMenu, setEditMenu] = React.useState(false);

  const nickname = localStorage.getItem("nickname");
  const isLogin = useSelector((state) => state.user.isLogin);

  const goApply = () => {
    if (isLogin || nickname) {
      dispatch(applyDetailDB(groupId));
    } else {
      swal({
        text: "로그인 후 이용해 주세요",
        closeOnClickOutside: false,
      }).then(function (result) {
        console.log(result);

        if (result) {
          history.push("/login");
        }
      });
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
          position="relative"
        >
          <div id="1Mob"></div>
          <Grid
            width="375px"
            display="flex"
            justifyContent="center"
            position="relative"
          >
            <ImageSlide />
            <MainInfo groupId={groupId} />
            <CrewLeaderInfo {...detailGroup} />
            <InfoCategory {...detailGroup} />
          </Grid>

          {detailGroup?.applyEndTime === "0 일" ? (
            <>
              <Grid
                bg="#030C37"
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex="3"
                position="fixed"
                bottom="73px"
                left="0"
                width="100%"
                height="28px"
              >
                <Grid
                  width="375px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text size="12px" margin="0" color="white">
                    마감되었습니다
                  </Text>
                </Grid>
              </Grid>

              <Grid
                zIndex="3"
                bg="white"
                justifyContent="center"
                position="fixed"
                bottom="0"
                left="0"
                width="100%"
                height="73px"
                display="flex"
                padding="10px 16px"
              >
                <Grid
                  width="375px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding="0"
                >
                  <ChatMob
                    onClick={() => {
                      swal("기한이 종료되었습니다.");
                    }}
                    src={chatMob}
                  />

                  <ShareMob
                    onClick={() => {
                      swal("기한이 종료되었습니다.");
                    }}
                    src={shareMob}
                  />

                  <ApplyBtn style={{ background: "gray" }}>
                    <Text margin="0" size="14px">
                      기한 종료
                    </Text>
                  </ApplyBtn>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid
                bg="#030C37"
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex="3"
                position="fixed"
                bottom="73px"
                left="0"
                width="100%"
                height="28px"
              >
                <Grid
                  width="375px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text size="12px" margin="0" color="white">
                    약 {detailGroup?.applyEndTime} 후 마감!
                  </Text>
                </Grid>
              </Grid>

              <Grid
                zIndex="3"
                bg="white"
                justifyContent="center"
                position="fixed"
                bottom="0"
                left="0"
                width="100%"
                height="73px"
                display="flex"
                padding="10px 16px"
              >
                <Grid
                  width="375px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding="0"
                >
                  {detailGroup?.chattingRoom === "" ? (
                    detailGroup?.applyState ? (
                      <ChatMob
                        onClick={() => {
                          swal("링크가 없습니다.");
                        }}
                        src={chatMob}
                      />
                    ) : (
                      <ChatMob
                        onClick={() => {
                          swal("신청 후 이용해주세요");
                        }}
                        src={chatMob}
                      />
                    )
                  ) : detailGroup?.applyState ? (
                    <a
                      style={{ textDecoration: "none", height: "44px" }}
                      href={detailGroup?.chattingRoom}
                    >
                      <ChatMob src={chatMobColor} />
                    </a>
                  ) : (
                    <ChatMob
                      onClick={() => {
                        swal("신청 후 이용해주세요");
                      }}
                      src={chatMob}
                    />
                  )}

                  <KakaoShareButton isMobile={true} detailGroup={detailGroup} />

                  {detailGroup?.applyState ? (
                    <ApplyBtn
                      style={{
                        background: "white",
                        border: "1px solid #68f99e",
                      }}
                      onClick={() => {
                        goApply();
                      }}
                    >
                      <Text
                        color="black"
                        _onClick={() => {
                          goApply();
                        }}
                        margin="0"
                        size="14px"
                      >
                        신청취소
                      </Text>
                    </ApplyBtn>
                  ) : (
                    <ApplyBtn
                      onClick={() => {
                        goApply();
                      }}
                    >
                      <Text
                        _onClick={() => {
                          goApply();
                        }}
                        margin="0"
                        size="14px"
                      >
                        신청하기
                      </Text>
                    </ApplyBtn>
                  )}
                </Grid>
              </Grid>
            </>
          )}
          <Link
            style={{ position: "relative" }}
            to="1Mob"
            spy={true}
            smooth={true}
          >
            <PageUpBtn src={pageUpIcon} />
          </Link>
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

const ChatMob = styled.img`
  width: 44px;
  height: 44px;
  margin: 0;
  cursor: pointer;
`;

const ShareMob = styled.img`
  width: 44px;
  height: 44px;
  margin: 0;
  cursor: pointer;
`;

const ApplyBtn = styled.div`
  background-color: #68f99e;
  border: 1px solid #68f99e;
  box-sizing: border-box;
  width: 239px;
  height: 44px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  :hover {
  }
`;

const PageUpBtn = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 0;
  position: fixed;
  bottom: 117px;
  right: 9px;
  z-index: 4;
`;

const DropContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  box-sizing: border-box;
  top: 40px;
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
