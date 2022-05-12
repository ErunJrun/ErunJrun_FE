import React, { useEffect, useState } from "react";
import { Grid, IconButton, Text, Input } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import GroupFilter from "../components/groupFeed/GroupFilter";
import GroupCard from "../components/groupFeed/GroupCard";
import upload from "../assets/upload.png";
import pageUp from "../assets/pageUp.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll";

import { getGroupDB, resetGroup } from "../redux/modules/feed";

const GroupFeed = () => {
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feed.list);
  const preferData = useSelector((state) => state.feed.preferData);
  const [finish, setFinish] = useState("0");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [region, setRegion] = useState([]);
  const [filterTime, setFilterTime] = useState([]);
  const [filterDistance, setFilterDistance] = useState([]);
  const [filterTheme, setFilterTheme] = useState([]);
  const [searchState, setSearchState] = useState(false);

  const nickname = localStorage.getItem("nickname");
  console.log(filterTheme);

  const category = {
    region: region,
    filterTime: filterTime,
    filterDistance: filterDistance,
    startDate: startDate,
    endDate: endDate,
    filterTheme: filterTheme,
    finish: finish,
  };

  // const category = [
  //   region,
  //   filterTime,
  //   filterDistance,
  //   startDate,
  //   endDate,
  //   filterTheme,
  //   finish,
  // ];

  // const category = [
  //   {
  //     region: region,
  //     filterTime: filterTime,
  //     filterDistance: filterDistance,
  //     startDate: startDate,
  //     endDate: endDate,
  //     filterTheme: filterTheme,
  //     finish: finish,
  //   },
  // ];

  const finishCheck = () => {
    if (finish == 0) {
      setFinish(1);
    } else {
      setFinish(0);
    }
  };

  // useEffect(() => {
  //   dispatch(getGroupDB(category));
  // }, []);

  useEffect(() => {
    console.log("클린업 이전");
    dispatch(getGroupDB(category));
    return () => {
      console.log("클린업");
      dispatch(resetGroup());
    };
  }, [finish]);

  return (
    <>
      <Grid
        position="relative"
        maxWidth="1200px"
        width="100%"
        margin="0 auto 320px auto"
      >
        <Grid
          width="100%"
          display="flex"
          justifyContent="left"
          margin="64px auto 32px auto"
          alignItems="center"
        >
          <Text margin="0 10px 0 0" bold size="20px">
            그룹러닝
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
          maxWidth="1360px"
          width="100%"
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
              <Text size="16px" color="#686EF9">
                {preferData?.likeDistance
                  ? "#" + preferData?.likeDistance
                  : null}
              </Text>
            </>
          )}
        </Grid>
        <Hr></Hr>
        <Grid
          maxWidth="1360px"
          width="100%"
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
        <Grid display="flex" alignItems="center" width="100%">
          {feedList?.map((item, idx) => {
            return <GroupCard key={idx} {...item}></GroupCard>;
          })}
        </Grid>
        <Grid
          display="flex"
          maxWidth="1282px"
          height="auto"
          flexDirection="column"
          alignContent="flex-end"
          justifyContent="center"
          position="fixed"
          top="816px"
        >
          <UploadBtn
            onClick={() => {
              history.push("/groupupload");
            }}
            src={upload}
          />
          <Link to="1" spy={true} smooth={true}>
            <PageUpBtn src={pageUp} />
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

const UploadBtn = styled.img`
  max-width: 50px;
  width: 100%;
  max-height: 50px;
  height: 100%;
  cursor: pointer;
  margin: 0 0 20px 0;
`;

const PageUpBtn = styled.img`
  max-width: 50px;
  width: 100%;
  max-height: 50px;
  height: 100%;
  cursor: pointer;
`;

const Hr = styled.div`
  border: 1px solid #969696;
  width: 100%;
  margin: 16px auto;
`;

export default GroupFeed;