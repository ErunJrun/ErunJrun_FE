import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  applyDetailDB,
  deleteGroupDB,
  getGroupDetailDB,
} from "../redux/modules/feed";
import ImageSlide from "../components/courseDetail/ImageSlide";
import MainInfo from "../components/courseDetail/MainInfo";
import { Grid, Text, IconButton } from "../elements";
import ServeInfo from "../components/courseDetail/ServeInfo";
import MapInfo from "../components/courseDetail/MapInfo";
import CrewLeaderInfo from "../components/courseDetail/CrewLeaderInfo";

import CommentList from "../components/comments/CommentList";
import InfoCategory from "../components/courseDetail/InfoCategory";
import mapIcon from "../assets/groupDetail/map.png";
import { useMediaQuery } from "react-responsive";

import pageUpIcon from "../assets/groupDetail/pageUpIcon.png";

import KakaoShareButton from "../components/KakaoShareButton";

import bookMarkLine_detail_Mob from "../assets/courseFeed/bookMarkLine_detail_Mob.svg";
import bookMarkGreen_detail from "../assets/courseFeed/bookMarkGreen_detail.svg";
import swal from "sweetalert";

import { Link } from "react-scroll";
import {
  bookmarkDetailDB,
  getCourseDetailDB,
  getStarPointDB,
} from "../redux/modules/course";
import StarPoint from "../components/courseDetail/StarPoint";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";

const CourseDetail = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const courseId = params.courseId;
  const detailCourse = useSelector((state) => state.course.detail);
  const starPoint = useSelector((state) => state.course.starPoint);
  const comment = useSelector((state) => state.comments);
  const token = getCookie("accessToken");

  useEffect(() => {
    dispatch(getStarPointDB(courseId));
  }, []);

  useEffect(() => {
    dispatch(getCourseDetailDB(courseId));
  }, [courseId]);

  if (isMobile) {
    return (
      <>
        <div id="2Mob"></div>
        <Grid
          width="375px"
          height="auto"
          display="flex"
          margin="0 auto"
          justifyContent="center"
          position="relative"
        >
          <Grid
            width="375px"
            display="flex"
            justifyContent="center"
            position="relative"
          >
            <ImageSlide />
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="left"
              margin="24px 0 0 0"
              width="343px"
            >
              <StarPoint small={true} starPoint={starPoint} starOne={true} />
              <Text width="auto" margin="0 4px 0 0" size="15px" bold>
                {starPoint?.starPoint ? starPoint?.starPoint : "0.0"}

                <span
                  style={{
                    fontSize: "13px",
                    color: "#7b7b7b",
                    marginLeft: "4px",
                  }}
                >
                  (리뷰{"  "}
                  {comment?.list ? comment?.list?.length : "0"})
                </span>
              </Text>
            </Grid>
            <MainInfo courseId={courseId} />
            <CrewLeaderInfo {...detailCourse} />
            <InfoCategory {...detailCourse} />
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
              <KakaoShareButton isMobile={true} detailCourse={detailCourse} />
              {detailCourse?.bookmark ? (
                <>
                  <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="291px"
                    height="44px"
                    bg="white"
                    border="1px solid #030C37"
                    borderRadius="3px"
                    _onClick={() => {
                      if (!token) {
                        swal({
                          text: "로그인 후 이용해 주세요",
                          closeOnClickOutside: false,
                        }).then(function (result) {
                          if (result) {
                            return history.push("/login");
                          }
                        });
                      }
                      dispatch(bookmarkDetailDB(detailCourse?.courseId));
                    }}
                  >
                    <img src={bookMarkGreen_detail} />
                    <Text size="14px" margin="0 0 0 9px">
                      북마크 취소
                    </Text>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="291px"
                    height="44px"
                    bg="#68F99E"
                    border="1px solid #68F99E"
                    borderRadius="3px"
                    _onClick={() => {
                      if (!token) {
                        swal({
                          text: "로그인 후 이용해 주세요",
                          closeOnClickOutside: false,
                        }).then(function (result) {
                          if (result) {
                            return history.push("/login");
                          }
                        });
                      }
                      dispatch(bookmarkDetailDB(detailCourse?.courseId));
                    }}
                  >
                    <img src={bookMarkLine_detail_Mob} />
                    <Text size="14px" margin="0 0 0 9px">
                      북마크하기
                    </Text>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>

          <Link
            style={{ position: "relative" }}
            to="2Mob"
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
          <div id="추천 코스정보"></div>
          <ServeInfo />
          <Grid display="flex" alignItems="center" margin="0 0 15px 0">
            <MapIconImg src={mapIcon} />
            <Text bold size="18px">
              지도로 보는 코스 정보
            </Text>
            <MapInfo />
            <div id="추천 소개"></div>
          </Grid>
          <Grid margin="0 0 96px 0">
            <Text bold size="18px" margin="0 0 22px 0">
              크루장의 소개글
            </Text>
            <Text size="16px">{detailCourse?.content}</Text>
          </Grid>

          <Grid
            width="758px"
            padding="40px 123px"
            bg="white"
            border="1px solid #B8B8B8"
            borderRadius="3px"
            margin="0 0 96px 0"
          >
            <Grid
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="511px"
            >
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="0"
                width="auto"
              >
                <Text width="auto" margin="0 0 24px 0" bold>
                  코스 별점
                </Text>
                <StarPoint starPoint={starPoint} starOne={true} />
                <Text width="auto" margin="16px 0 0 0" size="20px" bold>
                  {starPoint?.starPoint && starPoint?.starPoint !== "NaN"
                    ? starPoint?.starPoint
                    : "0.0"}{" "}
                  / <span style={{ fontWeight: "500" }}>5.0</span>
                  <span style={{ fontSize: "16px", color: "#7b7b7b" }}>
                    {"  "}({starPoint?.starPeople ? starPoint?.starPeople : "0"}
                    )
                  </span>
                </Text>
              </Grid>

              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                margin="0"
                width="auto"
              >
                <Text width="auto" margin="0 0 24px 0" bold>
                  내가 준 별점
                </Text>
                <StarPoint courseId={courseId} />
                <Text width="auto" margin="16px 0 0 0" size="20px">
                  {starPoint?.myStarPoint} / 5.0
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <div id="추천 리뷰"></div>
          <CommentList course={true} />
        </Grid>
        <Grid
          position="sticky"
          top="170px"
          display="flex"
          flexDirection="column"
          margin="0"
          width="auto"
        >
          <Grid
            cursor="pointer"
            width="402px"
            border="1px solid #EFEFEF"
            borderRadius="3px"
            margin="0 0 16px 0"
            padding="10px"
            bg="white"
            height="120px"
            display="flex"
            alignItems="center"
            boxShadow="0px 0px 6px rgba(141, 141, 141, 0.25)"
            position="relative"
            hover="box-shadow:0px 0px 6px rgba(141, 141, 141, 0.8);"
          >
            <Grid
              display="flex"
              justifyContent="space-between"
              width="233px"
              margin="0 auto"
            >
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="0"
                width="auto"
              >
                <Text
                  color="#909090"
                  size="14px"
                  width="auto"
                  margin="0 0 14px 0"
                  height="auto"
                >
                  코스 별점
                </Text>
                <Grid
                  display="flex"
                  alignItems="center"
                  width="auto"
                  height="auto"
                  margin="0"
                  justifyContent="center"
                >
                  <StarPoint starOne={true} />
                  <Text height="auto" width="auto" margin="0" size="20px" bold>
                    {starPoint?.starPoint && starPoint?.starPoint !== "NaN"
                      ? starPoint?.starPoint
                      : 0.0}
                  </Text>
                </Grid>
              </Grid>

              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="0"
                width="auto"
              >
                <Text
                  color="#909090"
                  size="14px"
                  width="auto"
                  margin="0 0 14px 0"
                >
                  코스 리뷰
                </Text>
                <Text width="auto" margin="0" size="20px">
                  {comment.list ? comment?.list?.length : "0"}개
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <MainInfo groupId={courseId} />
          <CrewLeaderInfo {...detailCourse} />
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

export default CourseDetail;
