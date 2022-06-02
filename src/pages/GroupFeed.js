import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Redux
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { resetMap } from "../redux/modules/uploadInfo";
import { imgActions } from "../redux/modules/image";
import {
  getAllDB,
  getGroupDB,
  getPreferDB,
  resetGroup,
} from "../redux/modules/feed";

//css, library, package
import swal from "sweetalert";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-scroll";
import styled from "styled-components";

//Image
import filterIcon from "../assets/groupFeed/filterIcon.svg";
import categoryLine from "../assets/groupFeed/categoryLine.svg";
import noSearchData from "../assets/groupFeed/noSearchData.svg";
import upload from "../assets/groupFeed/groupUploadBtn1.png";
import uploadHover from "../assets/groupFeed/groupUploadBtn2.png";
import pageUp from "../assets/groupFeed/pageUpBtn.png";

//elements
import { Grid, Text } from "../elements";

//components
import GroupFilter from "../components/groupFeed/GroupFilter";
import GroupFilterMob from "../components/groupFeed/GroupFilterMob";
import GroupCard from "../components/groupFeed/GroupCard";
import GroupCardMob from "../components/groupFeed/GroupCardMob";
import DrawerCategory from "../components/groupFeed/DrawerCategory";
import Permit from "../shared/Permit";

const GroupFeed = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();

  const nickname = localStorage.getItem("nickname");

  const [allCheck, setAllCheck] = useState(true);
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
    "제주특별자치도",
  ]);

  const category = {
    region: region,
    filterTime: filterTime,
    filterDistance: filterDistance,
    startDate: startDate,
    endDate: endDate,
    filterTheme: filterTheme,
    finish: finish,
  };

  const feedList = useSelector((state) => state.feed.list);
  const preferData = useSelector((state) => state.feed.preferData);
  const isLoading = useSelector((state) => state.feed.isLoading);
  const paging = useSelector((state) => state.feed.paging);

  const allGroup = () => {
    dispatch(resetGroup());
    dispatch(getAllDB(1, 6));
    setAllCheck(true);
    setSearchState(false);
  };

  const preferGroup = () => {
    dispatch(resetGroup());
    dispatch(getPreferDB(1, 6));
    setAllCheck(false);
    setSearchState(false);
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
            finishCheck={finishCheck}
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
                    <Text width="auto" margin="0" size="12px" bold>
                      총{" "}
                      <span style={{ color: "#686EF9" }}>
                        {feedList.length ? feedList.length : "0"}
                      </span>
                      건의 결과
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
                <DrawerCategory />
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

            {feedList.length === 0 || paging.page === null ? null : (
              <Grid
                width="343px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                margin="0 auto"
              >
                {allCheck ? (
                  <Grid
                    hover="box-shadow:1px 1px 4px gray;"
                    cursor="pointer"
                    margin="0"
                    border="1px solid #030C37"
                    width="120px"
                    height="20px"
                    borderRadius="2px"
                    bg="#ffffff"
                    display="flex"
                    justifyContent="center"
                    alignItem="center"
                    padding="2px"
                    _onClick={() => {
                      if (paging.page === null) {
                        swal("게시물이 없습니다");
                      }
                      dispatch(getAllDB(paging.page));
                    }}
                  >
                    <Text
                      cursor="pointer"
                      margin="0"
                      bold
                      size="10px"
                      color="#030C37"
                    >
                      더보기
                    </Text>
                  </Grid>
                ) : (
                  <Grid
                    hover="box-shadow:1px 1px 4px gray;"
                    cursor="pointer"
                    margin="0"
                    border="1px solid #030C37"
                    width="120px"
                    height="20px"
                    borderRadius="2px"
                    bg="#ffffff"
                    display="flex"
                    justifyContent="center"
                    alignItem="center"
                    padding="2px"
                    _onClick={() => {
                      if (paging.page === null) {
                        swal("게시물이 없습니다");
                      }
                      dispatch(getPreferDB(paging.page));
                    }}
                  >
                    <Text
                      cursor="pointer"
                      margin="0"
                      bold
                      size="10px"
                      color="#030C37"
                    >
                      더보기
                    </Text>
                  </Grid>
                )}
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
        display="flex"
        justifyContent="center"
        alignItem="center"
        width="100%"
        margin="0 auto"
      >
        <Grid
          position="relative"
          width="1282px"
          margin="0 278px 320px 360px"
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
              setAllCheck={setAllCheck}
              setSearchState={setSearchState}
              category={category}
              finishCheck={finishCheck}
              finish={finish}
            ></GroupFilter>
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              margin="64px auto 0 auto"
            >
              <Grid
                display="flex"
                justifyContent="left"
                alignItems="baseline"
                margin="0"
                width="auto"
              >
                {allCheck ? (
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
                      {preferData
                        ? preferData?.likeLocation === undefined ||
                          preferData?.likeLocation === null ||
                          preferData?.likeLocation === ""
                          ? null
                          : "#" + preferData?.likeLocation
                        : null}
                    </Text>
                    {preferData ? (
                      preferData?.likeDistance === "미정" ||
                      preferData?.likeDistance === undefined ||
                      preferData?.likeDistance === null ||
                      "" ? (
                        <Text margin="0" size="16px" color="#686EF9">
                          {" "}
                        </Text>
                      ) : (
                        <Text margin="0" size="16px" color="#686EF9">
                          {"#" + preferData?.likeDistance}
                        </Text>
                      )
                    ) : null}
                  </>
                )}
              </Grid>
              <Permit>
                <Grid
                  display="flex"
                  alignItem="center"
                  justifyContent="center"
                  padding="5px"
                  width="96px"
                  height="32px"
                  bg="#68F99E"
                  border="none"
                  borderRadius="3px"
                  cursor="pointer"
                  _onClick={() => {
                    history.push("/groupupload");
                  }}
                >
                  <Text
                    _onClick={() => {
                      history.push("/groupupload");
                    }}
                    cursor="pointer"
                    margin="0"
                    size="14px"
                    color="#030C37"
                  >
                    글쓰기
                  </Text>
                </Grid>
              </Permit>
            </Grid>
            <Hr></Hr>
            <Grid display="flex" alignItem="center" justifyContent="left">
              {allCheck ? (
                <>
                  {!searchState ? (
                    <Text
                      _onClick={() => {
                        allGroup();
                      }}
                      height="auto"
                      margin="0 12px 0 0"
                      bold
                      cursor="pointer"
                    >
                      전체
                    </Text>
                  ) : (
                    <Text
                      _onClick={() => {
                        allGroup();
                      }}
                      height="auto"
                      margin="0 12px 0 0"
                      bold
                      cursor="pointer"
                    >
                      필터 적용(클릭 시 전체보기 전환)
                    </Text>
                  )}

                  <img style={{ marginRight: "12px" }} src={categoryLine} />
                  <Text
                    _onClick={() => {
                      preferGroup();
                    }}
                    color="#B8B8B8"
                    height="auto"
                    margin="0"
                    cursor="pointer"
                  >
                    추천 그룹 러닝
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    _onClick={() => {
                      allGroup();
                    }}
                    height="auto"
                    margin="0 12px 0 0"
                    color="#B8B8B8"
                    cursor="pointer"
                  >
                    전체
                  </Text>
                  <img style={{ marginRight: "12px" }} src={categoryLine} />
                  <Text
                    _onClick={() => {
                      preferGroup();
                    }}
                    height="auto"
                    margin="0"
                    bold
                    cursor="pointer"
                  >
                    추천 그룹 러닝
                  </Text>
                </>
              )}
            </Grid>
            <OpenAnimation>
              <Grid margin="34px auto 0 auto" minHeight="600px" display="flex">
                {feedList.length !== 0 ? (
                  feedList?.map((item, idx) => {
                    return <GroupCard key={idx} {...item}></GroupCard>;
                  })
                ) : (
                  <img style={{ margin: "0 auto" }} src={noSearchData} />
                )}
              </Grid>
            </OpenAnimation>
            {feedList.length === 0 || paging.page === null ? null : (
              <Grid
                width="1200px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                margin="56px auto 0 auto"
              >
                {allCheck ? (
                  <Grid
                    hover="box-shadow:1px 1px 8px gray;"
                    cursor="pointer"
                    margin="0"
                    border="1px solid #030C37"
                    width="190px"
                    height="48px"
                    borderRadius="2px"
                    bg="#ffffff"
                    display="flex"
                    justifyContent="center"
                    alignItem="center"
                    padding="13px"
                    _onClick={() => {
                      if (paging.page === null) {
                        swal("게시물이 없습니다");
                      }
                      dispatch(getAllDB(paging.page));
                    }}
                  >
                    <Text
                      cursor="pointer"
                      margin="0"
                      bold
                      size="15px"
                      color="#030C37"
                    >
                      더보기
                    </Text>
                  </Grid>
                ) : (
                  <Grid
                    hover="box-shadow:1px 1px 8px gray;"
                    cursor="pointer"
                    margin="0"
                    border="1px solid #030C37"
                    width="190px"
                    height="48px"
                    borderRadius="2px"
                    bg="#ffffff"
                    display="flex"
                    justifyContent="center"
                    alignItem="center"
                    padding="13px"
                    _onClick={() => {
                      if (paging.page === null) {
                        swal("게시물이 없습니다");
                      }
                      dispatch(getPreferDB(paging.page));
                    }}
                  >
                    <Text
                      cursor="pointer"
                      margin="0"
                      bold
                      size="15px"
                      color="#030C37"
                    >
                      더보기
                    </Text>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>

          <Grid
            display="flex"
            flexDirection="column"
            position="sticky"
            top="726px"
            margin="auto"
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
      </Grid>
    </>
  );
};

const OpenAnimation = styled.div`
  -webkit-animation: swing-in-top-fwd 0.5s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  @-webkit-keyframes swing-in-top-fwd {
    0% {
      -webkit-transform: rotateX(-100deg);
      transform: rotateX(-100deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 1;
    }
  }
  @keyframes swing-in-top-fwd {
    0% {
      -webkit-transform: rotateX(-100deg);
      transform: rotateX(-100deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 1;
    }
  }
`;

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

const HrMob = styled.hr`
  width: 343px;
  border-top: 1px solid #f0f0f0;
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
  z-index: 1;
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
