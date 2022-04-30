import React, { useState } from "react";
import { Grid, Text } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import GroupFilter from "../components/GroupFilter";
import GroupCard from "../components/GroupCard";

const GroupFeed = () => {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <Grid
        maxWidth="1360px"
        width="100%"
        display="flex"
        justifyContent="left"
        margin="64px auto 0 auto"
        alignItems="center"
      >
        <Text margin="0 10px 0 0" bold size="26px">
          그룹러닝
        </Text>
        <Text size="16px">함께하고 싶은 러너의 그룹 러닝에 신청해보세요!</Text>
      </Grid>

      {/* <Calendar onChange={onChange} value={value} /> */}
      <Grid
        bg="gray"
        maxWidth="1360px"
        width="100%"
        margin="0 auto"
        height="96px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text bold size="50px">
          달력자리
        </Text>
      </Grid>

      <GroupFilter></GroupFilter>
      <GroupCard></GroupCard>

      <StepBtn
        onClick={() => {
          history.push("/groupupload");
        }}
      >
        그룹러닝 만들기
      </StepBtn>
    </>
  );
};

const StepBtn = styled.button`
  width: 184px;
  height: 40px;
  background: #cecece;
  border: 1px solid #4e4e4e;
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  align-items: center;
  color: #000000;
  margin: 10px;
`;

export default GroupFeed;
