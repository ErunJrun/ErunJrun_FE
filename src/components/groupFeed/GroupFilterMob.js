import { textAlign } from "@mui/system";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Text, Grid, IconButton } from "../../elements";
import { getGroupDB, resetGroup } from "../../redux/modules/feed";
import CalendarFilter from "./CalendarFilter";
import DistanceFilter from "./DistanceFilter";
import TimeFilter from "./TimeFilter";
import ThemeFilter from "./ThemeFilter";
import swal from "sweetalert";
import backBtn from "../../assets/groupFeed/backBtn.svg";
import { history } from "../../redux/configureStore";
import ModalPortal from "../../shared/modal/ModalPortal";

const GroupFilterMob = (props) => {
  const dispatch = useDispatch();

  const paging = useSelector((state) => state.feed.paging);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [region, setRegion] = useState("none");
  const [filterTime, setFilterTime] = useState([]);
  const [filterDistance, setFilterDistance] = useState([]);
  const [filterTheme, setFilterTheme] = useState([]);

  const [isAddFilter, setIsAddFilter] = useState(false);
  const [resetState, setResetState] = useState(false);

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
    setRegion("none");
    setFilterTime([]);
    setFilterDistance([]);
    setFilterTheme([]);
    setResetState(!resetState);
  };

  console.log(category);

  const getFilter = () => {
    if (
      region.length === 0 ||
      region === "none" ||
      startDate === "NaN-NaN-NaN"
    ) {
      return swal("지역과 모집 일정은 필수입니다.", "", "warning");
    }
    dispatch(getGroupDB(category, paging.page));
    props.setSearchState(true);
    props.setFilterState(false);
  };

  return (
    <>
      <ModalPortal>
        <Background
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Grid zIndex="210" width="375px" margin="84px auto 100px auto">
            <Grid
              zIndex="3"
              bg="white"
              justifyContent="center"
              alignItems="center"
              position="fixed"
              top="0"
              left="0"
              width="100%"
              height="54px"
              display="flex"
              padding="10px 10px"
              margin="0 auto"
            >
              <Grid
                display="flex"
                width="375px"
                justifyContent="left"
                alignItems="center"
              >
                <img
                  style={{ width: "10px", margin: "0 10px" }}
                  src={backBtn}
                  onClick={() => {
                    props.setFilterState(false);
                  }}
                />
                <Text margin="0 0 0 130px" bold>
                  검색 필터
                </Text>
              </Grid>
            </Grid>

            <Grid
              margin="0 auto"
              width="343px"
              height="244px"
              padding="24px"
              border="1px solid #F0F0F0"
              boxShadow="0px 0px 12px rgba(183, 183, 183, 0.35)"
              bg="#fff"
              borderRadius="16px"
            >
              <Grid display="flex" flexDirection="row" margin="0 auto">
                <Grid
                  display="flex"
                  width="auto"
                  alignItems="center"
                  margin="0 0 32px 0"
                  height="auto"
                  flexDirection="row"
                >
                  <Text height="auto" size="14px" bold margin="0 0 12px 0">
                    러닝 지역
                  </Text>

                  <RegionSelectMob
                    name="지역"
                    onChange={(e) => {
                      setRegion(e.target.value);
                    }}
                    value={region}
                  >
                    <option value="none" style={{ color: "#909090" }}>
                      희망 지역 선택
                    </option>
                    <option value="0">전국</option>
                    <option value="1">서울특별시</option>
                    <option value="2">경기도</option>
                    <option value="3">인천광역시</option>
                    <option value="4">강원도</option>
                    <option value="5">
                      충청도 / 세종특별자치시 / 대전광역시
                    </option>
                    <option value="6">경상북도 / 대구광역시</option>
                    <option value="7">
                      경상남도 / 부산광역시 / 울산광역시
                    </option>
                    <option value="8">전라도 / 광주광역시</option>
                    <option value="9">제주특별자치시</option>
                  </RegionSelectMob>
                </Grid>

                <Grid
                  display="flex"
                  width="auto"
                  alignItems="center"
                  margin="0 0 32px 0"
                  height="auto"
                  flexDirection="row"
                >
                  <Text height="auto" size="14px" bold margin="0 0 12px 0">
                    모집 일정
                  </Text>

                  <CalendarFilter
                    reset={resetState}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              margin="24px auto 0 auto"
              width="343px"
              height="auto"
              padding="24px"
              border="1px solid #F0F0F0"
              boxShadow="0px 0px 12px rgba(183, 183, 183, 0.35)"
              bg="#fff"
              borderRadius="16px"
              display="flex"
            >
              <TimeFilter
                reset={resetState}
                isMobile={true}
                setFilterTime={setFilterTime}
              />
              <DistanceFilter
                setResetState={setResetState}
                reset={resetState}
                isMobile={true}
                setFilterDistance={setFilterDistance}
              />
              <ThemeFilter
                reset={resetState}
                isMobile={true}
                setFilterTheme={setFilterTheme}
              />
            </Grid>

            <Grid
              zIndex="3"
              bg="white"
              justifyContent="center"
              position="fixed"
              bottom="0"
              left="0"
              width="100%"
              height="73px"
              display="flex"
              padding="10px 16px"
              boxShadow="0px -6px 12px rgba(227, 227, 227, 0.6)"
            >
              <Grid
                width="343px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="0"
              >
                <ResetBtn onClick={resetFilter}>선택초기화</ResetBtn>
                <SearchBtn onClick={getFilter}>검색하기</SearchBtn>
              </Grid>
            </Grid>
          </Grid>
        </Background>
      </ModalPortal>
    </>
  );
};

const Background = styled.div`
  z-index: 206;
  background-color: white;
  position: absolute;
  left: 0;
  top: 0;
  height: 1000px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;

const RegionSelectMob = styled.select`
  width: 295px;
  height: 44px;
  padding: 13px 16px;
  border: 1px solid #b8b8b8;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 400;
  color: #818181;
  box-sizing: border-box;
  :focus {
    border: 1px solid #68f99e;
  }
`;

const ResetBtn = styled.button`
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
  margin: 0;
  border-radius: 3px;
  width: 126px;
  height: 44px;
  color: black;
  font-family: "Spoqa Han Sans Neo";
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #dddddd;
  cursor: pointer;
  :hover {
    font-weight: 900;
    box-shadow: 1px 1px 5px black;
  }
`;

const SearchBtn = styled.button`
  box-sizing: border-box;
  cursor: pointer;
  background: #030c37;
  margin: 0;
  border-radius: 3px;
  width: 209px;
  height: 44px;
  color: white;
  font-family: "Spoqa Han Sans Neo";
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
  :hover {
    font-weight: 900;
    box-shadow: 1px 1px 5px black;
  }
`;
export default GroupFilterMob;
