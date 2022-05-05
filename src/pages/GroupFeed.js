import React, { useEffect, useState } from "react";
import { Grid, IconButton, Text, Input } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import GroupFilter from "../components/groupFeed/GroupFilter";
import GroupCard from "../components/groupFeed/GroupCard";
import CalendarFilter from "../components/groupFeed/CalendarFilter";
import { useDispatch, useSelector } from "react-redux";

import { getGroupDB } from "../redux/modules/feed";

const GroupFeed = () => {
  const dispatch = useDispatch();
  const [finish, setFinish] = useState("0");
  const [startDate, setStartDate] = useState("2018-01-01");
  const [endDate, setEndDate] = useState("2030-01-01");
  const [region, setRegion] = useState("");
  const [filterTime, setFilterTime] = useState([]);
  const [filterDistance, setFilterDistance] = useState([]);
  const [filterTheme, setFilterTheme] = useState([]);

  const category = [
    region,
    filterTime,
    filterDistance,
    startDate,
    endDate,
    filterTheme,
    finish,
  ];

  const finishCheck = () => {
    if (finish == 0) {
      setFinish(1);
    } else {
      setFinish(0);
    }
  };

  useEffect(() => {
    dispatch(getGroupDB(category));
  }, [finish]);

  // const filterToggle = () => {
  //   setFilter(!filter);
  // };

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

      <Grid
        maxWidth="1360px"
        width="100%"
        margin="10px auto"
        display="flex"
        justifyContent="right"
        alignItems="center"
      ></Grid>

      <GroupFilter finish={finish}></GroupFilter>

      <Grid
        display="flex"
        justifyContent="left"
        alignItems="center"
        margin="28px auto 38px auto"
        maxWidth="1360px"
        width="100%"
      >
        <Text margin="0 15px 0 0" size="24px" bold>
          ㅇㅇㅇ 님을 위한 추천 그룹 러닝입니다!
        </Text>
        <Text margin="0 8px 0 0" size="18px" bold>
          #서울특별시
        </Text>
        <Text size="18px" bold>
          #5km 이상 10km 미만
        </Text>
      </Grid>
      <Hr></Hr>

      <Grid
        maxWidth="1360px"
        width="100%"
        margin="10px auto"
        display="flex"
        justifyContent="right"
        alignItems="center"
      >
        <Text
          cursor="pointer"
          _onClick={() => {
            finishCheck();
          }}
          bold
          margin="0 0 0 10px"
        >
          마감공고 포함하기
        </Text>
      </Grid>

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

const Hr = styled.div`
  border: 1px solid #969696;
  width: 1360px;
  height: 0px;
  margin: 16px auto;
`;

export default GroupFeed;
