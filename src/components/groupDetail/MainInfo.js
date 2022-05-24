import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Image, Text, IconButton } from "../../elements";
import styled from "styled-components";
import Permit from "../../shared/Permit";
import { applyDetailDB, deleteGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import { Link, useParams } from "react-router-dom";
import groupChat from "../../assets/groupDetail/chat.png";
import shareIcon from "../../assets/groupDetail/share.png";
import shoesMint from "../../assets/groupDetail/shoesMint.png";
import KakaoShareButton from "../KakaoShareButton";
import { useMediaQuery } from "react-responsive";
import swal from "sweetalert";

const MainInfo = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);
  const [editMenu, setEditMenu] = React.useState(false);

  const nickname = localStorage.getItem("nickname");
  const isLogin = useSelector((state) => state.user.isLogin);

  const goApply = () => {
    if (isLogin) {
      dispatch(applyDetailDB(props.groupId));
    } else {
      swal({
        text: "로그인 후 이용해 주세요",
        closeOnClickOutside: false,
      }).then(function (result) {
        console.log(result);

        if (result) {
          history.push("/login");
        }
      });
    }
  };

  const handleEditMenu = () => {
    return setEditMenu(!editMenu);
  };

  const closeEditMenu = () => {
    return setEditMenu(false);
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
      <>
        <Grid
          width="375px"
          margin="0"
          padding="24px 16px"
          bg="#FFFFFF"
          height="auto"
        >
          <Grid height="auto" display="flex">
            <Text margin="0 0 12px 0" size="14px" bold>
              {detailGroup?.title}
            </Text>
          </Grid>

          <Grid height="auto">
            <Grid display="flex">
              <Text size="12px" width="auto" margin="0 16px 8px 0">
                일시
              </Text>
              <Text size="12px" width="auto" margin="0" bold>
                {detailGroup?.datetime}
              </Text>
            </Grid>

            <Grid display="flex">
              <Text size="12px" width="auto" margin="0 16px 8px 0">
                장소
              </Text>
              <Text size="12px" width="auto" margin="0" bold>
                {detailGroup?.location}
              </Text>
            </Grid>

            <Grid display="flex">
              <Text size="12px" width="auto" margin="0 16px 8px 0">
                거리
              </Text>
              <Text size="12px" width="auto" margin="0" bold>
                {detailGroup?.distance} km
              </Text>
            </Grid>

            <Grid display="flex">
              <Text size="12px" width="auto" margin="0 16px 8px 0">
                인원
              </Text>
              <Text size="12px" width="auto" margin="0 5px 0 0" bold>
                최대 {detailGroup?.maxPeople}명
              </Text>
              <Text size="12px" width="auto" margin="0" bold color="#FF2D55">
                (잔여 {detailGroup?.maxPeople - detailGroup?.Appliers?.length}
                자리)
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
        padding="18px 32px"
        bg="#FFFFFF"
        height="auto"
        boxShadow="0px 0px 6px rgba(141, 141, 141, 0.25)"
      >
        <Grid height="auto" display="flex" justifyContent="space-between">
          <Text margin="0 0 12px 0" size="18px" bold>
            {detailGroup?.title}
          </Text>

          <Permit>
            {nickname === detailGroup?.nickname ? (
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
                        dispatch(deleteGroupDB(props?.groupId));
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
        <Grid display="flex" alignItems="center">
          <ShoesImg src={shoesMint} />
          <Text
            display="inline"
            size="16px"
            color="#FF2D55"
            margin="0 0 0 4px"
            bold
          >
            약 {detailGroup?.applyEndTime} 후 마감
          </Text>
        </Grid>

        <Hr></Hr>

        <Grid height="auto">
          <Grid display="flex">
            <Text width="auto" margin="0 16px 16px 0">
              일시
            </Text>
            <Text width="auto" margin="0" bold>
              {detailGroup?.datetime}
            </Text>
          </Grid>

          <Grid display="flex">
            <Text width="auto" margin="0 16px 16px 0">
              장소
            </Text>
            <Text width="auto" margin="0" bold>
              {detailGroup?.location}
            </Text>
          </Grid>

          <Grid display="flex">
            <Text width="auto" margin="0 16px 16px 0">
              타입
            </Text>
            <Text width="auto" margin="0" bold>
              {detailGroup?.thema}
            </Text>
          </Grid>

          <Grid display="flex">
            <Text width="auto" margin="0 16px 16px 0">
              인원
            </Text>
            <Text width="auto" margin="0 5px 0 0" bold>
              최대 {detailGroup?.maxPeople}명
            </Text>
            <Text width="auto" margin="0" bold color="#FF2D55">
              (잔여 {detailGroup?.maxPeople - detailGroup?.Appliers?.length}
              자리)
            </Text>
          </Grid>

          <Grid display="flex">
            <Text width="auto" margin="0 16px 16px 0">
              거리
            </Text>
            <Text width="auto" margin="0" bold>
              {detailGroup?.distance} km
            </Text>
          </Grid>

          <Grid display="flex">
            <Text width="auto" margin="0 16px 0 0">
              속도
            </Text>
            <Text width="auto" margin="0" bold>
              {detailGroup?.speed}
            </Text>
          </Grid>
        </Grid>

        <Hr></Hr>

        {detailGroup?.applyEndTime === "0 일" ? (
          <ApplyBtnFalse
            onClick={() => {
              swal("기한이 종료되었습니다.");
            }}
            style={{ background: "black", color: "white" }}
          >
            기한 종료
          </ApplyBtnFalse>
        ) : !detailGroup?.applyState ? (
          <ApplyBtn
            onClick={() => {
              goApply();
            }}
          >
            신청하기
          </ApplyBtn>
        ) : (
          <ApplyBtnFalse
            onClick={() => {
              goApply();
            }}
          >
            신청취소
          </ApplyBtnFalse>
        )}

        {detailGroup?.applyEndTime === "0 일" ? (
          <Grid
            display="flex"
            justifyContent="space-between"
            margin="16px 0 0 0"
            height="auto"
          >
            <EndBtn>
              <ChatImg src={groupChat} />
              <Text margin="0">그룹 채팅방</Text>
            </EndBtn>

            <KakaoShareButton detailGroup={detailGroup} />
          </Grid>
        ) : detailGroup?.applyState ? (
          <Grid
            display="flex"
            justifyContent="space-between"
            margin="16px 0 0 0"
            height="auto"
          >
            <a
              style={{ textDecoration: "none" }}
              href={detailGroup.chattingRoom}
            >
              <ChatBtn style={{ background: "#FAE301" }}>
                <ChatImg src={groupChat} />
                <Text cursor="pointer" margin="0">
                  그룹 채팅방
                </Text>
              </ChatBtn>
            </a>

            <KakaoShareButton detailGroup={detailGroup} />
          </Grid>
        ) : (
          <Grid
            display="flex"
            justifyContent="space-between"
            margin="16px 0 0 0"
            height="auto"
          >
            <ChatBtn>
              <ChatImg src={groupChat} />
              <Text
                _onClick={() => {
                  swal("신청 후 이용해 주세요");
                }}
                cursor="pointer"
                margin="0"
              >
                그룹 채팅방
              </Text>
            </ChatBtn>

            <KakaoShareButton detailGroup={detailGroup} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

const Hr = styled.div`
  border: 1px solid #cbcbcb;
  width: 100%;
  margin: 24px auto;
`;

const ShoesImg = styled.img`
  width: 22px;
  height: auto;
`;

const ApplyBtn = styled.button`
  max-width: 338px;
  width: 100%;
  height: 45px;
  font-size: 18px;
  font-weight: 700;
  color: #68f99e;
  background-color: #030c37;
  padding: 11px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  :hover {
    font-weight: 900;
    box-shadow: 1px 1px 5px black;
  }
`;

const ApplyBtnFalse = styled.button`
  max-width: 338px;
  width: 100%;
  height: 45px;
  font-size: 18px;
  font-weight: 700;
  background-color: white;
  border-radius: 3px;
  padding: 11px;
  color: #030c37;
  border: 1px solid #030c37;
  cursor: pointer;
  :hover {
    font-weight: 900;
    box-shadow: 1px 1px 5px black;
  }
`;

const ChatBtn = styled.div`
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

const EndBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  width: 159px;
  height: 38px;
  background-color: gray;
  border-radius: 3px;
  box-sizing: border-box;
  margin: 0;
`;

const ChatImg = styled.img`
  width: 21px;
  height: 19.2px;
  margin-right: 8px;
`;

const Line = styled.hr`
  width: 106px;
  margin: 16px 0;
  border: 1px solid #dddddd;
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

export default MainInfo;
