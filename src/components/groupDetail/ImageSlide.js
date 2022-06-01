import React from "react";

//Redux
import { deleteGroupDB } from "../../redux/modules/feed";
import { useParams } from "react-router-dom";
import { history } from "../../redux/configureStore";
//css, library, package
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "./ImageSlide.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import swal from "sweetalert";

//Image
import backIcon from "../../assets/groupDetail/backIcon.png";
import editIcon from "../../assets/groupDetail/editIcon.png";

//elements
import { Grid, Text } from "../../elements";

//components
import Permit from "../../shared/Permit";

const ImageSlide = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;

  const nickname = localStorage.getItem("nickname");

  const detailGroup = useSelector((state) => state.feed.detail);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [editMenu, setEditMenu] = React.useState(false);

  const closeEditMenu = () => {
    return setEditMenu(false);
  };

  const handleEditMenu = () => {
    return setEditMenu(!editMenu);
  };

  const editGroup = () => {
    if (detailGroup.applyEndTime === "0 일") {
      return swal("모집이 마감 된 공고입니다.");
    } else {
      closeEditMenu();
      history.push(`/groupEdit/${groupId}`);
    }
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
              history.goBack();
            }}
          />

          <Permit>
            {nickname === detailGroup?.nickname ? (
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
                        editGroup();
                      }}
                    >
                      수정하기
                    </Text>
                    <Line />
                    <Text
                      margin="0"
                      _onClick={() => {
                        dispatch(deleteGroupDB(groupId));
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
        {detailGroup?.thumbnailUrl1 ? (
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={detailGroup?.thumbnailUrl1}
            ></img>
          </SwiperSlide>
        ) : (
          ""
        )}
        {detailGroup?.thumbnailUrl2 ? (
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={detailGroup?.thumbnailUrl2}
            ></img>
          </SwiperSlide>
        ) : (
          ""
        )}
        {detailGroup?.thumbnailUrl3 ? (
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={detailGroup?.thumbnailUrl3}
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
      {detailGroup?.thumbnailUrl1 ? (
        <SwiperSlide id="GroupDetailSlide1">
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={detailGroup?.thumbnailUrl1}
          ></img>
        </SwiperSlide>
      ) : (
        ""
      )}
      {detailGroup?.thumbnailUrl2 ? (
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={detailGroup?.thumbnailUrl2}
          ></img>
        </SwiperSlide>
      ) : (
        ""
      )}
      {detailGroup?.thumbnailUrl3 ? (
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={detailGroup?.thumbnailUrl3}
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
  top: 40px;
  left: 250px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  width: 107px;
  height: 104px;
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
