import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import Ready from "../shared/Ready";

import noSearchData from "../assets/groupFeed/noSearchData.svg";

import { useMediaQuery } from "react-responsive";
import upload from "../assets/groupFeed/groupUploadBtn1.png";
import uploadHover from "../assets/groupFeed/groupUploadBtn2.png";
import pageUp from "../assets/groupFeed/pageUpBtn.png";
import BestCourse from "../components/courseFeed/BestCourse";
import RegionFilter from "../components/courseFeed/RegionFilter";
import CourseCard from "../components/courseFeed/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDB, resetCourse } from "../redux/modules/course";
import { Link } from "react-scroll";
import Permit from "../shared/Permit";
import { history } from "../redux/configureStore";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

const CourseFeed = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const params = useParams();
  const region = params.region;
  console.log(region);

  const courseList = useSelector((state) => state.course.list);
  const rankingFeed = useSelector((state) => state.course.rankingFeed);
  const paging = useSelector((state) => state.course.paging);
  console.log(courseList);
  console.log(paging);

  const [newStarCheck, setNewStarCheck] = useState(true);
  const [commBookCheck, setcommBookCheck] = useState(false);

  const newCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseDB(region, "new", paging.page + 1, 6));
    setNewStarCheck(true);
    setcommBookCheck(false);
  };

  const starCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseDB(region, "starPoint", paging.page + 1, 6));
    setNewStarCheck(true);
    setcommBookCheck(false);
  };

  const commCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseDB(region, "comment", paging.page + 1, 6));
    setNewStarCheck(true);
    setcommBookCheck(false);
  };

  const bookCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseDB(region, "bookmark", paging.page + 1, 6));
    setNewStarCheck(true);
    setcommBookCheck(false);
  };

  const dispatch = useDispatch();
  const [uploadBtn, setUploadBtn] = useState(false);

  useEffect(() => {
    console.log("코스 실행");
    dispatch(getCourseDB(region, "new"));

    return () => {
      console.log("코스 클린업");
      dispatch(resetCourse());
    };
  }, [region]);

  if (isMobile) {
    return (
      <>
        <AniWrap>
          <Ready />
        </AniWrap>
      </>
    );
  }

  // return (
  //   <>
  //     <AniWrap>
  //       <Ready />
  //     </AniWrap>
  //   </>
  // );

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
                #고양시
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
          </Grid>

          <Grid display="flex" width="1200px" alignItem="center">
            {courseList.length !== 0 ? (
              courseList?.map((item, idx) => {
                return <CourseCard key={idx} {...item}></CourseCard>;
              })
            ) : (
              <img style={{ margin: "0 auto" }} src={noSearchData} />
            )}
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
                  dispatch(getCourseDB(0, "new", paging.page, 6));
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

const Hr = styled.hr`
  border-top: 1px solid #969696;
  width: 1200px;
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

const AniWrap = styled.div`
  -webkit-animation: bounce-in-top 1.1s both;
  animation: bounce-in-top 1.1s both;
  @-webkit-keyframes bounce-in-top {
    0% {
      -webkit-transform: translateY(-500px);
      transform: translateY(-500px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }
    38% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
    }
    55% {
      -webkit-transform: translateY(-65px);
      transform: translateY(-65px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    72% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    81% {
      -webkit-transform: translateY(-28px);
      transform: translateY(-28px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    90% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    95% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
  @keyframes bounce-in-top {
    0% {
      -webkit-transform: translateY(-500px);
      transform: translateY(-500px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }
    38% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
    }
    55% {
      -webkit-transform: translateY(-65px);
      transform: translateY(-65px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    72% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    81% {
      -webkit-transform: translateY(-28px);
      transform: translateY(-28px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    90% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    95% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
`;
export default CourseFeed;
