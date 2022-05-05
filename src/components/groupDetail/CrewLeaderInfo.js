import React from "react";
import { useSelector } from "react-redux";
import { Grid, Image, Text } from "../../elements";

const CrewLeaderInfo = () => {
  const detailGroup = useSelector((state) => state.feed.detail);
  return (
    <>
      <Grid is_flex height="200px">
        <Grid display="flex" alignItems="center">
          <Image
            imageType="circle"
            size="40"
            src={detailGroup?.profileUrl}
            margin="0 18px 0 0"
          ></Image>
          <Grid>
            <Text bold>{detailGroup?.nickname}</Text>
            <Text>레벨</Text>
            <Text>굿러너 레벨</Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CrewLeaderInfo;
