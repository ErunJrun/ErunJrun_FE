import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import starIcon from "../../assets/courseFeed/star.svg";
import bookmarkWhite from "../../assets/courseFeed/bookmarkWhite.svg";
import bookmarkGreen from "../../assets/courseFeed/bookmarkGreen.svg";

import { history } from "../../redux/configureStore";
import { bookmarkDB, bookmarkRankingDB } from "../../redux/modules/course";
import { useDispatch } from "react-redux";

const BestCourse = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid
        cursor="pointer"
        margin="0 16px 0 0"
        width="288px"
        display="flex"
        flexDirection="column"
      >
        <Grid cursor="pointer" position="relative">
          <img
            onClick={() => {
              history.push(`/courseDetail/${props.courseId}`);
            }}
            style={{
              width: "288px",
              height: "213px",
              position: "relative",
              borderRadius: "3px 3px 0 0",
            }}
            src={props.courseImageUrl1}
          />
          <Text
            _onClick={() => {
              history.push(`/courseDetail/${props.courseId}`);
            }}
            cursor="pointer"
            margin="0"
            size="40px"
            position="absolute"
            top="1px"
            left="20px"
            color="white"
          >
            {props.idx + 1}
          </Text>
          {props.bookmark ? (
            <BookmarkWhite
              onClick={() => {
                dispatch(bookmarkRankingDB(props.courseId));
              }}
              src={bookmarkGreen}
            />
          ) : (
            <BookmarkWhite
              onClick={() => {
                dispatch(bookmarkRankingDB(props.courseId));
              }}
              src={bookmarkWhite}
            />
          )}

          <Grid
            _onClick={() => {
              history.push(`/courseDetail/${props.courseId}`);
            }}
            cursor="pointer"
            width="258px"
            height="auto"
            bg="white"
            borderRadius="6px"
            padding="16px"
            position="absolute"
            bottom="-41px"
            left="15px"
          >
            <Text cursor="pointer" margin="0 0 4px 0" size="14px" bold>
              {props.title}
            </Text>

            <Grid
              cursor="pointer"
              display="flex"
              alignItems="center"
              margin="10px 0 8px 0"
            >
              <img style={{ width: "13px", height: "17px" }} src={starIcon} />
              <Text margin="0 10px 0 4px" size="12px" bold>
                {props.starPoint || props.starPoint !== "Nan"
                  ? props.starPoint
                  : 0}
              </Text>
              <Text
                cursor="pointer"
                margin="0"
                color="#909090"
                size="12px"
                regular
              >
                리뷰 {props.commentCnt}개
              </Text>
            </Grid>
            <Grid cursor="pointer" display="flex">
              <Tag>{props.location}</Tag>
              <Tag>{props.distance}km</Tag>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const BookmarkWhite = styled.img`
  position: absolute;
  width: 19px;
  height: 25px;
  z-index: 2;
  right: 10px;
  top: 0;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  height: 24px;
  background-color: #ddd;
  margin: 0 4px 0 0;
  padding: 1px 10px;
  border-radius: 2px;
`;

export default BestCourse;
