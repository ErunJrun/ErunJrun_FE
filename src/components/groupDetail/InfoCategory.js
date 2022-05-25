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
import Appliers from "./Appliers";
import CommentList from "../comments/CommentList";
import ServeInfo from "./ServeInfo";

import mapIcon from "../../assets/groupDetail/map.png";
import { useDispatch, useSelector } from "react-redux";
import { resetReComm, _getReCommentFX } from "../../redux/modules/recomments";

const InfoCategory = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const commentList = useSelector((state) => state.comments.list);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [checkedInfo, setCheckedInfo] = useState("");

  const goInfo = (e) => {
    setCheckedInfo(e);
  };

  const [infoCategory, setInfoCategory] = useState([
    "코스정보",
    "소개",
    "크루원",
    "Q&A",
  ]);

  const AntTabs = muiStyled(Tabs)({
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
      backgroundColor: "#68F99E",
    },
  });

  React.useEffect(() => {
    if (commentList.length > 0) {
      dispatch(_getReCommentFX(commentList[0].commentId));
    }

    return () => {
      dispatch(resetReComm());
    };
  }, [commentList]);

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
          <TabContext value={value}>
            <Box sx={{ bgcolor: "#fff" }}>
              <AntTabs value={value} onChange={handleChange}>
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
                  label="상세 소개"
                />
                <AntTab
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "Spoqa Han Sans Neo",
                  }}
                  value="3"
                  label="크루원"
                />
                <AntTab
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "Spoqa Han Sans Neo",
                  }}
                  value="4"
                  label="Q&A"
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
              <Appliers />
            </TabPanel>
            <TabPanel
              style={{ marginBottom: "100px", padding: "32px 16px" }}
              value="4"
            >
              <CommentList />
            </TabPanel>
          </TabContext>
        </Box>
      </>
    );
  }

  return (
    <>
      <Grid display="flex" maxWidth="758px" margin="65px auto 0 auto">
        <Link to="코스정보" spy={true} smooth={true}>
          <Grid margin="0" display="flex" justifyContent="center">
            <Text cursor="pointer" size="18px" bold margin="0 45px 0 0">
              코스정보
            </Text>
          </Grid>
        </Link>

        <Link to="소개" spy={true} smooth={true}>
          <Grid margin="0" display="flex" justifyContent="center">
            <Text cursor="pointer" size="18px" bold margin="0 45px 0 0">
              상세 소개
            </Text>
          </Grid>
        </Link>

        <Link to="크루원" spy={true} smooth={true}>
          <Grid margin="0" display="flex" justifyContent="center">
            <Text cursor="pointer" size="18px" bold margin="0 45px 0 0">
              크루원
            </Text>
          </Grid>
        </Link>

        <Link to="Q&A" spy={true} smooth={true}>
          <Grid display="flex" justifyContent="center">
            <Text cursor="pointer" size="18px" bold margin="0 45px 0 0">
              Q&A
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
