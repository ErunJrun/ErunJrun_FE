import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Image, Text, IconButton } from "../../elements";
import styled from "styled-components";
import Permit from "../../shared/Permit";
import { deleteGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import { useParams } from "react-router-dom";
import groupChat from "../../assets/groupChat.png";
import shareIcon from "../../assets/shareIcon.png";

const MainInfo = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);
  const [editMenu, setEditMenu] = React.useState(false);

  const nickname = localStorage.getItem("nickname");

  const handleEditMenu = () => {
    return setEditMenu(!editMenu);
  };

  const closeEditMenu = () => {
    return setEditMenu(false);
  };

  const editGroup = () => {
    closeEditMenu();
    history.push(`/groupEdit/${groupId}`);
  };

  return (
    <>
      <Grid
        maxWidth="402px"
        width="100%"
        border="1px solid #EFEFEF"
        borderRadius="10px"
        margin="0"
        padding="24px 32px"
        position="fixed"
        left="1158px"
        bottom="280px"
        bg="white"
        height="488px"
      >
        <Grid height="auto" display="flex" justifyContent="space-between">
          <Text width="auto" margin="0" size="18px" bold>
            {detailGroup?.title}
          </Text>

          <Permit>
            {nickname === detailGroup?.nickname ? (
              <Grid width="auto" margin="0" display="flex">
                <IconButton
                  _onClick={handleEditMenu}
                  moreDot
                  color="gray"
                ></IconButton>
                {editMenu ? (
                  <DropContent>
                    <Text
                      _onClick={() => {
                        editGroup();
                      }}
                    >
                      수정하기
                    </Text>
                    <hr />
                    <Text
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

        <Text size="16px" color="#FF2D55" margin="10px auto" bold>
          (약 {detailGroup?.applyEndTime} 후 마감)
        </Text>

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
            <Text width="auto" margin="0" bold>
              {detailGroup?.Appliers?.length} / {detailGroup?.maxPeople}
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
        </Grid>

        <Hr></Hr>

        <ApplyBtn>신청하기</ApplyBtn>
        <Grid
          display="flex"
          justifyContent="space-between"
          margin="16px 0 0 0"
          height="auto"
        >
          <ChatBtn>
            <ChatImg src={groupChat} />
            <Text margin="0">그룹 채팅방</Text>
          </ChatBtn>

          <ShareBtn>
            <ChatImg src={shareIcon} />
            <Text>공유하기</Text>
          </ShareBtn>
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
    box-shadow: 0px 0px 5px gray;
  }
`;

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
    box-shadow: 0px 0px 5px gray;
  }
`;

const ChatImg = styled.img`
  width: 21px;
  height: 19.2px;
  margin-right: 8px;
`;

const DropContent = styled.div`
  position: absolute;
  top: 165px;
  background-color: white;
  min-width: 100px;
  z-index: 1;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export default MainInfo;
