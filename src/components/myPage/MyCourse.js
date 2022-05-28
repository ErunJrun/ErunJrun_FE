import React from "react";
import { Text, Grid } from "../../elements";
import styled from "styled-components";

import { history } from "../../redux/configureStore";

const Bookmark = () => {
  return (
    <Grid>
      <Box>내가 만든 추천코스가 없습니다</Box>
    </Grid>
  );
};

const Box = styled.div`
  font-weight: 900;
  font-size: 26px;
  color: #333;
  height: 100px;
  width: 1220px;
  background-color: #fff;
  padding: 250px 11px;
  text-align: center;
  border: none;
`;
export default Bookmark;
