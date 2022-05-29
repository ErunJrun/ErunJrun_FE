import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Grid, Text } from "../../elements";
import drawerArrow from "../../assets/groupFeed/drawerArrowLeft.svg";
import inputArrowGray from "../../assets/groupUpload/inputArrowGray.svg";
import "./DrawerCategory.css";
import { getAllDB, getPreferDB, resetGroup } from "../../redux/modules/feed";
import { useDispatch, useSelector } from "react-redux";

const DrawerCategory = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [filter, setFilter] = React.useState("전체");
  const paging = useSelector((state) => state.feed.paging);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const allGroup = () => {
    dispatch(resetGroup());
    dispatch(getAllDB(paging.page + 1, 6));
  };

  const preferGroup = () => {
    dispatch(resetGroup());
    dispatch(getPreferDB(paging.page + 1, 6));
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        margin="0 0 40px  0"
      >
        <Grid display="flex" height="auto" margin="20px 0 0 0" width="375px">
          <img
            style={{ width: "8px", margin: "0 146px 0 20px", height: "auto" }}
            src={drawerArrow}
          />
          <Text height="auto" size="14px" margin="0" bold>
            정렬
          </Text>
        </Grid>

        <List>
          {filter === "전체" ? (
            <Grid display="flex" flexDirection="column">
              <Text
                _onClick={() => {
                  setFilter("전체");
                  allGroup();
                }}
                size="13px"
                margin="32px auto 16px auto"
              >
                전체
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                  marginBottom: "16px",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("추천 그룹 러닝");
                  preferGroup();
                }}
                size="13px"
                margin="0 auto"
                color="#7B7B7B"
              >
                추천 그룹 러닝
              </Text>
            </Grid>
          ) : filter === "추천 그룹 러닝" ? (
            <Grid display="flex" flexDirection="column">
              <Text
                _onClick={() => {
                  setFilter("전체");
                  allGroup();
                }}
                size="13px"
                margin="32px auto 16px auto"
                color="#7B7B7B"
              >
                전체
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                  marginBottom: "16px",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("추천 그룹 러닝");
                  preferGroup();
                }}
                size="13px"
                margin="0 auto"
              >
                추천 그룹 러닝
              </Text>
            </Grid>
          ) : (
            <Grid display="flex" flexDirection="column">
              <Text
                _onClick={() => {
                  setFilter("전체");
                  allGroup();
                }}
                size="13px"
                margin="32px auto 16px auto"
              >
                전체
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                  marginBottom: "16px",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("추천 그룹 러닝");
                  preferGroup();
                }}
                size="13px"
                margin="0 auto"
                color="#7B7B7B"
              >
                추천 그룹 러닝
              </Text>
            </Grid>
          )}
        </List>
      </Grid>
    </Box>
  );

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Grid display="flex">
            <Text
              size="11px"
              bold
              margin="0 6px 0 0"
              _onClick={toggleDrawer(anchor, true)}
            >
              {filter}
            </Text>
            <img
              onClick={toggleDrawer(anchor, true)}
              style={{ width: "10px", marginTop: "2px" }}
              src={inputArrowGray}
            />
          </Grid>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DrawerCategory;
