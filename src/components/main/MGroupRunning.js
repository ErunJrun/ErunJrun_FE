import React, { useEffect, useState } from "react";
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid } from "../../elements";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import courseFeedBanner from "../../assets/courseFeedBanner.png";
import { getMainDB, resetGroup } from "../../redux/modules/feed";
import MGroupCard from "./MGroupCard";

import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Banner.css";
import "./GroupSlide.css";

SwiperCore.use([Virtual, Navigation, Pagination]);

const MGroupRunning = () => {
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
      console.log("그룹 게시물 클린업");
      dispatch(resetGroup());
    };
  }, []);

  return (
    <>
      <Grid
        width="1200px"
        display="flex"
        justifyContent="column"
        margin="100px auto 160px auto"
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

        <Swiper
          id="GroupCardSwiper"
          onSwiper={setSwiperRef}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={50}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          virtual
        >
          {postList?.map((item, idx) => {
            return (
              <SwiperSlide id="GroupCardSlide">
                <MGroupCard key={idx} {...item} />{" "}
              </SwiperSlide>
            );
          })}
        </Swiper>
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
              history.push("/coursefeed");
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

const Btn = styled.button`
  border: none;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  color: #000000;
  background-color: transparent;
  font-weight: 1000;
  text-align: center;
  text-decoration: none;
  margin-left: 30px;
  width: 100px;
  cursor: pointer;
`;

const CourseBanner = styled.img`
  width: 100%;
`;

export default MGroupRunning;
