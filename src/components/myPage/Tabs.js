import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Schedule from "./Schedule";
import Group from "../myPage/Group";
import MyGroup from "../myPage/MyGroup";
import Bookmark from "./Bookmark";
import MyCourse from "./MyCourse";
import Ready from "../../shared/Ready";
import { styled as muiStyled } from "@mui/material/styles";

import {
  getProfileDB,
  getRunningDB,
  getMyRunningDB,
} from "../../redux/modules/mypage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "swiper";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;

  const [value, setValue] = React.useState(0);
  const [expected, setExpected] = useState(true);
  const [complete, setComplete] = useState(false);
  const [myGroup, setMyGroup] = useState(false);
  const [bookmark, setBookmark] = useState(true);
  const [course, setCourse] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const AntTabs = muiStyled(Tabs)({
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
      backgroundColor: "#68F99E",
      borderBottom: "2px solid #68F99E",
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
        color: "#000",
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

  return (
    <Box sx={{ width: "1200px" }}>
      <Box sx={{ bgcolor: "#fff" }}>
        <AntTabs
          sx={{
            color: "#000",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Spoqa Han Sans Neo",
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <AntTab
            sx={{
              color: "#909090",
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Spoqa Han Sans Neo",
            }}
            label="그룹 러닝"
            {...a11yProps(0)}
          />
          <AntTab
            sx={{
              color: "#909090",
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Spoqa Han Sans Neo",
            }}
            label="추천 코스"
            {...a11yProps(1)}
          />
        </AntTabs>
      </Box>
      <TabPanel value={value} index={0}>
        {expected ? (
          <CategoryBox>
            <Btn
              onClick={() => {
                setExpected(true);
                setComplete(false);
                setMyGroup(false);
              }}
            >
              참여 예정
            </Btn>
            <Button
              onClick={() => {
                setExpected(false);
                setComplete(true);
                setMyGroup(false);
              }}
            >
              참여 완료
            </Button>
            <Button
              onClick={() => {
                setExpected(false);
                setComplete(false);
                setMyGroup(true);
              }}
            >
              My 모집
            </Button>
          </CategoryBox>
        ) : (
          <>
            {complete ? (
              <CategoryBox>
                <Button
                  onClick={() => {
                    setExpected(true);
                    setComplete(false);
                    setMyGroup(false);
                  }}
                >
                  참여 예정
                </Button>
                <Btn
                  onClick={() => {
                    setExpected(false);
                    setComplete(true);
                    setMyGroup(false);
                  }}
                >
                  참여 완료
                </Btn>
                <Button
                  onClick={() => {
                    setExpected(false);
                    setComplete(false);
                    setMyGroup(true);
                  }}
                >
                  My 모집
                </Button>
              </CategoryBox>
            ) : (
              <>
                {myGroup ? (
                  <CategoryBox>
                    <Button
                      onClick={() => {
                        setExpected(true);
                        setComplete(false);
                        setMyGroup(false);
                      }}
                    >
                      참여 예정
                    </Button>
                    <Button
                      onClick={() => {
                        setExpected(false);
                        setComplete(true);
                        setMyGroup(false);                
                      }}
                    >
                      참여 완료
                    </Button>
                    <Btn
                      onClick={() => {
                        setExpected(false);
                        setComplete(false);
                        setMyGroup(true);
                      }}
                    >
                      My 모집
                    </Btn>
                  </CategoryBox>
                ) : null}
              </>
            )}
          </>
        )}
        {expected === true ? <Schedule /> : null}
        {complete === true ? <Group /> : null}
        {myGroup === true ? <MyGroup /> : null}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CategoryBox>
          {bookmark === true ? 
            <>
              <Btn
                onClick={() => {
                  setBookmark(true);
                  setCourse(false);
                  //dispatch(getProfileDB(userId));
                }}
              >
                북마크
              </Btn>
              <Button
                onClick={() => {
                  setBookmark(false);
                  setCourse(true);
                  //dispatch(getRunningDB(userId));
                }}
              >
                My 추천
              </Button>
            </>
          : 
            <>
              <Button
                onClick={() => {
                  setBookmark(true);
                  setCourse(false);
                  //dispatch(getProfileDB(userId));
                }}
              >
                북마크
              </Button>
              <Btn
                onClick={() => {
                  setBookmark(false);
                  setCourse(true);
                  //dispatch(getRunningDB(userId));
                }}
              >
                My 추천
              </Btn>
            </>
          }
        </CategoryBox>
        {bookmark === true ? <Bookmark /> : null}
        {course === true ? <MyCourse /> : null}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Ready />
      </TabPanel>
    </Box>
  );
}

const CategoryBox = styled.div`
  display: flex;
  margin-left: -23px;
`;

const Btn = styled.div`
  width: 143px;
  height: 40px;
  margin: 0px 20px 30px 0;
  padding-top: 10px;
  border-radius: 50px;
  border: none;
  background-color: #68f99e;
  color: #030c37;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

const Button = styled.div`
  width: 143px;
  height: 40px;
  margin: 0px 20px 30px 0;
  padding-top: 10px;
  border-radius: 50px;
  border: none;
  background-color: #f0f0f0;
  color: #7b7b7b;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;
