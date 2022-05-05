import { textAlign } from "@mui/system";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Text, Grid } from "../../elements";
import { getGroupDB } from "../../redux/modules/feed";
import CalendarFilter from "./CalendarFilter";
import DistanceFilter from "./DistanceFilter";
import TimeFilter from "./TimeFilter";
import ThemeFilter from "./ThemeFilter";

const GroupFilter = (props) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
    props.finish,
  ];

  // console.log(
  //   "region=>>",
  //   region,
  //   "startDate=>>",
  //   startDate,
  //   "endDate=>>",
  //   endDate,
  //   "filterTime=>>",
  //   filterTime,
  //   "filterDistance=>>",
  //   filterDistance,
  //   "filterTheme=>>",
  //   filterTheme,
  //   props.finish
  // );

  const getFilter = () => {
    dispatch(getGroupDB(category));
    // dispatch(filterActions.resetFilter());
  };

  return (
    <>
      <Grid
        maxWidth="1360px"
        width="100%"
        padding="24px 10px"
        border="1px solid #000"
        minHeight="259px"
        height="100%"
        margin="auto"
      >
        <Grid display="flex" width="100%" margin="0 auto">
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            maxWidth="380px"
            width="100%"
            margin="0 90px 0 0"
          >
            <Text size="18px" bold margin="12px 16px 9px 0">
              참여 지역
            </Text>
            <RegionSelect
              name="지역"
              onChange={(e) => {
                setRegion(e.target.value);
              }}
            >
              <option value="none" style={{ color: "#909090" }}>
                지역
              </option>
              <option value="0">전국</option>
              <option value="1">서울특별시</option>
              <option value="2">경기도</option>
              <option value="3">인천광역시</option>
              <option value="4">강원도</option>
              <option value="5">충청도 / 세종특별자치시 / 대전광역시</option>
              <option value="6">경상북도 / 대구광역시</option>
              <option value="7">경상남도 / 부산광역시 / 울산광역시</option>
              <option value="8">전라도 / 광주광역시</option>
              <option value="9">제주특별자치시</option>
            </RegionSelect>
          </Grid>

          <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            maxWidth="380px"
            width="100%"
          >
            <Text
              size="18px"
              bold
              margin="12px 12px 9px 0"
              textalign="center"
              width="150px"
            >
              모집 일정
            </Text>
            <Grid margin="0">
              <CalendarFilter
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              ></CalendarFilter>
            </Grid>
          </Grid>
        </Grid>
        <Hr></Hr>

        <Grid display="flex" width="100%" margin="0 auto">
          <TimeFilter setFilterTime={setFilterTime} />
        </Grid>

        <Grid display="flex" width="100%" margin="0 auto">
          <DistanceFilter setFilterDistance={setFilterDistance} />
        </Grid>

        <Grid display="flex" width="100%" margin="0 auto">
          <ThemeFilter setFilterTheme={setFilterTheme} />
        </Grid>

        <Grid
          display="flex"
          width="100%"
          margin="0 auto"
          alignItems="center"
          justifyContent="center"
        >
          <Text cursor="pointer" size="20px" bold>
            추가 검색조건 닫기
          </Text>
        </Grid>

        <Hr2></Hr2>

        <Grid
          display="flex"
          maxWidth="1360px"
          width="100%"
          height="82px"
          margin="0 auto"
          alignItems="center"
          justifyContent="right"
          padding="24px"
          borderRadius="0px 0px 3px 3px"
        >
          <SearchBtn onClick={getFilter}>검색하기</SearchBtn>
        </Grid>
      </Grid>
    </>
  );
};

const RegionSelect = styled.select`
  width: 255px;
  height: 46px;
  padding: 11px 22px 10px 24px;
  border: solid 1px #000;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  box-sizing: border-box;
`;

const Hr = styled.hr`
  width: 100%;
  height: 0px;
  border: 1px solid #969696;
  margin: 22px auto;
`;

const SearchBtn = styled.button`
  background: #000000;
  margin-right: 30px;
  border-radius: 3px;
  width: 157px;
  height: 50px;
  color: white;
  font-size: 18px;
  line-height: 25px;
  border: none;
  cursor: pointer;
  :hover {
    font-weight: 900;
    box-shadow: 1px 1px 5px black;
  }
`;

const Hr2 = styled.hr`
  margin: 10px 0;
  width: 100%;
  border: 1px solid #969696;
`;

export default GroupFilter;
