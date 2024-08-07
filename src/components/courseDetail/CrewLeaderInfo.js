import React from "react";

//Redux
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";

//css, library, package
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

//Image
import crewLeaderFlag from "../../assets/groupDetail/crewLeaderFlag.png";

//elements
import { Grid, Image, Text } from "../../elements";

//components
import LevelBox from "./LevelBox";

const CrewLeaderInfo = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const detailCourse = useSelector((state) => state.course.detail);

  if (isMobile) {
    return (
      <>
        <Grid
          cursor="pointer"
          width="343px"
          border="1px solid #F0F0F0"
          borderRadius="3px"
          margin="0 0 16px 0"
          padding="12px 24px"
          bg="white"
          height="88px"
          display="flex"
          alignItems="center"
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.05);"
          _onClick={() => {
            history.push(`/mypage/${detailCourse?.user?.userId}`);
          }}
          position="relative"
        >
          <Grid justifyContent="center" display="flex" width="auto">
            <CrewLeaderProfile
              style={{ width: "56px", height: "56px" }}
              src={detailCourse?.user?.profileUrl}
            ></CrewLeaderProfile>
            <LevelWrap>
              <LevelBox userLevel={detailCourse?.user?.userLevel}></LevelBox>
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
              {detailCourse?.user?.nickname}
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
                {detailCourse?.user?.mannerPoint}km
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
          history.push(`/mypage/${detailCourse?.user?.userId}`);
        }}
        hover="box-shadow:0px 0px 6px rgba(141, 141, 141, 0.8);"
      >
        <Grid justifyContent="center" display="flex" width="auto">
          <CrewLeaderProfile
            src={detailCourse?.user?.profileUrl}
          ></CrewLeaderProfile>
          <LevelWrap>
            <LevelBox userLevel={detailCourse?.user?.userLevel}></LevelBox>
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
            {detailCourse?.user?.nickname}
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
              {detailCourse?.user?.mannerPoint}km
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
