import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Redux
import { getAllDB, getPreferDB, resetGroup } from "../../redux/modules/feed";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDB, resetCourse } from "../../redux/modules/course";

//css, library, package
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
import "./DrawerCategoryCourse.css";

//Image
import drawerArrow from "../../assets/groupFeed/drawerArrowLeft.svg";
import inputArrowGray from "../../assets/groupUpload/inputArrowGray.svg";

//elements
import { Grid, Text } from "../../elements";

const DrawerCategoryCourse = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const region = params.region;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [filter, setFilter] = React.useState("최신순");
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

  const newCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseDB(region, "new", 1, 6));
  };

  const starCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseDB(region, "starPoint", 1, 6));
  };

  const commCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseDB(region, "comment", 1, 6));
  };

  const bookCourse = () => {
    dispatch(resetCourse());
    dispatch(getCourseDB(region, "bookmark", 1, 6));
  };

  useEffect(() => {
    dispatch(resetCourse());
    setFilter("최신순");
  }, [region]);

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
        margin="0"
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
          {filter === "최신순" ? (
            <Grid display="flex" flexDirection="column">
              <Text
                _onClick={() => {
                  setFilter("최신순");
                  newCourse();
                }}
                size="13px"
                margin="16px auto"
              >
                최신순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("별점 높은순");
                  starCourse();
                }}
                size="13px"
                margin="16px auto"
                color="#7B7B7B"
              >
                별점 높은순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("리뷰 많은순");
                  commCourse();
                }}
                size="13px"
                margin="16px auto"
                color="#7B7B7B"
              >
                리뷰 많은순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("북마크 많은순");
                  bookCourse();
                }}
                size="13px"
                margin="16px auto 32px auto"
                color="#7B7B7B"
              >
                북마크 많은순
              </Text>
            </Grid>
          ) : filter === "별점 높은순" ? (
            <Grid display="flex" flexDirection="column">
              <Text
                _onClick={() => {
                  setFilter("최신순");
                  newCourse();
                }}
                size="13px"
                margin="16px auto"
                color="#7B7B7B"
              >
                최신순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("별점 높은순");
                  starCourse();
                }}
                size="13px"
                margin="16px auto"
              >
                별점 높은순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("리뷰 많은순");
                  commCourse();
                }}
                size="13px"
                margin="16px auto"
                color="#7B7B7B"
              >
                리뷰 많은순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("북마크 많은순");
                  bookCourse();
                }}
                size="13px"
                margin="16px auto 32px auto"
                color="#7B7B7B"
              >
                북마크 많은순
              </Text>
            </Grid>
          ) : filter === "리뷰 많은순" ? (
            <Grid display="flex" flexDirection="column">
              <Text
                _onClick={() => {
                  setFilter("최신순");
                  newCourse();
                }}
                size="13px"
                margin="16px auto"
                color="#7B7B7B"
              >
                최신순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("별점 높은순");
                  starCourse();
                }}
                size="13px"
                margin="16px auto"
                color="#7B7B7B"
              >
                별점 높은순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("리뷰 많은순");
                  commCourse();
                }}
                size="13px"
                margin="16px auto"
              >
                리뷰 많은순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("북마크 많은순");
                  bookCourse();
                }}
                size="13px"
                margin="16px auto 32px auto"
                color="#7B7B7B"
              >
                북마크 많은순
              </Text>
            </Grid>
          ) : filter === "북마크 많은순" ? (
            <Grid display="flex" flexDirection="column">
              <Text
                _onClick={() => {
                  setFilter("최신순");
                  newCourse();
                }}
                size="13px"
                margin="16px auto"
                color="#7B7B7B"
              >
                최신순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("별점 높은순");
                  starCourse();
                }}
                size="13px"
                margin="16px auto"
                color="#7B7B7B"
              >
                별점 높은순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("리뷰 많은순");
                  commCourse();
                }}
                size="13px"
                margin="16px auto"
                color="#7B7B7B"
              >
                리뷰 많은순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("북마크 많은순");
                  bookCourse();
                }}
                size="13px"
                margin="16px auto 32px auto"
              >
                북마크 많은순
              </Text>
            </Grid>
          ) : (
            <Grid display="flex" flexDirection="column">
              <Text
                _onClick={() => {
                  setFilter("최신순");
                  newCourse();
                }}
                size="13px"
                margin="16px auto"
              >
                최신순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("별점 높은순");
                  starCourse();
                }}
                size="13px"
                margin="16px auto"
              >
                별점 높은순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("리뷰 많은순");
                  commCourse();
                }}
                size="13px"
                margin="16px auto"
              >
                리뷰 많은순
              </Text>

              <hr
                style={{
                  width: "375px",
                  height: "0",
                  borderTop: "2px solid #f0f0f0",
                }}
              ></hr>

              <Text
                _onClick={() => {
                  setFilter("북마크 많은순");
                  bookCourse();
                }}
                size="13px"
                margin="16px auto 32px auto"
              >
                북마크 많은순
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

export default DrawerCategoryCourse;
