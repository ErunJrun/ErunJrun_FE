import React, { useEffect, useState } from "react";

//Redux
import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { getMainDB, resetGroup } from "../../redux/modules/feed";
import { getCourseMainDB } from "../../redux/modules/course";

//css, library, package
import { useMediaQuery } from "react-responsive";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MGroupSlide.css";
import styled from "styled-components";

//elements
import { Text, Grid } from "../../elements";

//components
import MGroupCard from "./MGroupCard";
import CourseCardMob from "../courseFeed/CourseCardMob";
import MGroupCardMob from "./MGroupCardMob";
import CourseCard from "../courseFeed/CourseCard";

SwiperCore.use([Virtual, Navigation, Pagination]);

const MGroupRunning = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const postList = useSelector((state) => state.feed.main);
  const courseList = useSelector((state) => state.course.main);

  const [swiperRef, setSwiperRef] = useState(null);

  const [slides, setSlides] = useState(
    Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  );

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  useEffect(() => {
    dispatch(getMainDB());
    dispatch(getCourseMainDB());

    return () => {
      dispatch(resetGroup());
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <Grid
          width="375px"
          display="flex"
          flexDirection="space-between"
          justifyContent="column"
          margin="75px auto 0 auto"
        >
          <Grid display="flex" justifyContent="center" margin="0">
            <Grid display="flex" alignItems="flex-end" width="375px">
              <Text bold size="16px" margin="0 0 16px 16px">
                그룹 러닝
              </Text>
            </Grid>
          </Grid>

          <Swiper
            id="GroupCardSwiperMob"
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={130}
            navigation={{ clickable: true }}
            pagination={{ clickable: true }}
            virtual
          >
            {postList?.map((item, idx) => {
              return (
                <SwiperSlide key={idx} id="GroupCardSlideMob">
                  <MGroupCardMob {...item} />{" "}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Grid>

        <Grid
          width="375px"
          display="flex"
          justifyContent="column"
          margin="0 auto 100px auto"
        >
          <Grid
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            margin="0 auto 16px auto"
          >
            <Grid display="flex" justifyContent="center" margin="0">
              <Grid display="flex" alignItems="flex-end" width="375px">
                <Text bold size="16px" margin="0 0 0 16px">
                  추천 코스
                </Text>
              </Grid>
            </Grid>
          </Grid>

          <Swiper
            id="CourseCardSwiperMob"
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={130}
            navigation={{ clickable: true }}
            pagination={{ clickable: true }}
            virtual
          >
            {courseList?.map((item, idx) => {
              return (
                <SwiperSlide key={idx} id="CourseCardSlideMob">
                  <CourseCardMob main={true} {...item} />{" "}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid
        width="1200px"
        display="flex"
        justifyContent="column"
        margin="100px auto 0 auto"
      >
        <Grid
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          margin="0 0 40px 0"
        >
          <Grid display="flex" alignItems="flex-end" width="auto">
            <Text bold size="26px" margin="0 16px 0 0">
              그룹 러닝
            </Text>
            <Text lineHeight="30px" size="16px" margin="0">
              함께 뛰면 즐거움이 두배!
            </Text>
          </Grid>

          <Btn
            onClick={() => {
              history.push("/groupfeed");
            }}
          >
            더보기
            <HiOutlineArrowNarrowRight />
          </Btn>
        </Grid>
        <OpenAnimation>
          <Swiper
            id="GroupCardSwiper"
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={10}
            pagination={true}
            navigation={true}
            virtual
          >
            {postList?.map((item, idx) => {
              return (
                <SwiperSlide key={idx} id="GroupCardSlide">
                  <MGroupCard {...item} />{" "}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </OpenAnimation>
      </Grid>

      <Grid
        maxWidth="1200px"
        display="flex"
        justifyContent="column"
        margin="0 auto 320px auto"
      >
        <Grid
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          margin="0 0 40px 0"
        >
          <Grid display="flex" alignItems="flex-end" width="auto">
            <Text bold size="26px" margin="0 16px 0 0">
              추천 코스
            </Text>
            <Text lineHeight="30px" size="16px" margin="0">
              나만의 코스를 추천해주세요!
            </Text>
          </Grid>

          <Btn
            onClick={() => {
              history.push("/coursefeed/0");
            }}
          >
            더보기
            <HiOutlineArrowNarrowRight />
          </Btn>
        </Grid>

        <OpenAnimation>
          <Swiper
            id="CourseCardSwiper"
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={10}
            pagination={true}
            navigation={true}
            virtual
          >
            {courseList?.map((item, idx) => {
              return (
                <SwiperSlide key={idx} id="CourseCardSlide">
                  <CourseCard main={true} {...item} />{" "}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </OpenAnimation>
      </Grid>
    </>
  );
};

const OpenAnimation = styled.div`
  -webkit-animation: swing-in-top-fwd 0.5s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  @-webkit-keyframes swing-in-top-fwd {
    0% {
      -webkit-transform: rotateX(-100deg);
      transform: rotateX(-100deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 1;
    }
  }
  @keyframes swing-in-top-fwd {
    0% {
      -webkit-transform: rotateX(-100deg);
      transform: rotateX(-100deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 1;
    }
  }
`;

const Btn = styled.button`
  border: none;
  font-family: "Spoqa Han Sans Neo";
  font-size: 18px;
  color: #000000;
  background-color: transparent;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CourseBanner = styled.img`
  width: 100%;
`;

export default MGroupRunning;
