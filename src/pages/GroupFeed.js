import React, { useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  Text,
  Input,
  Spinner,
  LogoSpinner,
} from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import GroupFilter from "../components/groupFeed/GroupFilter";
import GroupFilterMob from "../components/groupFeed/GroupFilterMob";
import GroupCard from "../components/groupFeed/GroupCard";
import upload from "../assets/groupFeed/groupUploadBtn1.png";
import uploadHover from "../assets/groupFeed/groupUploadBtn2.png";
import pageUp from "../assets/groupFeed/pageUpBtn.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll";

import { getGroupDB, resetGroup } from "../redux/modules/feed";
import Permit from "../shared/Permit";

import InfinityScroll from "../components/InfinityScroll";

import { useMediaQuery } from "react-responsive";

import Ready from "../shared/Ready";
import { resetMap } from "../redux/modules/uploadInfo";

import { imgActions } from "../redux/modules/image";

const GroupFeed = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();

  const nickname = localStorage.getItem("nickname");

  const [finish, setFinish] = useState("0");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [region, setRegion] = useState([]);
  const [filterTime, setFilterTime] = useState([]);
  const [filterDistance, setFilterDistance] = useState([]);
  const [filterTheme, setFilterTheme] = useState([]);

  const [searchState, setSearchState] = useState(false);
  const [uploadBtn, setUploadBtn] = useState(false);

  const feedList = useSelector((state) => state.feed.list);
  const preferData = useSelector((state) => state.feed.preferData);
  const isLoading = useSelector((state) => state.feed.isLoading);
  const paging = useSelector((state) => state.feed.paging);

  console.log("피드 컴포넌트 페이지 번호", paging);

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
    } else {
      setFinish(0);
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
    console.log("마감공고");
    dispatch(resetGroup());
    dispatch(getGroupDB(category));

    return () => {
      console.log("그룹 게시물 클린업");
      dispatch(resetGroup());
    };
  }, [finish]);

  if (isMobile) {
    return (
      <>
        <GroupFilterMob />
      </>
    );
  }

  return (
    <>
      <Grid
        position="relative"
        width="1282px"
        margin="0 auto 320px 360px"
        justifyContent="space-between"
        display="flex"
      >
        <Grid width="1200px">
          <Grid
            display="flex"
            justifyContent="left"
            margin="64px auto 32px auto"
            alignItems="center"
          >
            <Text margin="0 10px 0 0" bold size="20px">
              그룹 러닝
            </Text>
            <Text size="14px">함께 뛰면 즐거움이 두배!</Text>
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
                <Text size="20px" bold>
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
                  <Text size="16px" color="#686EF9">
                    {"#" + preferData?.likeDistance}
                  </Text>
                ) : (
                  <Text size="16px" color="#686EF9">
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
              onClick={() => {
                finishCheck();
              }}
            ></input>
            <Text bold margin="0">
              마감공고 포함하기
            </Text>
          </Grid>
          <Grid minHeight="600px" display="flex">
            {/* <InfinityScroll
              callNext={() => {
                console.log("콜넥스트실행");
                console.log("콜넥스트 내부 페이지 번호", paging.page);
                dispatch(getGroupDB(category, paging.page));
              }}
              is_next={paging.page ? true : false}
              loading={isLoading}
              pages={paging.page}
              category={category}
            > */}

            {feedList.length !== 0 ? (
              feedList?.map((item, idx) => {
                return <GroupCard key={idx} {...item}></GroupCard>;
              })
            ) : (
              <Spinner />
            )}

            {/* </InfinityScroll> */}
          </Grid>
          <Grid
            width="200px"
            bg="red"
            display="flex"
            justifyContent="center"
            alignItem="center"
            _onClick={() => {
              dispatch(getGroupDB(category, paging.page));
            }}
          >
            <Text color="white">더보기</Text>
          </Grid>
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

const Hr = styled.div`
  border: 1px solid #969696;
  width: 100%;
  margin: 16px auto;
`;

export default GroupFeed;
