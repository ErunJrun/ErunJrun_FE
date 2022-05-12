import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import AlarmStart from "./AlarmStart";
import AlarmComment from "./AlarmComment";
import AlarmUpdate from "./AlarmUpdate";

const Alarm = () => {
  const alarmList = useSelector((state) => state.user.alarm);

  console.log(alarmList);

  return (
    <>
      <Wrap>
        <Text margin="0 0 24px 24px">알림</Text>
        {alarmList?.data?.length === {}
          ? null
          : alarmList?.data?.map((alarm, idx) => {
              if (alarm.category === "start" && alarm.role === "host") {
                return (
                  <AlarmStart
                    key={idx}
                    category={"start"}
                    role={"host"}
                    {...alarm}
                  />
                );
              }

              if (alarm.category === "start" && alarm.role === "attendance") {
                return (
                  <AlarmStart
                    key={idx}
                    category={"start"}
                    role={"attendance"}
                    {...alarm}
                  />
                );
              }

              if (alarm.category === "dDay") {
                return <AlarmStart key={idx} category={"dDay"} {...alarm} />;
              }

              if (alarm.category === "end" && alarm.role === "host") {
                return (
                  <AlarmStart
                    key={idx}
                    category={"end"}
                    role={"host"}
                    {...alarm}
                  />
                );
              }

              if (alarm.category === "end" && alarm.role === "attendance") {
                return (
                  <AlarmStart
                    key={idx}
                    category={"end"}
                    role={"attendance"}
                    {...alarm}
                  />
                );
              }

              if (alarm.category === "comment") {
                return (
                  <AlarmComment key={idx} category={"comment"} {...alarm} />
                );
              }

              if (alarm.category === "recomment") {
                return (
                  <AlarmComment key={idx} category={"recomment"} {...alarm} />
                );
              }

              if (alarm.category === "update") {
                return <AlarmUpdate key={idx} category={"update"} {...alarm} />;
              }

              if (alarm.category === "delete") {
                return <AlarmUpdate key={idx} category={"delete"} {...alarm} />;
              }
            })}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  z-index: 3;
  position: absolute;
  left: 63%;
  top: 80px;
  margin: 0;
  padding: 24px 10px;
  max-width: 400px;
  box-sizing: border-box;
  width: 100%;
  height: 472px;
  background: #ffffff;
  box-shadow: 3px 8px 17px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  overflow: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background-color: gray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transition;
  }
`;

export default Alarm;
