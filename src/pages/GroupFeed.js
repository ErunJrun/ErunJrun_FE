import React from "react";
import { Grid, Text } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import Calendar from "react-calendar";

const GroupFeed = () => {
  return (
    <>
      <Grid>
        <Text border="1px solid red" display="inline" bold size="15px">
          그룹러닝
        </Text>
        <Text
          border="1px solid red"
          display="inline"
          margin="0 10px"
          size="13px"
        >
          함께하고 싶은 러너의 그룹 러닝에 신청해보세요!
        </Text>
      </Grid>

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
