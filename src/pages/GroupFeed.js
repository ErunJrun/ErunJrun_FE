import React, { useState } from "react";
import { Grid, IconButton, Text, Input } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import GroupFilter from "../components/groupFeed/GroupFilter";
import GroupCard from "../components/groupFeed/GroupCard";
import CalendarFilter from "../components/groupFeed/CalendarFilter";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../redux/modules/filter";
import { getGroupDB } from "../redux/modules/feed";

const GroupFeed = () => {
  const dispatch = useDispatch();
  const filterArea = useSelector((state) => state.filter.area);
  const filterTime = useSelector((state) => state.filter.time);
  const filterDistance = useSelector((state) => state.filter.distance);
  const [finish, setFinish] = useState(0);
  console.log(filterArea, filterTime, filterDistance, finish);

  const [filter, setFilter] = useState(false);
  const [reset, setReset] = useState(false);
  const [area, setArea] = useState([
    "전국",
    "서울특별시",
    "경기도",
    "인천광역시",
    "강원도",
    "충청도 / 세종특별자치시 / 대전광역시",
    "경상북도 / 대구광역시",
    "경상남도 / 부산광역시 / 울산광역시",
    "전라도 / 광주광역시",
    "제주특별자치시",
  ]);

  const [time, setTime] = useState([
    "모든 시간대",
    "00:00 ~ 04:00",
    "04:00 ~ 08:00",
    "08:00 ~ 12:00",
    "12:00 ~ 16:00",
    "16:00 ~ 20:00",
    "20:00 ~ 24:00",
  ]);

  const [distance, setDistance] = useState([
    "전체",
    "5km 미만",
    "5km 이상 10km 미만",
    "10km 이상 15km 미만",
    "15km 이상",
  ]);

  const filterList = useSelector((state) => state.filter);
  console.log(filterList);

  const finishCheck = () => {
    if (finish == 0) {
      setFinish(1);
      dispatch(getGroupDB(category));
    } else {
      setFinish(0);
      dispatch(getGroupDB(category));
    }
  };

  const category = [filterArea, filterTime, filterDistance, finish];

  const filterToggle = () => {
    setFilter(!filter);
  };

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

      <CalendarFilter></CalendarFilter>

      <Grid
        maxWidth="1360px"
        width="100%"
        margin="10px auto"
        display="flex"
        justifyContent="right"
        alignItems="center"
      >
        <IconButton filter size="25" cursor="pointer" _onClick={filterToggle} />
        <Text margin="0 0 0 10px" bold _onClick={filterToggle} cursor="pointer">
          검색필터
        </Text>
      </Grid>
      {filter ? (
        <GroupFilter
          finish={finish}
          setReset={setReset}
          setFilter={setFilter}
        ></GroupFilter>
      ) : null}

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
        display="flex"
        justifyContent="left"
        alignItems="center"
        margin="28px auto 38px auto"
        maxWidth="1360px"
        width="100%"
      >
        {filterList.area.map((e) => {
          return (
            <Text
              border="1px solid gray"
              borderRadius="6px"
              padding="5px"
              bold
              margin="0 10px 0 0"
            >
              #{area[e]}
            </Text>
          );
        })}

        {filterList.time.map((e) => {
          return (
            <Text
              border="1px solid gray"
              borderRadius="6px"
              padding="5px"
              bold
              margin="0 10px 0 0"
            >
              #{time[e]}
            </Text>
          );
        })}

        {filterList.distance.map((e) => {
          return (
            <Text
              border="1px solid gray"
              borderRadius="6px"
              padding="5px"
              bold
              margin="0 10px 0 0"
            >
              #{distance[e]}
            </Text>
          );
        })}
        {reset ? (
          <Text
            _onClick={() => {
              setReset(false);
              dispatch(filterActions.resetFilter());
              dispatch(getGroupDB("all"));
            }}
            cursor="pointer"
            margin="0"
            color="gray"
          >
            선택 초기화
          </Text>
        ) : (
          ""
        )}
      </Grid>

      <Grid
        maxWidth="1360px"
        width="100%"
        margin="10px auto"
        display="flex"
        justifyContent="right"
        alignItems="center"
      >
        <input
          onClick={() => {
            finishCheck();
          }}
          type="checkbox"
        ></input>
        <Text bold margin="0 0 0 10px">
          마감공고 포함하기
        </Text>
      </Grid>

      <GroupCard finish={finish}></GroupCard>

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
