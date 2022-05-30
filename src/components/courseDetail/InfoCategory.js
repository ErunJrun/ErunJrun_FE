import React, { Fragment, useEffect, useState } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";
import { Link } from "react-scroll";
import { useMediaQuery } from "react-responsive";

import { styled as muiStyled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";

import TabPanel from "@mui/lab/TabPanel";

import MapInfo from "./MapInfo";
import CommentList from "../comments/CommentList";
import ServeInfo from "./ServeInfo";

import mapIcon from "../../assets/groupDetail/map.png";
import { useDispatch, useSelector } from "react-redux";
import { resetReComm, _getReCommentFX } from "../../redux/modules/recomments";
import StarPoint from "./StarPoint";
import { useParams } from "react-router-dom";

const InfoCategory = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const commentList = useSelector((state) => state.comments.list);
  const starPoint = useSelector((state) => state.course.starPoint);
  const params = useParams();
  const courseId = params.courseId;

  const dispatch = useDispatch();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [checkedInfo, setCheckedInfo] = useState("");

  const goInfo = (e) => {
    setCheckedInfo(e);
  };

  const AntTabs = muiStyled(Tabs)({
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
      backgroundColor: "#68F99E",
    },
  });

  const AntTab = muiStyled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      minWidth: 0,
      [theme.breakpoints.up("sm")]: {
        minWidth: 0,
      },
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(1),
      color: "#7B7B7B",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "#68F99E",
        opacity: 1,
      },
      "&.Mui-selected": {
        color: "black",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#d1eaff",
      },
    })
  );

  if (isMobile) {
    return (
      <>
        <Box sx={{ width: "100%" }}>
          <TabContext value={value || "1"}>
            <Box sx={{ bgcolor: "#fff" }}>
              <AntTabs value={value || "1"} onChange={handleChange}>
                <AntTab
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "Spoqa Han Sans Neo",
                  }}
                  value="1"
                  label="코스 정보"
                />
                <AntTab
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "Spoqa Han Sans Neo",
                  }}
                  value="2"
                  label="소개"
                />

                <AntTab
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "Spoqa Han Sans Neo",
                  }}
                  value="3"
                  label={`리뷰(${commentList ? commentList?.length : 0})`}
                />
              </AntTabs>
              <Box />
            </Box>

            <TabPanel
              style={{ marginBottom: "100px", padding: "32px 16px" }}
              value="1"
            >
              <Text bold size="13px" margin="0 0 10px 0">
                상세 정보
              </Text>
              <ServeInfo />
              <Grid display="flex" alignItems="center" margin="0 0 15px 0">
                <MapIconImg src={mapIcon} />
                <Text bold size="13px" margin="0 0 16px 0">
                  지도로 보는 코스 정보
                </Text>
                <MapInfo />
              </Grid>
            </TabPanel>

            <TabPanel
              style={{ marginBottom: "100px", padding: "32px 16px" }}
              value="2"
            >
              <Text bold size="13px" margin="0 0 20px 0">
                상세 소개글
              </Text>
              <Text margin="0 0 137px 0" size="13px">
                {props.content}
              </Text>
            </TabPanel>

            <TabPanel
              style={{ marginBottom: "100px", padding: "32px 16px" }}
              value="3"
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="343px"
                padding="16px 42px"
                borderRadius="3px"
                border="1px solid #ddd"
                margin="0 auto 54px auto"
              >
                <Grid
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  margin="0"
                  width="auto"
                >
                  <Text size="12px" width="auto" margin="0 0 8px 0" bold>
                    코스 별점
                  </Text>
                  <StarPoint starPoint={starPoint} starOne={true} />
                  <Text width="auto" margin="8px 0 0 0" size="13px" bold>
                    {starPoint?.starPoint || starPoint?.starPoint !== "NaN"
                      ? starPoint?.starPoint
                      : "0.0"}{" "}
                    / <span style={{ fontWeight: "500" }}>5.0</span>
                    <span style={{ fontSize: "11px", color: "#7b7b7b" }}>
                      {"  "}(
                      {starPoint?.starPeople ? starPoint?.starPeople : "0"})
                    </span>
                  </Text>
                </Grid>

                <Grid
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  margin="0"
                  width="auto"
                >
                  <Text size="12px" width="auto" margin="0 0 8px 0" bold>
                    내가 준 별점
                  </Text>
                  <StarPoint courseId={courseId} />
                  <Text width="auto" margin="8px 0 0 0" size="13px" bold>
                    {starPoint?.myStarPoint === "NaN"
                      ? 0
                      : starPoint?.myStarPoint}{" "}
                    / 5.0
                  </Text>
                </Grid>
              </Grid>
              <CommentList course={true} />
            </TabPanel>
          </TabContext>
        </Box>
      </>
    );
  }

  return (
    <>
      <Grid display="flex" maxWidth="758px" margin="65px auto 0 auto">
        <Link to="추천 코스정보" spy={true} smooth={true}>
          <Grid margin="0" display="flex" justifyContent="center">
            <Text cursor="pointer" size="18px" bold margin="0 45px 0 0">
              코스정보
            </Text>
          </Grid>
        </Link>

        <Link to="추천 소개" spy={true} smooth={true}>
          <Grid margin="0" display="flex" justifyContent="center">
            <Text cursor="pointer" size="18px" bold margin="0 45px 0 0">
              소개
            </Text>
          </Grid>
        </Link>

        <Link to="추천 리뷰" spy={true} smooth={true}>
          <Grid display="flex" justifyContent="center">
            <Text cursor="pointer" size="18px" bold margin="0 45px 0 0">
              리뷰
            </Text>
          </Grid>
        </Link>
        <Hr></Hr>
      </Grid>
    </>
  );
};

const Hr = styled.hr`
  border-top: 1px solid #68f99e;
  width: 100%;
  height: 0px;
  margin-top: 8px;
  margin-bottom: 48px;
`;

const MapIconImg = styled.img`
  width: 14px;
  height: 20px;
  margin: 0 10px 16px 0;
`;

export default InfoCategory;
