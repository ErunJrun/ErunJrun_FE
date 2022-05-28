import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  applyDetailDB,
  deleteGroupDB,
  getGroupDetailDB,
} from "../redux/modules/feed";
import ImageSlide from "../components/courseDetail/ImageSlide";
import MainInfo from "../components/courseDetail/MainInfo";
import { Grid, Text, IconButton } from "../elements";
import ServeInfo from "../components/courseDetail/ServeInfo";
import MapInfo from "../components/courseDetail/MapInfo";
import CrewLeaderInfo from "../components/courseDetail/CrewLeaderInfo";

import CommentList from "../components/comments/CommentList";
import InfoCategory from "../components/courseDetail/InfoCategory";
import mapIcon from "../assets/groupDetail/map.png";
import { useMediaQuery } from "react-responsive";

import backIcon from "../assets/groupDetail/backIcon.png";
import editIcon from "../assets/groupDetail/editIcon.png";
import pageUpIcon from "../assets/groupDetail/pageUpIcon.png";

import Permit from "../shared/Permit";
import { history } from "../redux/configureStore";
import chatMobColor from "../assets/groupDetail/chatMobColor.png";
import chatMob from "../assets/groupDetail/chatMob.png";
import shareMob from "../assets/groupDetail/shareMob.png";
import KakaoShareButton from "../components/KakaoShareButton";

import swal from "sweetalert";

import { Link } from "react-scroll";
import { getCourseDetailDB, getStarPointDB } from "../redux/modules/course";
import StarPoint from "../components/courseDetail/StarPoint";

const CourseDetail = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const courseId = params.courseId;
  const detailCourse = useSelector((state) => state.course.detail);
  const starPoint = useSelector((state) => state.course.starPoint);
  const comment = useSelector((state) => state.comments);
  console.log(comment);
  console.log(starPoint);
  const [editMenu, setEditMenu] = React.useState(false);

  const nickname = localStorage.getItem("nickname");
  const isLogin = useSelector((state) => state.user.isLogin);

  // const goApply = () => {
  //   if (isLogin || nickname) {
  //     dispatch(applyDetailDB(courseId));
  //   } else {
  //     swal({
  //       text: "로그인 후 이용해 주세요",
  //       closeOnClickOutside: false,
  //     }).then(function (result) {
  //       if (result) {
  //         history.push("/login");
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    dispatch(getStarPointDB(courseId));
  }, []);

  useEffect(() => {
    dispatch(getCourseDetailDB(courseId));
  }, [courseId]);

  // if (isMobile) {
  //   return (
  //     <>
  //       <Grid
  //         width="375px"
  //         height="auto"
  //         display="flex"
  //         margin="0 auto"
  //         justifyContent="center"
  //         position="relative"
  //       >
  //         <div id="1Mob"></div>
  //         <Grid
  //           width="375px"
  //           display="flex"
  //           justifyContent="center"
  //           position="relative"
  //         >
  //           <ImageSlide />
  //           <MainInfo groupId={groupId} />
  //           <CrewLeaderInfo {...detailGroup} />
  //           <InfoCategory {...detailGroup} />
  //         </Grid>

  //         {detailGroup?.applyEndTime === "0 일" ? (
  //           <>
  //             <Grid
  //               bg="#030C37"
  //               display="flex"
  //               alignItems="center"
  //               justifyContent="center"
  //               zIndex="3"
  //               position="fixed"
  //               bottom="73px"
  //               left="0"
  //               width="100%"
  //               height="28px"
  //             >
  //               <Grid
  //                 width="375px"
  //                 display="flex"
  //                 alignItems="center"
  //                 justifyContent="center"
  //               >
  //                 <Text size="12px" margin="0" color="white">
  //                   마감되었습니다
  //                 </Text>
  //               </Grid>
  //             </Grid>

  //             <Grid
  //               zIndex="3"
  //               bg="white"
  //               justifyContent="center"
  //               position="fixed"
  //               bottom="0"
  //               left="0"
  //               width="100%"
  //               height="73px"
  //               display="flex"
  //               padding="10px 16px"
  //             >
  //               <Grid
  //                 width="375px"
  //                 display="flex"
  //                 justifyContent="space-between"
  //                 alignItems="center"
  //                 padding="0"
  //               >
  //                 <ChatMob
  //                   onClick={() => {
  //                     swal("기한이 종료되었습니다.");
  //                   }}
  //                   src={chatMob}
  //                 />

  //                 <ShareMob
  //                   onClick={() => {
  //                     swal("기한이 종료되었습니다.");
  //                   }}
  //                   src={shareMob}
  //                 />

  //                 <ApplyBtn style={{ background: "gray" }}>
  //                   <Text margin="0" size="14px">
  //                     기한 종료
  //                   </Text>
  //                 </ApplyBtn>
  //               </Grid>
  //             </Grid>
  //           </>
  //         ) : (
  //           <>
  //             <Grid
  //               bg="#030C37"
  //               display="flex"
  //               alignItems="center"
  //               justifyContent="center"
  //               zIndex="3"
  //               position="fixed"
  //               bottom="73px"
  //               left="0"
  //               width="100%"
  //               height="28px"
  //             >
  //               <Grid
  //                 width="375px"
  //                 display="flex"
  //                 alignItems="center"
  //                 justifyContent="center"
  //               >
  //                 <Text size="12px" margin="0" color="white">
  //                   약 {detailGroup?.applyEndTime} 후 마감!
  //                 </Text>
  //               </Grid>
  //             </Grid>

  //             <Grid
  //               zIndex="3"
  //               bg="white"
  //               justifyContent="center"
  //               position="fixed"
  //               bottom="0"
  //               left="0"
  //               width="100%"
  //               height="73px"
  //               display="flex"
  //               padding="10px 16px"
  //             >
  //               <Grid
  //                 width="375px"
  //                 display="flex"
  //                 justifyContent="space-between"
  //                 alignItems="center"
  //                 padding="0"
  //               >
  //                 {detailGroup?.chattingRoom === "" ? (
  //                   detailGroup?.applyState ? (
  //                     <ChatMob
  //                       onClick={() => {
  //                         swal("링크가 없습니다.");
  //                       }}
  //                       src={chatMob}
  //                     />
  //                   ) : (
  //                     <ChatMob
  //                       onClick={() => {
  //                         swal("신청 후 이용해주세요");
  //                       }}
  //                       src={chatMob}
  //                     />
  //                   )
  //                 ) : detailGroup?.applyState ? (
  //                   <a
  //                     style={{ textDecoration: "none", height: "44px" }}
  //                     href={detailGroup?.chattingRoom}
  //                   >
  //                     <ChatMob src={chatMobColor} />
  //                   </a>
  //                 ) : (
  //                   <ChatMob
  //                     onClick={() => {
  //                       swal("신청 후 이용해주세요");
  //                     }}
  //                     src={chatMob}
  //                   />
  //                 )}

  //                 <KakaoShareButton isMobile={true} detailGroup={detailGroup} />

  //                 {detailGroup?.applyState ? (
  //                   <ApplyBtn
  //                     style={{
  //                       background: "white",
  //                       border: "1px solid #68f99e",
  //                     }}
  //                     onClick={() => {
  //                       goApply();
  //                     }}
  //                   >
  //                     <Text
  //                       color="black"
  //                       _onClick={() => {
  //                         goApply();
  //                       }}
  //                       margin="0"
  //                       size="14px"
  //                     >
  //                       신청취소
  //                     </Text>
  //                   </ApplyBtn>
  //                 ) : (
  //                   <ApplyBtn
  //                     onClick={() => {
  //                       goApply();
  //                     }}
  //                   >
  //                     <Text
  //                       _onClick={() => {
  //                         goApply();
  //                       }}
  //                       margin="0"
  //                       size="14px"
  //                     >
  //                       신청하기
  //                     </Text>
  //                   </ApplyBtn>
  //                 )}
  //               </Grid>
  //             </Grid>
  //           </>
  //         )}
  //         <Link
  //           style={{ position: "relative" }}
  //           to="1Mob"
  //           spy={true}
  //           smooth={true}
  //         >
  //           <PageUpBtn src={pageUpIcon} />
  //         </Link>
  //       </Grid>
  //     </>
  //   );
  // }

  return (
    <>
      <Grid
        width="1200px"
        height="auto"
        display="flex"
        justifyContent="space-between"
        margin="80px auto 65px auto"
        position="relative"
      >
        <Grid width="758px">
          <ImageSlide />
          <InfoCategory />
          <div id="추천 코스정보"></div>
          <ServeInfo />
          <Grid display="flex" alignItems="center" margin="0 0 15px 0">
            <MapIconImg src={mapIcon} />
            <Text bold size="18px">
              지도로 보는 코스 정보
            </Text>
            <MapInfo />
            <div id="추천 소개"></div>
          </Grid>
          <Grid margin="0 0 96px 0">
            <Text bold size="18px" margin="0 0 22px 0">
              크루장의 소개글
            </Text>
            <Text size="16px">{detailCourse?.content}</Text>
          </Grid>

          <Grid
            width="758px"
            padding="40px 123px"
            bg="white"
            border="1px solid #B8B8B8"
            borderRadius="3px"
            margin="0 0 96px 0"
          >
            <Grid
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="511px"
            >
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="0"
                width="auto"
              >
                <Text width="auto" margin="0 0 24px 0" bold>
                  코스 별점
                </Text>
                <StarPoint starPoint={starPoint} starOne={true} />
                <Text width="auto" margin="16px 0 0 0" size="20px" bold>
                  {starPoint?.starPoint ? starPoint?.starPoint : "0.0"} /{" "}
                  <span style={{ fontWeight: "500" }}>5.0</span>
                  <span style={{ fontSize: "16px", color: "#7b7b7b" }}>
                    {"  "}({starPoint?.starPeople ? starPoint?.starPeople : "0"}
                    )
                  </span>
                </Text>
              </Grid>

              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                margin="0"
                width="auto"
              >
                <Text width="auto" margin="0 0 24px 0" bold>
                  내가 준 별점
                </Text>
                <StarPoint courseId={courseId} />
                <Text width="auto" margin="16px 0 0 0" size="20px">
                  {starPoint?.myStarPoint} / 5.0
                </Text>
              </Grid>
            </Grid>
          </Grid>

          <CommentList course={true} />
          <div id="추천 리뷰"></div>
        </Grid>
        <Grid
          position="sticky"
          top="170px"
          display="flex"
          flexDirection="column"
          margin="0"
          width="auto"
        >
          <Grid
            cursor="pointer"
            width="402px"
            border="1px solid #EFEFEF"
            borderRadius="3px"
            margin="0 0 16px 0"
            padding="10px"
            bg="white"
            height="120px"
            display="flex"
            alignItems="center"
            boxShadow="0px 0px 6px rgba(141, 141, 141, 0.25)"
            position="relative"
            hover="box-shadow:0px 0px 6px rgba(141, 141, 141, 0.8);"
          >
            <Grid
              display="flex"
              justifyContent="space-between"
              width="233px"
              margin="0 auto"
            >
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="0"
                width="auto"
              >
                <Text
                  color="#909090"
                  size="14px"
                  width="auto"
                  margin="0 0 14px 0"
                  height="auto"
                >
                  코스 별점
                </Text>
                <Grid
                  display="flex"
                  alignItems="center"
                  width="auto"
                  height="auto"
                  margin="0"
                  justifyContent="center"
                >
                  <StarPoint starOne={true} />
                  <Text height="auto" width="auto" margin="0" size="20px" bold>
                    {starPoint?.starPoint ? starPoint?.starPoint : 5.0}
                  </Text>
                </Grid>
              </Grid>

              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="0"
                width="auto"
              >
                <Text
                  color="#909090"
                  size="14px"
                  width="auto"
                  margin="0 0 14px 0"
                >
                  코스 리뷰
                </Text>
                <Text width="auto" margin="0" size="20px">
                  {comment.list ? comment?.list?.length : "0"}개
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <MainInfo groupId={courseId} />
          <CrewLeaderInfo {...detailCourse} />
        </Grid>
      </Grid>
    </>
  );
};

const MapIconImg = styled.img`
  width: 14px;
  height: 20px;
  margin: 0 10px 0 0;
`;

const ChatMob = styled.img`
  width: 44px;
  height: 44px;
  margin: 0;
  cursor: pointer;
`;

const ShareMob = styled.img`
  width: 44px;
  height: 44px;
  margin: 0;
  cursor: pointer;
`;

const ApplyBtn = styled.div`
  background-color: #68f99e;
  border: 1px solid #68f99e;
  box-sizing: border-box;
  width: 239px;
  height: 44px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  :hover {
  }
`;

const PageUpBtn = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 0;
  position: fixed;
  bottom: 117px;
  right: 9px;
  z-index: 4;
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

export default CourseDetail;
