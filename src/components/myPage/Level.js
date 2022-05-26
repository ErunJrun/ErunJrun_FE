import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MyModal from "./MyModal";
import Progress from "./Progress";
import styled from "styled-components";
import { Text, Grid } from "../../elements";
import { useMediaQuery } from "react-responsive";

const Level = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const profile_list = useSelector((state) => state.mypage.list);
  if (isMobile) {
    return (
      <Grid width="350px" margin="45px auto 0px auto">
        <Text size="12px" margin="0 0 0 0px">
          굿러너 레벨 &nbsp;
          <span style={{ color: "#2f80ed" }}>
            {profile_list?.userInfo?.mannerPoint}km
          </span>
        </Text>
        <MyModal />
        <Progress done={profile_list?.userInfo?.mannerPoint} />
      </Grid>
    );
  }
  return (
    <div>
      <Box>
        <Text bold size="16px">
          굿러너 레벨
        </Text>
        <MyModal />
      </Box>
      <Progress done={profile_list?.userInfo?.mannerPoint} />
    </div>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  margin: -15px 0px -24px 176px;
`;

export default Level;
