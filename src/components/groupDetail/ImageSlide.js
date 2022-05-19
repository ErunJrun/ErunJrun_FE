import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "./ImageSlide.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlide = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const detailGroup = useSelector((state) => state.feed.detail);

  if (isMobile) {
    return (
      <Swiper
        id="GroupDetailSlideMob"
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{ clickable: true }}
        pagination={{ clickable: true }}
      >
        ``
        {detailGroup?.thumbnailUrl1 ? (
          <SwiperSlide>
            <img src={detailGroup?.thumbnailUrl1}></img>
          </SwiperSlide>
        ) : (
          ""
        )}
        {detailGroup?.thumbnailUrl2 ? (
          <SwiperSlide>
            <img src={detailGroup?.thumbnailUrl2}></img>
          </SwiperSlide>
        ) : (
          ""
        )}
        {detailGroup?.thumbnailUrl3 ? (
          <SwiperSlide>
            <img src={detailGroup?.thumbnailUrl3}></img>
          </SwiperSlide>
        ) : (
          ""
        )}
      </Swiper>
    );
  }

  return (
    <Swiper
      id="GroupDetailSlide"
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{ clickable: true }}
      pagination={{ clickable: true }}
    >
      ``
      {detailGroup?.thumbnailUrl1 ? (
        <SwiperSlide id="GroupDetailSlide1">
          <img src={detailGroup?.thumbnailUrl1}></img>
        </SwiperSlide>
      ) : (
        ""
      )}
      {detailGroup?.thumbnailUrl2 ? (
        <SwiperSlide>
          <img src={detailGroup?.thumbnailUrl2}></img>
        </SwiperSlide>
      ) : (
        ""
      )}
      {detailGroup?.thumbnailUrl3 ? (
        <SwiperSlide>
          <img src={detailGroup?.thumbnailUrl3}></img>
        </SwiperSlide>
      ) : (
        ""
      )}
    </Swiper>
  );
};

export default ImageSlide;
