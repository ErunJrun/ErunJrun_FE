import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import starIcon from "../../assets/courseFeed/star.svg";
import bookmarkWhite from "../../assets/courseFeed/bookmarkWhite.svg";
import bookmarkGreen from "../../assets/courseFeed/bookmarkGreen.svg";

import { history } from "../../redux/configureStore";
import { bookmarkDB, bookmarkRankingDB } from "../../redux/modules/course";
import { useDispatch } from "react-redux";

const BestCourseMob = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid
        cursor="pointer"
        margin="0 16px 0 0"
        width="236px"
        display="flex"
        flexDirection="column"
      >
        <Grid cursor="pointer" position="relative">
          <img
            onClick={() => {
              history.push(`/courseDetail/${props.courseId}`);
            }}
            style={{
              width: "236px",
              height: "177px",
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
            size="36px"
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
            width="212px"
            height="78px"
            bg="#fff"
            borderRadius="6px"
            padding="10px"
            position="absolute"
            bottom="-5px"
            left="12px"
          >
            <Text textLeft cursor="pointer" margin="0 0 3px 0" size="10px" bold>
              {props.title}
            </Text>

            <Grid
              cursor="pointer"
              display="flex"
              alignItems="center"
              margin="0 0 6px 0"
              height="auto"
            >
              <img style={{ width: "7.4px", height: "7px" }} src={starIcon} />
              <Text margin="0 2.3px 0 0" size="9px" bold>
                {props.starPoint || props.starPoint !== "Nan"
                  ? props.starPoint
                  : 0}
              </Text>
              <Text cursor="pointer" margin="0" color="#909090" size="9px">
                리뷰 {props.commentCnt}개
              </Text>
            </Grid>

            <Grid cursor="pointer" display="flex">
              <Tag>
                <Title>{props.location}</Title>
              </Tag>
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
  max-width: 70px;
  width: 100%;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 6px 0 0;
  padding: 2px 4px;
  border-radius: 1px;
  background-color: #ddd;
  font-size: 8px;
  color: #7b7b7b;
`;

const Title = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-size: 8px;
  cursor: pointer;
`;

export default BestCourseMob;
