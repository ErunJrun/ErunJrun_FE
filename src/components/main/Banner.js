import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import Images from './Images';
import { history } from "../../redux/configureStore";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../../shared/styles.css";

const Banner = () => {
  return (
    <Swiper
      className="mySwiper"
      modules={[ Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{clickable: true}}
      pagination={{ clickable: true }}
    >
       {Images.map((item) => (
        <SwiperSlide key={item.id}>
            <img src={item.src} alt={item.alt}/>
            <p className="text">user님<br/>
            user님에게 어울리는 코스를 알려드려요!
            </p>
            <button className="btn"
              type="button"
              onClick={() => {history.push("/coursefeed");}}>
                추천 코스 둘러보기
            </button>
        </SwiperSlide>
          ))}

    </Swiper>
  );
};

export default Banner;