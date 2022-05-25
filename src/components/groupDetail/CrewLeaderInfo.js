import React from "react";
import { useSelector } from "react-redux";
import { Grid, Image, Text } from "../../elements";
import styled from "styled-components";

import { history } from "../../redux/configureStore";
import { useMediaQuery } from "react-responsive";

import LevelBox from "./LevelBox";

import chatIcon from "../../assets/groupDetail/chat.svg";
import crewLeaderFlag from "../../assets/groupDetail/crewLeaderFlag.png";
import crewLeaderName from "../../assets/groupDetail/crewLeaderName.png";
import mapIcon from "../../assets/groupDetail/map.png";
import shareIcon from "../../assets/groupDetail/share.svg";
import shoesMintIcon from "../../assets/groupDetail/shoesMint.png";

const CrewLeaderInfo = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const detailGroup = useSelector((state) => state.feed.detail);

  if (isMobile) {
    return (
      <>
        <Grid
          cursor="pointer"
          width="343px"
          border="1px solid #F0F0F0"
          borderRadius="3px"
          margin="0 0 16px 0"
          padding="12px"
          bg="white"
          height="88px"
          display="flex"
          alignItems="center"
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.05);"
          _onClick={() => {
            history.push(`/mypage/${detailGroup?.userId}`);
          }}
          position="relative"
        >
          <CrewLeaderName src={crewLeaderName} />
          <Grid justifyContent="center" display="flex" width="auto">
            <CrewLeaderProfile
              style={{ width: "56px", height: "56px" }}
              src={detailGroup?.profileUrl}
            ></CrewLeaderProfile>
            <LevelWrap>
              <LevelBox userLevel={detailGroup?.userLevel}></LevelBox>
            </LevelWrap>
          </Grid>

          <Grid
            margin="0 0 0 20px"
            width="auto"
            height="auto"
            display="flex"
            flexDirection="column"
          >
            <Text margin="0 5px 10px 0" size="12px" bold>
              {detailGroup?.nickname}
            </Text>

            <Grid
              width="auto"
              height="auto"
              display="flex"
              margin="0"
              alignItems="center"
            >
              <CrewFlag style={{ width: "13px" }} src={crewLeaderFlag} />
              <Text cursor="pointer" size="10px" margin="0 5px 0 0">
                굿러너 레벨
              </Text>
              <Text cursor="pointer" size="10px" margin="0" bold>
                {detailGroup?.mannerPoint}km
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
        cursor="pointer"
        maxWidth="402px"
        width="100%"
        border="1px solid #EFEFEF"
        borderRadius="3px"
        margin="16px 0 0 0"
        padding="16px 32px"
        bg="white"
        height="140px"
        display="flex"
        alignItems="center"
        boxShadow="0px 0px 6px rgba(141, 141, 141, 0.25)"
        position="relative"
        _onClick={() => {
          history.push(`/mypage/${detailGroup?.userId}`);
        }}
        hover="box-shadow:0px 0px 6px rgba(141, 141, 141, 0.8);"
      >
        <CrewLeaderName src={crewLeaderName} />
        <Grid justifyContent="center" display="flex" width="auto">
          <CrewLeaderProfile src={detailGroup?.profileUrl}></CrewLeaderProfile>
          <LevelWrap>
            <LevelBox userLevel={detailGroup?.userLevel}></LevelBox>
          </LevelWrap>
        </Grid>

        <Grid
          margin="0 0 0 20px"
          width="auto"
          height="auto"
          display="flex"
          flexDirection="column"
        >
          <Text cursor="pointer" margin="0 5px 10px 0" size="16px" bold>
            {detailGroup?.nickname}
          </Text>

          <Grid
            width="auto"
            height="auto"
            display="flex"
            margin="0"
            alignItems="center"
          >
            <CrewFlag src={crewLeaderFlag} />
            <Text cursor="pointer" size="14px" margin="0 5px 0 0">
              굿러너 레벨
            </Text>
            <Text cursor="pointer" size="14px" margin="0" bold>
              {detailGroup?.mannerPoint}km
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const LevelWrap = styled.div`
  position: absolute;
  bottom: 10px;
  cursor: pointer;
`;

const CrewLeaderName = styled.img`
  width: 43px;
  height: auto;
  position: absolute;
  right: 16px;
  top: 0;
  cursor: pointer;
`;

const CrewLeaderProfile = styled.img`
  border-radius: 100%;
  width: 101px;
  height: 101px;
  border: 2px solid #dddddd;
  cursor: pointer;
`;

const CrewFlag = styled.img`
  width: 16px;
  height: auto;
  margin-right: 6px;
  cursor: pointer;
`;
export default CrewLeaderInfo;
