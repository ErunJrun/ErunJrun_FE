import React from "react";
import { useSelector } from "react-redux";
import { Grid, Image, Text, IconButton } from "../../elements";
import styled from "styled-components";

const MainInfo = () => {
  const detailGroup = useSelector((state) => state.feed.detail);

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
          <IconButton moreDot color="gray"></IconButton>
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
              {"  "} {detailGroup?.date}
              {"  "} {detailGroup?.standbyTime}
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
              {"  "} apply인원이 빠져있음 / {detailGroup?.maxPeople}
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
          모집 마감까지 약 0시간
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

export default MainInfo;
