import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Group from "../myPage/Group";
import MyGroup from "../myPage/MyGroup";
import Ready from "../../shared/Ready";

import { getRunningDB, getMyRunningDB } from "../../redux/modules/mypage";
import { useDispatch, useSelector } from "react-redux";

const TabPanel = (props) => {
  const { children, value, index } = props;

  // useEffect(() => {
  //   dispatch(getProfileDB(userId));
  // }, []);

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

  const userId = localStorage.getItem("userId");

  const [value, setValue] = React.useState(0);

  const [complete, setComplete] = useState(true);
  const [myGroup, setMyGroup] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "106%" }}>
      <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="그룹 러닝" {...a11yProps(0)} />
          <Tab label="추천 코스" {...a11yProps(1)} />
          <Tab label="뱃지" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Btn
          onClick={() => {
            setComplete(true);
            setMyGroup(false);
            dispatch(getRunningDB(userId));
          }}
        >
          참여완료 그룹 러닝
        </Btn>
        <Btn
          onClick={() => {
            setMyGroup(true);
            setComplete(false);
            dispatch(getMyRunningDB(userId));
          }}
        >
          진행완료 그룹 러닝
        </Btn>

        {complete === true ? <Group /> : null}

        {myGroup === true ? <MyGroup /> : null}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Ready />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Ready />
      </TabPanel>
    </Box>
  );
}

const Btn = styled.button`
  width: 184px;
  height: 40px;
  margin: 20px 20px 30px 0;
  padding-top: 1px;
  border-radius: 50px;
  border: none;
  background-color: #95fbc7;
  color: #030c37;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  :hover {
    font-weight: 900;
    background-color: #00f6ac;
  }
`;
