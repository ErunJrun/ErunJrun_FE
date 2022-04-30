import React, { useState } from "react";
import styled from "styled-components";
import { Text, Grid } from "../elements";

const GroupFilter = () => {
  const [area, setArea] = useState([
    "전국",
    "서울특별시",
    "경기도",
    "인천광역시",
    "강원도",
    "경기도",
    "충청남도 / 충청북도 / 세종특별자치시 / 대전광역시",
    "경상북도 / 대구광역시",
    "경상남도 / 부산광역시 / 울산광역시",
    "전라남도 / 전라북도 / 광주광역시",
    "제주특별자치시",
  ]);

  return (
    <>
      <Grid>
        <AreaTitle>
          <Text size="18px" bold>
            러닝지역
          </Text>
        </AreaTitle>
        <AreaContents>
          {area.map((e, idx) => {
            return (
              <Text margin="19px 0 14px 41px" bold>
                {e}
              </Text>
            );
          })}
        </AreaContents>

        <AreaTitle>
          <Text size="18px" bold>
            러닝지역
          </Text>
        </AreaTitle>
        <AreaContents>
          {area.map((e, idx) => {
            return (
              <Text margin="19px 0 14px 41px" bold>
                {e}
              </Text>
            );
          })}
        </AreaContents>

        <AreaTitle>
          <Text size="18px" bold>
            러닝지역
          </Text>
        </AreaTitle>
        <AreaContents>
          {area.map((e, idx) => {
            return (
              <Text margin="19px 0 14px 41px" bold>
                {e}
              </Text>
            );
          })}
        </AreaContents>
      </Grid>
    </>
  );
};

const AreaTitle = styled.div`
  position: fixed;
  width: 453px;
  height: 56px;
  left: 280px;
  top: 420px;
  border: 1px solid #000000;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 3px 0px 0px 0px;
`;

const AreaContents = styled.div`
  position: fixed;
  width: 453px;
  height: 228px;
  left: 280px;
  top: 474px;
  background: #ffffff;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 24px;
  box-sizing: border-box;
  overflow: auto;
  padding: 0;
`;

const TimeTitle = styled.div`
  position: fixed;
  width: 453px;
  height: 56px;
  left: 280px;
  top: 420px;
  border: 1px solid #000000;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 3px 0px 0px 0px;
`;

const DistanceContents = styled.div`
  position: fixed;
  width: 453px;
  height: 228px;
  left: 280px;
  top: 474px;
  background: #ffffff;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 24px;
  box-sizing: border-box;
  overflow: auto;
  padding: 0;
`;

export default GroupFilter;
