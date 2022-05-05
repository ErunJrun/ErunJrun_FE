import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import Images from './Images';
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import { Text, Grid } from "../../elements"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//import "../../shared/styles.css";
import "./Banner.css"

const Banner = () => {
  return (
    <Box>
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
            <div className="text">
              <Text bold size="30px" color="white">
                김다운 님,
              </Text>
              <Text bold size="22px" color="#ECF1F1"> 
                 김다운 님에게 어울리는 코스를 알려드려요!
              </Text>     
            </div>
            <div className='grid'>
              <div className="category"># 고양시</div>
              <div className="category"># 10km</div>
            </div>
            <button className="btn"
              type="button"
              onClick={() => {
              history.push("/coursefeed");
              }}>
                추천 코스 보러가기
            </button>
        </SwiperSlide>
          ))}
    </Swiper>
    </Box>
  );
};

const Box = styled.div`
  width: 90vw;
  height: 800px;
  margin-left: -200px;
`;

export default Banner;