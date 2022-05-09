import React from "react";
import { useSelector } from "react-redux";
import { Grid, Image, Text } from "../../elements";
import styled from "styled-components";

const CrewLeaderInfo = () => {
  const detailGroup = useSelector((state) => state.feed.detail);

  return (
    <>
      <Grid
        maxWidth="402px"
        width="100%"
        border="1px solid #EFEFEF"
        borderRadius="10px"
        margin="0"
        padding="24px"
        position="fixed"
        left="1158px"
        bottom="100px"
        bg="white"
        height="140px"
        display="flex"
        alignItems="center"
      >
        <Image
          display="inline-block"
          imageType="circle"
          size="92"
          width="92px"
          height="92px"
          src={detailGroup?.profileUrl}
          margin="0 12px 0 0"
          border="1px solid #68F99E"
        ></Image>

        <Grid
          margin="0"
          width="auto"
          height="auto"
          display="flex"
          flexDirection="column"
        >
          <Grid
            width="auto"
            display="flex"
            height="auto"
            margin="0 0 12px 0"
            alignItems="center"
          >
            <Text margin="0 5px 0 0" size="20px" bold>
              {detailGroup?.nickname}
            </Text>
            <Text margin="0 5px 0 0">크루장</Text>
            <LevelBox>
              <Text color="white" size="12px" margin="0" bold>
                레드 RUNNER
              </Text>
            </LevelBox>
          </Grid>

          <Grid width="auto" height="auto" display="flex" margin="0">
            <Text size="12px" margin="0 5px 0 0">
              굿러너 레벨
            </Text>
            <Text size="12px" margin="0" bold>
              72km
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const LevelBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 5px;
  width: 93px;
  height: 18px;
  background-color: #fc4b4b;
  box-sizing: border-box;
  border-radius: 2px;
`;

export default CrewLeaderInfo;
