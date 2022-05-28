import React, { useEffect, useState } from "react";
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid } from "../../elements";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import courseFeedBanner from "../../assets/courseFeedBanner.png";
import { getMainDB, resetGroup } from "../../redux/modules/feed";
import MGroupCard from "./MGroupCard";
import { useMediaQuery } from "react-responsive";
import readyImage from "../../assets/errorPage.png";

import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MGroupSlide.css";

import MGroupCardMob from "./MGroupCardMob";

SwiperCore.use([Virtual, Navigation, Pagination]);

const MGroupRunning = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const postList = useSelector((state) => state.feed.main);

  const [swiperRef, setSwiperRef] = useState(null);

  const [slides, setSlides] = useState(
    Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  );

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  useEffect(() => {
    dispatch(getMainDB());

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
            margin="0 auto 40px auto"
          >
            <Grid display="flex" justifyContent="center" margin="0">
              <Grid display="flex" alignItems="flex-end" width="375px">
                <Text bold size="16px" margin="0 0 0 16px">
                  추천 코스
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            display="flex"
            flexDirection="column"
            width="100%"
            justifyContent="center"
            alignItems="center"
            margin="0 auto"
          >
            <img style={{ width: "168px" }} src={readyImage} />
            <Text margin="0 0 50px 0" size="10px">
              해당 서비스는 오픈 전입니다. 조금만 기다려주세요!
            </Text>
          </Grid>
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

        <CourseBanner src={courseFeedBanner}></CourseBanner>
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
