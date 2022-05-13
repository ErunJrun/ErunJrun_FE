import React from "react";
import { useSelector } from "react-redux";
import { Grid, Image, Text } from "../../elements";
import styled from "styled-components";

import LevelBox from "./LevelBox";

import chatIcon from "../../assets/groupDetail/chat.png";
import crewLeaderFlag from "../../assets/groupDetail/crewLeaderFlag.png";
import crewLeaderName from "../../assets/groupDetail/crewLeaderName.png";
import mapIcon from "../../assets/groupDetail/map.png";
import shareIcon from "../../assets/groupDetail/share.png";
import shoesMintIcon from "../../assets/groupDetail/shoesMint.png";

const CrewLeaderInfo = (props) => {
  const detailGroup = useSelector((state) => state.feed.detail);

  return (
    <>
      <Grid
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
          <Text margin="0 5px 10px 0" size="16px" bold>
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
            <Text size="14px" margin="0 5px 0 0">
              굿러너 레벨
            </Text>
            <Text size="14px" margin="0" bold>
              72km
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
`;

const CrewLeaderName = styled.img`
  width: 43px;
  height: auto;
  position: absolute;
  right: 16px;
  top: 0;
`;

const CrewLeaderProfile = styled.img`
  border-radius: 100%;
  width: 101px;
  height: 101px;
  border: 2px solid #dddddd;
`;

const CrewFlag = styled.img`
  width: 16px;
  height: auto;
  margin-right: 6px;
`;
export default CrewLeaderInfo;
