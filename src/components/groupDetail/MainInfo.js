import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Image, Text, IconButton } from "../../elements";
import styled from "styled-components";
import Permit from "../../shared/Permit";
import { deleteGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import { useParams } from "react-router-dom";

const MainInfo = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);
  const [editMenu, setEditMenu] = React.useState(false);

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
        maxWidth="416px"
        width="100%"
        minHeight="510px"
        border="1px solid  #bababa"
        borderRadius="10px"
        margin="0"
        padding="15px 31px 24px 31px"
      >
        <Grid is_flex>
          <Grid display="flex" alignItems="center">
            <Image
              imageType="circle"
              size="40"
              src={detailGroup?.profileUrl}
              margin="0 18px 0 0"
            ></Image>
            <Text bold>{detailGroup?.nickname}</Text>
          </Grid>
          <Permit>
            <Grid display="flex" justifyContent="right">
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
          </Permit>
        </Grid>

        <Grid>
          <Text bold size="25px">
            {detailGroup?.title}
          </Text>
        </Grid>

        <Hr></Hr>

        <Grid>
          <Text bold>
            러닝일시{"  "}
            <span>
              {"  "} {detailGroup?.datetime}
            </span>
          </Text>
          <Text bold>
            러닝장소{"  "}
            <span>
              {"  "} {detailGroup?.location}
            </span>
          </Text>
          <Text bold>
            러닝타입{"  "}
            <span>
              {"  "} {detailGroup?.thema}
            </span>
          </Text>
          <Text bold>
            러닝인원{"  "}
            <span>
              {"  "} {detailGroup?.Appliers?.length} / {detailGroup?.maxPeople}
            </span>
          </Text>
          <Text bold>
            러닝거리{"  "}
            <span>
              {"  "} {detailGroup?.distance} km
            </span>
          </Text>
        </Grid>

        <Hr></Hr>

        <Text textalign="center" margin="10px auto" bold>
          모집 마감까지 약 {detailGroup?.applyEndTime}시간
        </Text>
        <ApplyBtn>신청하기</ApplyBtn>
        <Grid width="100%" display="flex" justifyContent="space-between">
          <ChatBtn>러닝그룹 채팅방</ChatBtn>
          <ChatBtn>공유하기</ChatBtn>
        </Grid>
      </Grid>
    </>
  );
};

const Hr = styled.div`
  border: 1px solid #e5e5e5;
  width: 100%;
  margin: 16px auto;
`;

const ApplyBtn = styled.button`
  background: #c4c4c4;
  margin: 10px auto;
  border-radius: 3px;
  max-width: 352px;
  width: 100%;
  height: 56px;
  color: black;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  :hover {
    font-weight: 900;
    box-shadow: 1px 1px 5px black;
  }
`;

const ChatBtn = styled.button`
  width: 172px;
  height: 40px;
  border: solid 1px #c4c4c4;
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
