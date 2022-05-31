import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetailDB } from "../redux/modules/course";
import { getGroupDetailDB } from "../redux/modules/feed";

//css, library, package
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

//Image
import shareIcon from "../assets/groupDetail/share.svg";
import shareMob from "../assets/groupDetail/shareMob.png";

//elements
import { Text } from "../elements";

const KakaoShareButton = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params?.groupId;
  const courseId = params?.courseId;

  const groupDetail = useSelector((state) => state.feed.detail);
  const courseDetail = useSelector((state) => state.course.detail);

  useEffect(() => {
    if (groupId) {
      return dispatch(getGroupDetailDB(groupId));
    }
    if (courseId) {
      return dispatch(getCourseDetailDB(courseId));
    }
  }, [groupId]);

  const shareKakao = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }

      kakao.Link.sendDefault({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        // container: ".kakao-link-btn",
        objectType: "feed",
        content: {
          title: groupId ? groupDetail?.title : courseDetail?.title,
          description: groupId ? groupDetail?.content : courseDetail?.content,
          imageUrl: groupId
            ? groupDetail?.thumbnailUrl1
            : courseDetail?.courseImageUrl1,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },

        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <>
      {props.isMobile ? (
        <ShareMob id="kakao-link-btn" onClick={shareKakao} src={shareMob} />
      ) : (
        <>
          <ShareBtn id="kakao-link-btn" onClick={shareKakao}>
            <ChatImg src={shareIcon} />
            <Text cursor="pointer">공유하기</Text>
          </ShareBtn>
        </>
      )}
    </>
  );
};

const ShareBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  width: 159px;
  height: 38px;
  background-color: #efefef;
  border-radius: 3px;
  box-sizing: border-box;
  margin: 0;
  :hover {
    font-weight: 900;
    box-shadow: 1px 1px 5px black;
  }
`;

const ChatImg = styled.img`
  width: 21px;
  height: 19.2px;
  margin-right: 8px;
  cursor: pointer;
`;

const ShareMob = styled.img`
  width: 44px;
  height: 44px;
  margin: 0;
  cursor: pointer;
`;

export default KakaoShareButton;
