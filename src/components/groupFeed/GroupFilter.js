import { textAlign } from "@mui/system";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Text, Grid, IconButton } from "../../elements";
import { getGroupDB } from "../../redux/modules/feed";
import CalendarFilter from "./CalendarFilter";
import DistanceFilter from "./DistanceFilter";
import TimeFilter from "./TimeFilter";
import ThemeFilter from "./ThemeFilter";

const GroupFilter = (props) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [region, setRegion] = useState([]);
  const [filterTime, setFilterTime] = useState([]);
  const [filterDistance, setFilterDistance] = useState([]);
  const [filterTheme, setFilterTheme] = useState([]);

  const [isAddFilter, setIsAddFilter] = useState(false);
  const [resetState, setResetState] = useState(false);

  console.log(filterTime, filterDistance, filterTheme);
  console.log(startDate, endDate, region);

  const switchAddFilter = () => {
    setIsAddFilter(!isAddFilter);
  };

  const [regionTag, setRegionTag] = useState([
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

  const [distanceTag, setDistanceTag] = useState([
    "전체",
    "5km 미만",
    "5km 이상 10km 미만",
    "10km 이상 15km 미만",
    "15km 이상",
  ]);

  const [timeTag, setTimeTag] = useState([
    "전체 시간",
    "00:00 ~ 04:00",
    "04:00 ~ 08:00",
    "08:00 ~ 12:00",
    "12:00 ~ 16:00",
    "16:00 ~ 20:00",
    "20:00 ~ 24:00",
  ]);

  // const category = [
  //   region,
  //   filterTime,
  //   filterDistance,
  //   startDate,
  //   endDate,
  //   filterTheme,
  //   props.finish,
  // ];

  const category = {
    region: region,
    filterTime: filterTime,
    filterDistance: filterDistance,
    startDate: startDate,
    endDate: endDate,
    filterTheme: filterTheme,
    finish: props.finish,
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setRegion([]);
    setFilterTime([]);
    setFilterDistance([]);
    setFilterTheme([]);
    props.setSearchState(false);
    setResetState(!resetState);
    setIsAddFilter(false);
    dispatch(getGroupDB(props.category));
  };

  const getFilter = () => {
    dispatch(getGroupDB(category));
    props.setSearchState(true);
    // dispatch(filterActions.resetFilter());
  };

  return (
    <>
      <Grid padding="32px 37px" border="8px solid  #c0c2cd" bg="#fff">
        <Grid display="flex" flexDirection="row" margin="0 auto">
          <Grid
            display="flex"
            width="auto"
            alignItems="center"
            margin="0 72px 0 0"
          >
            <Text size="16px" bold margin="0 16px 0 0">
              지역
            </Text>
            <Grid width="317px">
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
          </Grid>

          <Grid display="flex" width="auto" alignItems="center">
            <Text size="16px" bold margin="0 16px 0 0">
              모집 일정
            </Text>
            <Grid width="317px">
              <CalendarFilter
                reset={resetState}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </Grid>
          </Grid>
        </Grid>

        <Hr></Hr>

        {isAddFilter ? (
          <>
            <Grid display="flex" width="100%" margin="0 auto">
              <TimeFilter setFilterTime={setFilterTime} />
            </Grid>

            <Grid display="flex" width="100%" margin="0 auto">
              <DistanceFilter setFilterDistance={setFilterDistance} />
            </Grid>

            <Grid display="flex" width="100%" margin="0 auto">
              <ThemeFilter setFilterTheme={setFilterTheme} />
            </Grid>

            <Hr></Hr>

            <Grid display="flex" alignItems="center" justifyContent="center">
              <Text
                margin="0"
                _onClick={switchAddFilter}
                cursor="pointer"
                size="16px"
                bold
              >
                추가 검색조건 닫기
              </Text>
              <IconButton upArrow color="black" />
            </Grid>
          </>
        ) : (
          <Grid display="flex" alignItems="center" justifyContent="center">
            <Text
              margin="0"
              _onClick={switchAddFilter}
              cursor="pointer"
              size="16px"
              bold
            >
              추가 검색조건 펼치기
            </Text>
            <IconButton downArrow color="black" />
          </Grid>
        )}
      </Grid>

      <Grid
        padding="24px"
        bg="#f3f3f3"
        display="flex"
        justifyContent="space-between"
      >
        <Grid
          display="flex"
          justifyContent="left"
          flexDirection="column"
          maxWidth="900px"
          width="100%"
        >
          <Grid display="flex" justifyContent="left" width="auto">
            {region === "none" || region.length === 0 ? null : (
              <>
                <Text bold color="#333A5D" margin="0 20px 0 0" size="14px">
                  {region === NaN ? null : "#" + regionTag[region]}
                </Text>
              </>
            )}

            {startDate && endDate ? (
              <Text bold color="#333A5D" margin="0 20px 0 0" size="14px">
                {startDate === "NaN-NaN-NaN" ? null : "#" + startDate + "~"}
                {endDate === "NaN-NaN-NaN" ? null : endDate}
              </Text>
            ) : null}
          </Grid>

          <Grid
            display="flex"
            justifyContent="left"
            maxWidth="900px"
            width="100%"
            margin="11px 0 0 0"
          >
            {filterTime.length !== 0
              ? filterTime?.map((e, idx) => {
                  return (
                    <Fragment key={idx}>
                      <Text
                        bold
                        color="#333A5D"
                        margin="0 20px 11px 0"
                        size="14px"
                      >
                        #{timeTag[e]}
                      </Text>
                    </Fragment>
                  );
                })
              : null}

            {filterDistance.length !== 0
              ? filterDistance.map((e, idx) => {
                  return (
                    <Fragment key={idx}>
                      <Text
                        bold
                        color="#333A5D"
                        margin="0 20px 0 0"
                        size="14px"
                      >
                        #{distanceTag[e]}
                      </Text>
                    </Fragment>
                  );
                })
              : null}

            {filterTheme.length !== 0
              ? filterTheme.map((e, idx) => {
                  return (
                    <Fragment key={idx}>
                      <Text
                        bold
                        color="#333A5D"
                        margin="0 20px 0 0"
                        size="14px"
                      >
                        #{e}
                      </Text>
                    </Fragment>
                  );
                })
              : null}
          </Grid>
        </Grid>

        <Grid display="flex" width="auto">
          <Text
            _onClick={resetFilter}
            cursor="pointer"
            color="#818181"
            size="14px"
          >
            선택초기화
          </Text>
          <SearchBtn onClick={getFilter}>검색하기</SearchBtn>
        </Grid>
      </Grid>
    </>
  );
};

const Label = styled.label`
  border: none;
  border-radius: 60px;
  background-color: #030c37;
  margin: 0 15px 0 0;
  color: #68f99e;
  padding: 5px 15px;
  width: auto;
`;

const RegionSelect = styled.select`
  width: 317px;
  height: 46px;
  padding: 13px 16px;
  border: solid 1px #000;
  border-radius: 3px;
  font-size: 16px;
  font-weight: 400;
  color: #818181;
  box-sizing: border-box;
`;

const Hr = styled.hr`
  margin: 23px auto;
  transform: scaleY(0.5);
  border: 0.5px solid #cbcbcb;
`;

const SearchBtn = styled.button`
  background: #000000;
  margin: 0 0 0 16px;
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
export default GroupFilter;