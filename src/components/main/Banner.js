import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import Weather from "./Weather";
import { useSelector } from "react-redux";

import blueBanner from "../../assets/main/blueBanner.png";
import yellowBanner from "../../assets/main/yellowBanner.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Banner.css";

const Banner = () => {
  const is_login = useSelector((state) => state.user.isLogin);
  const userName = localStorage.getItem("nickname");

  if (is_login) {
    return (
      <Box>
        <Swiper
          className="mySwiper"
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{ clickable: true }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img src={blueBanner} alt="blueBanner" />
            <Grid
              display="flex"
              justifyContent="space-between"
              width="729px"
              height="154px"
            >
              <div className="text">
                <Text height="41px" bold size="32px" color="white" margin="0">
                  {userName} 님,
                </Text>
                <Text
                  bold
                  height="41px"
                  size="20px"
                  color="#ECF1F1"
                  margin="0 0 32px 0"
                >
                  당신에게 어울리는 이런저런 코스를 알려드려요!
                </Text>
                <button
                  className="btn"
                  onClick={() => {
                    history.push("/coursefeed");
                  }}
                >
                  추천 코스 보러가기
                </button>
              </div>

              <Weather />
            </Grid>
          </SwiperSlide>

          <SwiperSlide>
            <img src={yellowBanner} alt="yellowBanner" />
            <Grid
              display="flex"
              justifyContent="space-between"
              width="729px"
              height="154px"
            >
              <div className="text">
                <Text height="41px" bold size="32px" color="white" margin="0">
                  {userName} 님,
                </Text>
                <Text
                  bold
                  height="41px"
                  size="20px"
                  color="#ECF1F1"
                  margin="0 0 32px 0"
                >
                  당신에게 어울리는 이런저런 코스를 알려드려요!
                </Text>
                <button
                  className="btn"
                  onClick={() => {
                    history.push("/coursefeed");
                  }}
                >
                  추천 코스 보러가기
                </button>
              </div>

              <Weather />
            </Grid>
          </SwiperSlide>
        </Swiper>
      </Box>
    );
  }
  return (
    <Box>
      <Swiper
        className="mySwiper"
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{ clickable: true }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <BannerImg src={blueBanner} alt="blueBanner" />
          <div className="text">
            <Text bold size="35px" color="white">
              runner 님,
            </Text>
            <Text bold size="22px" color="#ECF1F1">
              러닝하기 좋은 코스를 알려드려요!
            </Text>
          </div>
          <button
            className="btn"
            type="button"
            onClick={() => {
              history.push("/coursefeed");
            }}
          >
            추천 코스 보러가기
          </button>
          <Weather />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  height: 356px;
  /* background-color: #5d79ff; */
  overflow: hidden;
`;

const BannerImg = styled.img`
  max-width: 1920px;
  width: 100%;
  height: auto;
`;

export default Banner;
