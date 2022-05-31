import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { imgActions } from "../redux/modules/image";
import { resetMap } from "../redux/modules/uploadInfo";
import {
  getCourseDB,
  getCoursePlusDB,
  getCourseRegionDB,
  resetCourse,
} from "../redux/modules/course";

//css, library, package
import { useMediaQuery } from "react-responsive";
import { Link } from "react-scroll";
import swal from "sweetalert";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import "../components/main/MGroupSlide.css";
import "./CourseFeed.css";

//Image
import noSearchData from "../assets/groupFeed/noSearchData.svg";
import upload from "../assets/groupFeed/groupUploadBtn1.png";
import uploadHover from "../assets/groupFeed/groupUploadBtn2.png";
import pageUp from "../assets/groupFeed/pageUpBtn.png";

//elements
import { Grid, Text } from "../elements";

//components
import BestCourse from "../components/courseFeed/BestCourse";
import RegionFilter from "../components/courseFeed/RegionFilter";
import CourseCard from "../components/courseFeed/CourseCard";
import BestCourseMob from "../components/courseFeed/BestCourseMob";
import RegionFilterMob from "../components/courseFeed/RegionFilterMob";
import DrawerCategoryCourse from "../components/courseFeed/DrawerCategoryCourse";
import CourseCardMob from "../components/courseFeed/CourseCardMob";
import Permit from "../shared/Permit";

SwiperCore.use([Virtual, Navigation, Pagination]);

const CourseFeed = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });
  const dispatch = useDispatch();
  const params = useParams();
  const region = params.region;

  const [uploadBtn, setUploadBtn] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);
  const [newCheck, setNewCheck] = useState(true);
  const [starCheck, setStarCheck] = useState(false);
  const [commCheck, setCommCheck] = useState(false);
  const [bookCheck, setBookCheck] = useState(false);

  const courseList = useSelector((state) => state.course.list);
  const rankingFeed = useSelector((state) => state.course.rankingFeed);
  const preferData = useSelector((state) => state.course.preferData);
  const paging = useSelector((state) => state.course.paging);

  const newCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseRegionDB(region, "new", 1, 6));
    setNewCheck(true);
    setStarCheck(false);
    setCommCheck(false);
    setBookCheck(false);
  };

  const starCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseRegionDB(region, "starPoint", 1, 6));
    setNewCheck(false);
    setStarCheck(true);
    setCommCheck(false);
    setBookCheck(false);
  };

  const commCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseRegionDB(region, "comment", 1, 6));
    setNewCheck(false);
    setStarCheck(false);
    setCommCheck(true);
    setBookCheck(false);
  };

  const bookCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseRegionDB(region, "bookmark", 1, 6));
    setNewCheck(false);
    setStarCheck(false);
    setCommCheck(false);
    setBookCheck(true);
  };

  useEffect(() => {
    dispatch(resetCourse());
    dispatch(getCourseDB(region, "new"));
    setNewCheck(true);
    setStarCheck(false);
    setCommCheck(false);
    setBookCheck(false);

    return () => {
      dispatch(resetCourse());
    };
  }, [region]);

  useEffect(() => {
    dispatch(resetMap());
    dispatch(imgActions.resetFile());
  }, []);

  if (isMobile) {
    return (
      <>
        <Grid
          display="flex"
          justifyContent="center"
          alignItem="center"
          width="375px"
          margin="84px auto 0 auto"
        >
          <Grid
            position="relative"
            width="375px"
            margin="0"
            justifyContent="space-between"
            display="flex"
          >
            <Grid margin="0 auto" width="343px">
              <Grid margin="0 0 16px 0" display="flex" alignItems="baseline">
                <Text margin="0 4px 0 0" bold size="13px">
                  #{preferData ? preferData : "전국"}
                </Text>
                <Text size="13px" margin="0">
                  추천코스 BEST 4
                </Text>
              </Grid>

              <Swiper
                id="CourseRankCardSwiperMob"
                onSwiper={setSwiperRef}
                slidesPerView={2}
                centeredSlides={true}
                spaceBetween={0}
                navigation={{ clickable: true }}
                pagination={{ clickable: true }}
                virtual
              >
                {rankingFeed?.map((item, idx) => {
                  return (
                    <SwiperSlide key={idx} id="CourseRankSlideMob">
                      <BestCourseMob idx={idx} {...item} />{" "}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Grid>
            <Grid width="375px" margin="0 auto">
              <RegionFilterMob />
            </Grid>

            <Grid width="375px">
              <Grid
                width="343px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                margin="16px auto 0 auto"
              >
                <Grid
                  display="flex"
                  justifyContent="left"
                  alignItems="center"
                  margin="0"
                  width="auto"
                  height="auto"
                >
                  <Text height="auto" margin="0" width="auto" size="11px">
                    총{" "}
                    <span style={{ color: "#686EF9" }}>
                      {courseList.length ? courseList.length : "0"}
                    </span>{" "}
                    개의 코스추천
                  </Text>
                </Grid>

                <DrawerCategoryCourse />
              </Grid>

              <HrMob></HrMob>
            </Grid>

            <Grid
              display="flex"
              width="343px"
              alignItem="center"
              margin="0 auto"
            >
              {courseList?.map((item, idx) => {
                return <CourseCardMob key={idx} {...item}></CourseCardMob>;
              })}
            </Grid>

            <Permit>
              <UploadBtnMob
                onClick={() => {
                  swal(
                    "추천 코스 업로드는 데스크탑 또는 노트북을 이용해주세요."
                  );
                }}
              >
                +
              </UploadBtnMob>
            </Permit>

            {courseList.length === 0 || paging.page === null ? null : (
              <Grid
                width="1200px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                margin="0 auto 0 auto"
              >
                <Grid
                  hover="box-shadow:1px 1px 8px gray;"
                  cursor="pointer"
                  margin="0 auto 100px auto"
                  border="1px solid #030C37"
                  width="104px"
                  height="30px"
                  borderRadius="2px"
                  bg="#ffffff"
                  display="flex"
                  justifyContent="center"
                  alignItem="center"
                  padding="7px 36px"
                  _onClick={() => {
                    if (paging.page === null) {
                      swal("게시물이 없습니다");
                    }
                    dispatch(getCoursePlusDB(0, "new", paging.page, 6));
                  }}
                >
                  <Text cursor="pointer" margin="0" size="11px" color="#030C37">
                    더보기
                  </Text>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        alignItem="center"
        width="100%"
        margin="0 auto"
      >
        <Grid
          position="relative"
          width="1282px"
          margin="0 278px 320px 360px"
          justifyContent="space-between"
          display="flex"
        >
          <Grid margin="0 0 100px 0" width="1200px">
            <Grid
              display="flex"
              justifyContent="left"
              margin="64px auto 32px auto"
              alignItems="baseline"
            >
              <Text margin="0 10px 0 0" bold size="20px">
                코스 추천
              </Text>
              <Text regular size="14px">
                러닝에 빼놓을 수 없는 나만의 코스 추천!
              </Text>
            </Grid>

            <Grid margin="0 0 16px 0" display="flex" alignItems="baseline">
              <Text margin="0 4px 0 0" bold size="18px">
                #{preferData ? preferData : "전국"}
              </Text>
              <Text margin="0">코스맛집 BEST 4</Text>
            </Grid>

            <Grid
              display="flex"
              width="1200px"
              alignItem="center"
              justifyContent="left"
            >
              {rankingFeed.length !== 0 ? (
                rankingFeed?.map((item, idx) => {
                  return (
                    <BestCourse key={idx} idx={idx} {...item}></BestCourse>
                  );
                })
              ) : (
                <Grid
                  width="1200px"
                  height="218px"
                  display="flex"
                  justifyContent="center"
                  alignItem="center"
                >
                  <img
                    style={{ margin: "0 auto", width: "110px" }}
                    src={noSearchData}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <RegionFilter />

          <Grid width="1200px">
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              margin="64px 0 0 0"
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                margin="0"
                width="auto"
              >
                <Text margin="0" width="auto" size="20px" bold>
                  총{" "}
                  <span style={{ color: "#686EF9" }}>
                    {courseList.length ? courseList.length : "0"}
                  </span>
                  개의 코스추천
                </Text>
              </Grid>
              <Permit>
                <Grid
                  display="flex"
                  alignItem="center"
                  justifyContent="center"
                  padding="5px"
                  width="96px"
                  height="32px"
                  bg="#68F99E"
                  border="none"
                  borderRadius="3px"
                  cursor="pointer"
                  _onClick={() => {
                    history.push("/courseUpload");
                  }}
                >
                  <Text
                    _onClick={() => {
                      history.push("/courseUpload");
                    }}
                    cursor="pointer"
                    margin="0"
                    size="14px"
                    color="#030C37"
                  >
                    글쓰기
                  </Text>
                </Grid>
              </Permit>
            </Grid>

            <Hr></Hr>
            {newCheck ? (
              <Grid
                margin="0 0 40px 0"
                width="auto"
                display="flex"
                alignItems="center"
              >
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    newCourse();
                  }}
                  bold
                  margin="0 16px 0 0"
                >
                  최신순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    starCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0 16px 0 0"
                >
                  별점높은순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    commCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0 16px 0 0"
                >
                  댓글많은순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    bookCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0"
                >
                  북마크많은순
                </Text>
              </Grid>
            ) : starCheck ? (
              <Grid
                margin="0 0 40px 0"
                width="auto"
                display="flex"
                alignItems="center"
              >
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    newCourse();
                  }}
                  bold
                  margin="0 16px 0 0"
                  color="#B8B8B8"
                >
                  최신순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    starCourse();
                  }}
                  bold
                  margin="0 16px 0 0"
                >
                  별점높은순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    commCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0 16px 0 0"
                >
                  댓글많은순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    bookCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0"
                >
                  북마크많은순
                </Text>
              </Grid>
            ) : commCheck ? (
              <Grid
                margin="0 0 40px 0"
                width="auto"
                display="flex"
                alignItems="center"
              >
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    newCourse();
                  }}
                  bold
                  margin="0 16px 0 0"
                  color="#B8B8B8"
                >
                  최신순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    starCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0 16px 0 0"
                >
                  별점높은순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    commCourse();
                  }}
                  bold
                  margin="0 16px 0 0"
                >
                  댓글많은순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    bookCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0"
                >
                  북마크많은순
                </Text>
              </Grid>
            ) : bookCheck ? (
              <Grid
                margin="0 0 40px 0"
                width="auto"
                display="flex"
                alignItems="center"
              >
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    newCourse();
                  }}
                  bold
                  margin="0 16px 0 0"
                  color="#B8B8B8"
                >
                  최신순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    starCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0 16px 0 0"
                >
                  별점높은순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    commCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0 16px 0 0"
                >
                  댓글많은순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    bookCourse();
                  }}
                  bold
                  margin="0"
                >
                  북마크많은순
                </Text>
              </Grid>
            ) : (
              <Grid
                margin="0 0 40px 0"
                width="auto"
                display="flex"
                alignItems="center"
              >
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    newCourse();
                  }}
                  bold
                  margin="0 16px 0 0"
                >
                  최신순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    starCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0 16px 0 0"
                >
                  별점높은순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    commCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0 16px 0 0"
                >
                  댓글많은순
                </Text>
                <Text
                  cursor="pointer"
                  _onClick={() => {
                    bookCourse();
                  }}
                  color="#B8B8B8"
                  bold
                  margin="0"
                >
                  북마크많은순
                </Text>
              </Grid>
            )}
          </Grid>

          <Grid display="flex" width="1200px" alignItem="center">
            {courseList?.map((item, idx) => {
              return <CourseCard key={idx} {...item}></CourseCard>;
            })}
          </Grid>

          <Grid
            display="flex"
            flexDirection="column"
            position="sticky"
            top="726px"
            margin="0"
            width="auto"
          >
            <Permit>
              {uploadBtn === true ? (
                <UploadBtn
                  onClick={() => {
                    history.push("/courseUpload");
                  }}
                  src={uploadHover}
                />
              ) : (
                <UploadBtn
                  onClick={() => {
                    history.push("/courseUpload");
                  }}
                  src={upload}
                />
              )}
            </Permit>

            <Link
              style={{ position: "relative" }}
              to="1"
              spy={true}
              smooth={true}
            >
              <PageUpBtn src={pageUp} />
            </Link>
          </Grid>
          {courseList.length === 0 || paging.page === null ? null : (
            <Grid
              width="1200px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="0 auto 0 auto"
            >
              <Grid
                hover="box-shadow:1px 1px 8px gray;"
                cursor="pointer"
                margin="138px auto 314px auto"
                border="1px solid #030C37"
                width="190px"
                height="48px"
                borderRadius="2px"
                bg="#ffffff"
                display="flex"
                justifyContent="center"
                alignItem="center"
                padding="13px"
                _onClick={() => {
                  if (paging.page === null) {
                    swal("게시물이 없습니다");
                  }
                  dispatch(getCoursePlusDB(0, "new", paging.page, 6));
                }}
              >
                <Text
                  cursor="pointer"
                  margin="0"
                  bold
                  size="15px"
                  color="#030C37"
                >
                  더보기
                </Text>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const UploadBtnMob = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(94, 94, 94, 0.45);
  cursor: pointer;
  margin: 0;
  bottom: 95px;
  right: 20px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  :hover {
    box-shadow: 0px 1px 8px rgba(94, 94, 94, 0.45);
    color: #68f99e;
  }
`;

const Hr = styled.hr`
  border-top: 1px solid #969696;
  width: 1200px;
  margin: 16px auto;
`;

const HrMob = styled.hr`
  border-top: 1px solid #f0f0f0;
  width: 343px;
  margin: 16px auto;
`;

const UploadBtn = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin: 0;
`;

const PageUpBtn = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin: 0;
`;

export default CourseFeed;
