import React from "react";
import { useSelector } from "react-redux";
import { Grid, Image, Text } from "../../elements";

const CrewLeaderInfo = () => {
  const detailGroup = useSelector((state) => state.feed.detail);
  return (
    <>
      <Grid display="flex" flexDirection="column" height="auto" margin="10px">
        <Text bold>크루장 프로필</Text>
        <Grid display="flex" alignItems="center">
          <Image
            imageType="circle"
            size="72"
            src={detailGroup?.profileUrl}
            margin="0 18px 0 0"
          ></Image>
          <Grid display="flex" flexDirection="column">
            <Grid display="flex" height="atuo">
              <Text margin="5px" bold>
                {detailGroup?.nickname}
              </Text>
              <Text margin="5px">레드</Text>
              <Text margin="5px">굿러너 레벨 58km</Text>
            </Grid>
            <Text margin="5px">
              주로 한강 그룹 러닝을 즐겨합니다! 한강 러닝 좋아하시는 분들 같이
              뛰어요!
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CrewLeaderInfo;
