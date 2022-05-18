import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import shareIcon from "../assets/groupDetail/share.png";
import { Text } from "../elements";
import { useLocation } from "react-router-dom";
import { getGroupDetailDB } from "../redux/modules/feed";

const KakaoShareButton = () => {
  const dispatch = useDispatch();
  const groupDetail = useSelector((state) => state.feed.detail);
  const { pathname } = useLocation();

  const params = useParams();
  const groupId = params.groupId;
  console.log(groupDetail);

  // const shareBtn = () => {
  //   createKakaoButton();
  // };

  useEffect(() => {
    console.log("디테일 소환");
    dispatch(getGroupDetailDB(groupId));
  }, [groupId]);

  // useEffect(() => {
  //   console.log("카카오 공유 실행");
  //   createKakaoButton();
  // }, []);

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
          title: groupDetail?.title,
          description: groupDetail?.content,
          imageUrl: groupDetail?.thumbnailUrl1,
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
          // {
          //   title: "앱으로 보기",
          //   link: {
          //     mobileWebUrl: window.location.href,
          //     webUrl: window.location.href,
          //   },
          // },
        ],
      });
    }
  };

  // const createKakaoButton = () => {
  //   // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
  //   if (window.Kakao) {
  //     const kakao = window.Kakao;

  //     // 중복 initialization 방지
  //     if (!kakao.isInitialized()) {
  //       // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
  //       kakao.init(process.env.REACT_APP_KAKAO_KEY);
  //     }

  //     kakao.Link.createDefaultButton({
  //       // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
  //       container: "#kakao-link-btn",
  //       objectType: "location",
  //       address: groupDetail?.location,
  //       addressTitle: groupDetail?.title,
  //       content: {
  //         title: groupDetail?.title,
  //         description: groupDetail?.content,
  //         imageUrl: groupDetail?.thumbnailUrl1,
  //         link: {
  //           mobileWebUrl: "https://developers.kakao.com/",
  //           webUrl: "https://developers.kakao.com/",
  //         },
  //       },

  //       buttons: [
  //         {
  //           title: "웹으로 보기",
  //           link: {
  //             mobileWebUrl: `https://developers.kakao.com/${groupId}`,
  //             webUrl: `https://developers.kakao.com/${groupId}`,
  //           },
  //         },
  //       ],
  //     });
  //   }
  // };

  return (
    <>
      <ShareBtn id="kakao-link-btn" onClick={shareKakao}>
        <ChatImg src={shareIcon} />
        <Text cursor="pointer">공유하기</Text>
      </ShareBtn>
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

export default KakaoShareButton;