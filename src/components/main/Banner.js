import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import Weather from "./Weather";
import { useSelector, useDispatch } from "react-redux";

import blueBanner from "../../assets/main/blueBanner.png";
import yellowBanner from "../../assets/main/yellowBanner.png";
import yellowBannerMob from "../../assets/main/yellowBannerMob.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Banner.css";

import { useMediaQuery } from "react-responsive";

const Banner = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.isLogin);
  const userName = localStorage.getItem("nickname");

  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  if (isMobile) {
    return (
      <BoxMob>
        <Swiper
          id="SwiperMob"
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{ clickable: true }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide id="SwiperSlideMob">
            <img
              style={{ width: "100%", height: "150px" }}
              src={yellowBannerMob}
              alt="yellowBannerMob"
            />
            {/* <Grid
              display="flex"
              justifyContent="space-between"
              width="375px"
              height="150px"
            >
              <Grid
                display="flex"
                flexDirection="column"
                position="absolute"
                top="80px"
                left="795px"
                width="339px"
                height="auto"
                margin="0 0 0 40px"
              >
                <Text
                  textLeft
                  height="auto"
                  bold
                  size="32px"
                  color="white"
                  margin="0"
                >
                  Runner 님,
                </Text>
                <Text
                  textLeft
                  bold
                  height="41px"
                  size="20px"
                  color="#ECF1F1"
                  margin="0 0 26px 0"
                >
                  당신에게 어울리는{" "}
                  <span style={{ color: "#68F99E" }}>이런저런</span> 코스 추천!
                </Text>

                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    history.push("/coursefeed");
                  }}
                >
                  추천 코스 보러가기
                </button>
              </Grid>
            </Grid> */}
          </SwiperSlide>
        </Swiper>
      </BoxMob>
    );
  }

  if (is_login) {
    return (
      <Box>
        <Swiper
          className="bannerSwiper"
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
              <Grid
                display="flex"
                flexDirection="column"
                position="absolute"
                top="80px"
                left="795px"
                width="339px"
                height="auto"
                margin="0 0 0 40px"
              >
                <Text
                  textLeft
                  height="auto"
                  bold
                  size="32px"
                  color="white"
                  margin="0"
                >
                  {userName} 님,
                </Text>
                <Text
                  textLeft
                  bold
                  height="41px"
                  size="20px"
                  color="#ECF1F1"
                  margin="0 0 26px 0"
                >
                  당신에게 어울리는{" "}
                  <span style={{ color: "#68F99E" }}>이런저런</span> 코스 추천!
                </Text>
                <button
                  className="btn"
                  onClick={() => {
                    history.push("/coursefeed");
                  }}
                >
                  추천 코스 보러가기
                </button>
              </Grid>

              <Weather />
            </Grid>
          </SwiperSlide>

          <SwiperSlide>
            <img src={yellowBanner} alt="yellowBanner" />
            <Grid
              display="flex"
              justifyContent="space-between"
              width="1200px"
              height="154px"
              bg="blue"
              _onClick={() => {
                history.push("/coursefeed");
              }}
            >
              <Grid
                display="flex"
                flexDirection="column"
                position="absolute"
                top="80px"
                left="420px"
                width="339px"
                height="auto"
                margin="0 0 0 40px"
              >
                <Text
                  textLeft
                  height="auto"
                  bold
                  size="22px"
                  color="#303030"
                  margin="0 0 12px 0"
                >
                  검증된 러닝 코스 즐기기
                </Text>
                <Text
                  textLeft
                  height="auto"
                  bold
                  size="32px"
                  color="#303030"
                  margin="0"
                  cursor="pointer"
                >
                  {userName} 님,
                </Text>
                <Text
                  textLeft
                  bold
                  height="41px"
                  size="32px"
                  color="#303030"
                  margin="0 0 26px 0"
                  cursor="pointer"
                >
                  야경과 함께 뛰어보세요!
                </Text>
                <Text textLeft size="18px" color="#303030" margin="0 0 26px 0">
                  #야경 #밤러닝 #강변
                </Text>
              </Grid>

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
        className="bannerSwiper"
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
            <Grid
              display="flex"
              flexDirection="column"
              position="absolute"
              top="80px"
              left="795px"
              width="339px"
              height="auto"
              margin="0 0 0 40px"
            >
              <Text
                textLeft
                height="auto"
                bold
                size="32px"
                color="white"
                margin="0"
              >
                Runner 님,
              </Text>
              <Text
                textLeft
                bold
                height="41px"
                size="20px"
                color="#ECF1F1"
                margin="0 0 26px 0"
              >
                당신에게 어울리는{" "}
                <span style={{ color: "#68F99E" }}>이런저런</span> 코스 추천!
              </Text>

              <button
                className="btn"
                type="button"
                onClick={() => {
                  history.push("/coursefeed");
                }}
              >
                추천 코스 보러가기
              </button>
            </Grid>

            <Weather />
          </Grid>
        </SwiperSlide>

        <SwiperSlide>
          <img src={yellowBanner} alt="yellowBanner" />
          <Grid
            display="flex"
            justifyContent="space-between"
            width="1200px"
            height="154px"
            bg="blue"
            _onClick={() => {
              history.push("/coursefeed");
            }}
          >
            <Grid
              display="flex"
              flexDirection="column"
              position="absolute"
              top="80px"
              left="420px"
              width="339px"
              height="auto"
              margin="0 0 0 40px"
            >
              <Text
                textLeft
                height="auto"
                bold
                size="22px"
                color="#303030"
                margin="0 0 12px 0"
              >
                검증된 러닝 코스 즐기기
              </Text>
              <Text
                textLeft
                height="auto"
                bold
                size="32px"
                color="#303030"
                margin="0"
                cursor="pointer"
              >
                Runner 님,
              </Text>
              <Text
                textLeft
                bold
                height="41px"
                size="32px"
                color="#303030"
                margin="0 0 26px 0"
                cursor="pointer"
              >
                야경과 함께 뛰어보세요!
              </Text>
              <Text textLeft size="18px" color="#303030" margin="0 0 26px 0">
                #야경 #밤러닝 #강변
              </Text>
            </Grid>

            <Weather />
          </Grid>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  height: 356px;
  overflow: hidden;
`;

const BoxMob = styled.div`
  width: 100%;
  height: 150px;
  margin: 90px auto 0 auto;
`;

export default Banner;
