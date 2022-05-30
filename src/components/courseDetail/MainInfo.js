import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Image, Text, IconButton } from "../../elements";
import styled from "styled-components";
import Permit from "../../shared/Permit";
import { applyDetailDB, deleteGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import { Link, useParams } from "react-router-dom";
import groupChat from "../../assets/groupDetail/chat.svg";
import bookMarkGreen_detail from "../../assets/courseFeed/bookMarkGreen_detail.svg";
import bookMarkLine_detail from "../../assets/courseFeed/bookMarkLine_detail.svg";
import KakaoShareButton from "../KakaoShareButton";
import { useMediaQuery } from "react-responsive";
import swal from "sweetalert";
import {
  bookmarkDB,
  bookmarkDetailDB,
  deleteCourseDB,
  getCourseDetailDB,
  resetCourse,
} from "../../redux/modules/course";
import { getCookie } from "../../shared/Cookie";

const MainInfo = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailCourse = useSelector((state) => state.course.detail);
  const [editMenu, setEditMenu] = React.useState(false);

  const nickname = localStorage.getItem("nickname");
  const token = getCookie("accessToken");

  const handleEditMenu = () => {
    return setEditMenu(!editMenu);
  };

  const closeEditMenu = () => {
    return setEditMenu(false);
  };

  if (isMobile) {
    return (
      <>
        <Grid
          width="375px"
          margin="0"
          padding="16px"
          bg="#FFFFFF"
          height="auto"
        >
          <Grid height="auto" display="flex">
            <Text margin="0 0 12px 0" size="14px" bold>
              {detailCourse?.title}
            </Text>
          </Grid>

          <Grid height="auto">
            <Grid display="flex">
              <Text
                size="13px"
                width="auto"
                margin="0 16px 8px 0"
                color="#7B7B7B"
              >
                장소
              </Text>
              <Text size="13px" width="auto" margin="0">
                {detailCourse?.location}
              </Text>
            </Grid>

            <Grid display="flex">
              <Text
                size="13px"
                width="auto"
                margin="0 16px 8px 0"
                color="#7B7B7B"
              >
                거리
              </Text>
              <Text size="13px" width="auto" margin="0">
                {detailCourse?.distance} km
              </Text>
            </Grid>

            <Grid display="flex">
              <Text
                size="12px"
                width="auto"
                margin="0 16px 8px 0"
                color="#7B7B7B"
              >
                타입
              </Text>
              <Text size="12px" width="auto" margin="0">
                {detailCourse?.thema}
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid
        width="402px"
        border="1px solid #EFEFEF"
        borderRadius="3px"
        margin="0"
        padding="24px 32px"
        bg="#FFFFFF"
        height="auto"
        boxShadow="0px 0px 6px rgba(141, 141, 141, 0.25)"
      >
        <Grid
          width="300px"
          height="auto"
          display="flex"
          justifyContent="space-between"
        >
          <Text width="300px" margin="0 0 12px 0" size="18px" bold>
            {detailCourse?.title}
          </Text>

          <Permit>
            {nickname === detailCourse?.user?.nickname ? (
              <Grid margin="0" display="flex" width="auto">
                <IconButton
                  cursor="pointer"
                  _onClick={handleEditMenu}
                  moreDot
                  color="gray"
                ></IconButton>
                {editMenu ? (
                  <DropContent>
                    <Text
                      cursor="pointer"
                      margin="0"
                      _onClick={() => {
                        dispatch(deleteCourseDB(detailCourse?.courseId));
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
        </Grid>

        <Hr></Hr>

        <Grid height="auto">
          <Grid display="flex">
            <Text regular width="auto" margin="0 16px 16px 0">
              장소
            </Text>
            <Text width="auto" margin="0">
              {detailCourse?.location}
            </Text>
          </Grid>

          <Grid display="flex">
            <Text regular width="auto" margin="0 16px 16px 0">
              거리
            </Text>
            <Text width="auto" margin="0">
              {detailCourse?.distance} km
            </Text>
          </Grid>

          <Grid display="flex">
            <Text regular width="auto" margin="0 16px 16px 0">
              테마
            </Text>
            <Text width="auto" margin="0">
              {detailCourse?.thema}
            </Text>
          </Grid>
        </Grid>

        <Hr></Hr>

        <Grid
          display="flex"
          justifyContent="space-between"
          margin="16px 0 0 0"
          height="auto"
        >
          {detailCourse?.bookmark ? (
            <BookMarkFalse
              onClick={() => {
                if (!token) {
                  swal({
                    text: "로그인 후 이용해 주세요",
                    closeOnClickOutside: false,
                  }).then(function (result) {
                    if (result) {
                      return history.push("/login");
                    }
                  });
                }
                dispatch(bookmarkDetailDB(detailCourse?.courseId));
              }}
            >
              <BookImg src={bookMarkLine_detail} />
              <Text color="#030C37" cursor="pointer" margin="0">
                북마크 취소
              </Text>
            </BookMarkFalse>
          ) : (
            <BookMarkTrue
              onClick={() => {
                if (!token) {
                  swal({
                    text: "로그인 후 이용해 주세요",
                    closeOnClickOutside: false,
                  }).then(function (result) {
                    if (result) {
                      return history.push("/login");
                    }
                  });
                }
                dispatch(bookmarkDetailDB(detailCourse?.courseId));
              }}
              cursor="pointer"
              margin="0"
            >
              <BookImg src={bookMarkGreen_detail} />
              <Text color="#68F99E">북마크 저장</Text>
            </BookMarkTrue>
          )}

          <KakaoShareButton detailCourse={detailCourse} />
        </Grid>
      </Grid>
    </>
  );
};

const Hr = styled.div`
  border: 1px solid #cbcbcb;
  width: 100%;
  margin: 24px auto;
`;

const BookMarkTrue = styled.div`
  padding: 10px 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 164px;
  height: 38px;
  border: 1px solid #030c37;
  background: #030c37;
  border-radius: 3px;
  box-sizing: border-box;
  margin: 0;
  :hover {
    font-weight: 900;
    box-shadow: 1px 1px 5px black;
  }
`;

const BookMarkFalse = styled.div`
  padding: 10px 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 164px;
  height: 38px;
  border: 1px solid #030c37;
  background: white;
  border-radius: 3px;
  box-sizing: border-box;
  margin: 0;
  :hover {
    font-weight: 900;
    box-shadow: 1px 1px 5px black;
  }
`;
const BookImg = styled.img`
  width: 14px;
  height: auto;
  margin-right: 6px;
`;

const Line = styled.hr`
  width: 106px;
  margin: 16px 0;
  border-top: 1px solid #dddddd;
`;

const DropContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  box-sizing: border-box;
  top: 155px;
  left: 240px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  width: 107px;
  height: 40px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(149, 149, 149, 0.35);
  padding: 10px;
`;

export default MainInfo;
