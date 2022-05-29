import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "./ImageSlide.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import backIcon from "../../assets/groupDetail/backIcon.png";
import editIcon from "../../assets/groupDetail/editIcon.png";

import Permit from "../../shared/Permit";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { deleteGroupDB } from "../../redux/modules/feed";
import { useParams } from "react-router-dom";
import { history } from "../../redux/configureStore";
import { Grid, Text } from "../../elements";

import swal from "sweetalert";
import { deleteCourseDB } from "../../redux/modules/course";

const ImageSlide = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const courseId = params.courseId;
  const courseDetail = useSelector((state) => state.course.detail);

  const [editMenu, setEditMenu] = React.useState(false);

  const nickname = localStorage.getItem("nickname");
  const isLogin = useSelector((state) => state.user.isLogin);

  const closeEditMenu = () => {
    return setEditMenu(false);
  };

  const handleEditMenu = () => {
    return setEditMenu(!editMenu);
  };

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
        <TitleWrap>
          <img
            style={{
              width: "34px",
              height: "34px",
              cursor: "pointer",
              margin: "0 0 0 10px",
            }}
            src={backIcon}
            onClick={() => {
              history.push("/coursefeed/0");
            }}
          />

          <Permit>
            {nickname === courseDetail?.user?.nickname ? (
              <Grid margin="0" display="flex" width="auto" height="auto">
                <img
                  style={{
                    width: "34px",
                    height: "34px",
                    cursor: "pointer",
                    marginRight: "13px",
                  }}
                  src={editIcon}
                  onClick={() => {
                    handleEditMenu();
                  }}
                />
                {editMenu ? (
                  <DropContent>
                    <Text
                      margin="0"
                      _onClick={() => {
                        dispatch(deleteCourseDB(courseId));
                        closeEditMenu();
                      }}
                    >
                      삭제하기
                    </Text>
                  </DropContent>
                ) : null}
              </Grid>
            ) : null}
          </Permit>
        </TitleWrap>
        {courseDetail?.courseImageUrl1 ? (
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={courseDetail?.courseImageUrl1}
            ></img>
          </SwiperSlide>
        ) : (
          ""
        )}
        {courseDetail?.courseImageUrl2 ? (
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={courseDetail?.courseImageUrl2}
            ></img>
          </SwiperSlide>
        ) : (
          ""
        )}
        {courseDetail?.courseImageUrl3 ? (
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={courseDetail?.courseImageUrl3}
            ></img>
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
      {courseDetail?.courseImageUrl1 ? (
        <SwiperSlide id="GroupDetailSlide1">
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={courseDetail?.courseImageUrl1}
          ></img>
        </SwiperSlide>
      ) : (
        ""
      )}
      {courseDetail?.courseImageUrl2 ? (
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={courseDetail?.courseImageUrl2}
          ></img>
        </SwiperSlide>
      ) : (
        ""
      )}
      {courseDetail?.courseImageUrl3 ? (
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={courseDetail?.courseImageUrl3}
          ></img>
        </SwiperSlide>
      ) : (
        ""
      )}
    </Swiper>
  );
};

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 375px;
  height: 51px;
  position: absolute;
  top: 0;
  z-index: 3;
`;

const DropContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  box-sizing: border-box;
  top: 20px;
  left: 220px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  width: 107px;
  height: 40px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(149, 149, 149, 0.35);
  padding: 10px;
`;

const Line = styled.hr`
  width: 105px;
  margin: 16px 0;
  border-top: 1px solid #dddddd;
`;

export default ImageSlide;
