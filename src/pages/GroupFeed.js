import React, { useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  Text,
  Input,
  Spinner,
  LogoSpinner,
} from "../elements";
import filterIcon from "../assets/groupFeed/filterIcon.svg";

import { history } from "../redux/configureStore";
import styled from "styled-components";
import noSearchData from "../assets/groupFeed/noSearchData.svg";
import GroupFilter from "../components/groupFeed/GroupFilter";
import GroupFilterMob from "../components/groupFeed/GroupFilterMob";
import GroupCard from "../components/groupFeed/GroupCard";
import GroupCardMob from "../components/groupFeed/GroupCardMob";
import upload from "../assets/groupFeed/groupUploadBtn1.png";
import uploadHover from "../assets/groupFeed/groupUploadBtn2.png";
import pageUp from "../assets/groupFeed/pageUpBtn.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll";
import shoesYellow from "../assets/groupFeed/shoesYellow.svg";

import { getGroupDB, resetGroup } from "../redux/modules/feed";
import Permit from "../shared/Permit";

import InfinityScroll from "../components/InfinityScroll";

import { useMediaQuery } from "react-responsive";

import Ready from "../shared/Ready";
import { resetMap } from "../redux/modules/uploadInfo";

import { imgActions } from "../redux/modules/image";
import { borderRadius } from "@mui/system";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const GroupFeed = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();

  const nickname = localStorage.getItem("nickname");

  const [finish, setFinish] = useState("0");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [region, setRegion] = useState([]);
  const [filterTime, setFilterTime] = useState([]);
  const [filterDistance, setFilterDistance] = useState([]);
  const [filterTheme, setFilterTheme] = useState([]);

  const [filterState, setFilterState] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [uploadBtn, setUploadBtn] = useState(false);

  const feedList = useSelector((state) => state.feed.list);
  const preferData = useSelector((state) => state.feed.preferData);
  const isLoading = useSelector((state) => state.feed.isLoading);
  const paging = useSelector((state) => state.feed.paging);

  const category = {
    region: region,
    filterTime: filterTime,
    filterDistance: filterDistance,
    startDate: startDate,
    endDate: endDate,
    filterTheme: filterTheme,
    finish: finish,
  };

  const finishCheck = () => {
    if (finish == 0) {
      setFinish(1);
      setSearchState(true);
    } else {
      setFinish(0);
      setSearchState(false);
    }
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

  // useEffect(() => {
  //   if (feedList.length === 0) {
  //     console.log("GET 그룹 게시물");
  //     dispatch(getGroupDB(category));
  //   }

  //   return () => {
  //     console.log("그룹 게시물 클린업");
  //     dispatch(resetGroup());
  //   };
  // }, []);

  //그룹러닝 등록 중 페이지 이탈 시 등록 데이터 리셋
  useEffect(() => {
    dispatch(resetMap());
    dispatch(imgActions.resetFile());
  }, []);

  useEffect(() => {
    dispatch(resetGroup());
    dispatch(getGroupDB(category));

    return () => {
      dispatch(resetGroup());
    };
  }, [finish]);

  if (isMobile) {
    return (
      <>
        {filterState ? (
          <GroupFilterMob
            category={category}
            setSearchState={setSearchState}
            setFilterState={setFilterState}
            finish={finish}
          ></GroupFilterMob>
        ) : (
          <Grid width="375px" height="auto" margin="110px auto 100px auto">
            <Grid
              margin="0 auto 16px auto"
              width="343px"
              height="46px"
              padding="0 24px"
              borderRadius="80px"
              boxShadow="0 0 10px 0 rgba(104, 249, 158, 0.35)"
              border="1px solid rgba(104, 249, 158, 0.5)"
              bg="#fff"
              display="flex"
              justifyContent="space-between"
              cursor="pointer"
              _onClick={() => {
                setSearchState(true);
                setFilterState(true);
              }}
            >
              <Text
                _onClick={() => {
                  setFilterState(true);
                }}
                cursor="pointer"
                height="auto"
                size="14px"
                regular
                color="#7B7B7B"
              >
                필터를 통해 그룹러닝을 검색해보세요.
              </Text>

              <img src={filterIcon} />
            </Grid>
            <HrMob />
            <Grid
              margin="9.5px auto"
              width="343px"
              display="flex"
              justifyContent="space-between"
              alignItem="center"
            >
              {searchState || !nickname ? (
                <>
                  <Text width="auto" margin="0" size="12px" bold>
                    총{" "}
                    <span style={{ color: "#686EF9" }}>
                      {feedList.length ? feedList.length : "0"}
                    </span>
                    건의 결과
                  </Text>
                </>
              ) : (
                <>
                  <Grid display="flex" width="auto">
                    <img style={{ width: "18.91px" }} src={shoesYellow} />
                    <Text width="auto" margin="0 0 0 4.55px" size="12px" bold>
                      추천 그룹 러닝입니다!
                    </Text>
                  </Grid>
                </>
              )}
              <Grid
                height="auto"
                width="auto"
                margin="0"
                display="flex"
                justifyContent="right"
                alignItems="center"
              >
                <input
                  style={{
                    width: "13px",
                    height: "13px",
                    margin: "0 8px 0 0",
                    cursor: "pointer",
                    border: "0.8px solid  #000",
                    borderRadius: "2.8px",
                  }}
                  type="checkbox"
                  onChange={() => {
                    finishCheck();
                  }}
                ></input>
                <Text size="11px" margin="0">
                  마감공고 포함하기
                </Text>
              </Grid>
            </Grid>
            <HrMob />

            <Grid
              width="343px"
              justifyContent="space-between"
              display="flex"
              margin="23.5px auto 10px auto"
            >
              {feedList.length !== 0 ? (
                feedList?.map((item, idx) => {
                  return <GroupCardMob key={idx} {...item}></GroupCardMob>;
                })
              ) : (
                <img
                  style={{ margin: "0 auto 40px auto", width: "150px" }}
                  src={noSearchData}
                />
              )}
            </Grid>

            {feedList.length === 0 ? null : (
              <Grid
                width="343px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                margin="0 auto"
              >
                <Grid
                  hover="box-shadow:1px 1px 8px gray;"
                  cursor="pointer"
                  margin="0"
                  padding="5px"
                  width="30px"
                  height="30px"
                  borderRadius="50%"
                  bg="#ffffff"
                  boxShadow="0px 1px 5px rgba(94, 94, 94, 0.45)"
                  display="flex"
                  justifyContent="center"
                  alignItem="center"
                  _onClick={() => {
                    if (feedList.length === 0) {
                      swal("게시물이 없습니다");
                    }
                    dispatch(getGroupDB(category, paging.page));
                  }}
                >
                  <Text cursor="pointer" margin="0" size="15px" color="black">
                    ∨
                  </Text>
                </Grid>
              </Grid>
            )}

            <Permit>
              <UploadBtnMob
                onClick={() => {
                  history.push("/groupupload");
                }}
              >
                +
              </UploadBtnMob>
            </Permit>
          </Grid>
        )}
      </>
    );
  }

  return (
    <>
      <Grid
        position="relative"
        width="1282px"
        margin="0 auto 240px auto"
        justifyContent="space-between"
        display="flex"
      >
        <Grid width="1200px">
          <Grid
            display="flex"
            justifyContent="left"
            margin="64px auto 32px auto"
            alignItems="baseline"
          >
            <Text margin="0 10px 0 0" bold size="20px">
              그룹 러닝
            </Text>
            <Text regular size="14px">
              함께 뛰면 즐거움이 두배!
            </Text>
          </Grid>
          <GroupFilter
            category={category}
            setSearchState={setSearchState}
            finish={finish}
          ></GroupFilter>
          <Grid
            display="flex"
            justifyContent="left"
            alignItems="baseline"
            margin="64px 0 0 0"
          >
            {searchState || !nickname ? (
              <>
                <Text margin="0" size="20px" bold>
                  총{" "}
                  <span style={{ color: "#686EF9" }}>
                    {feedList.length ? feedList.length : "0"}
                  </span>
                  건의 결과
                </Text>
              </>
            ) : (
              <>
                <Text margin="0 15px 0 0" size="20px" bold>
                  <span style={{ color: "#686EF9" }}>
                    {nickname ? nickname : null}
                  </span>{" "}
                  님을 위한 추천 그룹 러닝입니다!
                </Text>
                <Text color="#686EF9" margin="0 8px 0 0" size="16px">
                  {preferData?.likeLocation
                    ? "#" + preferData?.likeLocation
                    : null}
                </Text>
                {preferData?.likeDistance ? (
                  <Text margin="0" size="16px" color="#686EF9">
                    {"#" + preferData?.likeDistance}
                  </Text>
                ) : (
                  <Text margin="0" size="16px" color="#686EF9">
                    {" "}
                  </Text>
                )}
              </>
            )}
          </Grid>
          <Hr></Hr>
          <Grid
            margin="10px auto 40px auto"
            display="flex"
            justifyContent="right"
            alignItems="center"
          >
            <input
              style={{
                width: "18px",
                height: "18px",
                margin: "0 8px 0 0",
                cursor: "pointer",
              }}
              type="checkbox"
              onChange={() => {
                finishCheck();
                setSearchState(!searchState);
              }}
            ></input>
            <Text bold margin="0">
              마감공고 포함하기
            </Text>
          </Grid>
          <Grid minHeight="600px" display="flex">
            {feedList.length !== 0 ? (
              feedList?.map((item, idx) => {
                return <GroupCard key={idx} {...item}></GroupCard>;
              })
            ) : (
              <img style={{ margin: "0 auto" }} src={noSearchData} />
            )}
          </Grid>
          {feedList.length === 0 ? null : (
            <Grid
              width="1200px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                hover="box-shadow:1px 1px 8px gray;"
                cursor="pointer"
                margin="0"
                padding="12px"
                width="60px"
                height="60px"
                borderRadius="50%"
                bg="#ffffff"
                boxShadow="0px 1px 5px rgba(94, 94, 94, 0.45)"
                display="flex"
                justifyContent="center"
                alignItem="center"
                _onClick={() => {
                  if (feedList.length === 0) {
                    swal("게시물이 없습니다");
                  }
                  dispatch(getGroupDB(category, paging.page));
                }}
              >
                <Text cursor="pointer" margin="0" size="25px" color="black">
                  ∨
                </Text>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid
          display="flex"
          flexDirection="column"
          position="sticky"
          top="726px"
          margin="0"
          width="auto"
        >
          <Permit>
            {uploadBtn === true ? (
              <UploadBtn
                onClick={() => {
                  history.push("/groupupload");
                }}
                src={uploadHover}
              />
            ) : (
              <UploadBtn
                onClick={() => {
                  history.push("/groupupload");
                }}
                src={upload}
              />
            )}
          </Permit>

          <Link
            style={{ position: "relative" }}
            to="1"
            spy={true}
            smooth={true}
          >
            <PageUpBtn src={pageUp} />
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

const UploadBtn = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin: 0;
`;

const PageUpBtn = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin: 0;
`;

const Hr = styled.hr`
  border-top: 1px solid #969696;
  width: 100%;
  margin: 16px auto;
`;

const BottomHr = styled.div`
  border: 1px solid #969696;
  width: 500px;
  height: 0;
  margin: 0;
`;

const HrMob = styled.hr`
  width: 343px;
  border: 1px solid #f0f0f0;
  margin: 0 auto;
`;

const UploadBtnMob = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(94, 94, 94, 0.45);
  cursor: pointer;
  margin: 0;
  bottom: 95px;
  right: 20px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  :hover {
    box-shadow: 0px 1px 8px rgba(94, 94, 94, 0.45);
    color: #68f99e;
  }
`;

export default GroupFeed;
