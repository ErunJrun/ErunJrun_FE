import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

// import "./CalendarFilter.css";

const CalendarFilter = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Swiper
      className="mySwiper"
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{ clickable: true }}
      pagination={{ clickable: true }}
    >
      {/* {Images.map((item) => (
        <SwiperSlide key={item.id}>
          <img src={item.src} alt={item.alt} />
          <p className="text">
            user님
            <br />
            user님에게 어울리는 코스를 알려드려요!
          </p>
          <button
            className="btn"
            type="button"
            onClick={() => {
              history.push("/coursefeed");
            }}
          >
            추천 코스 둘러보기
          </button>
        </SwiperSlide>
      ))} */}
    </Swiper>
  );
};

export default CalendarFilter;
