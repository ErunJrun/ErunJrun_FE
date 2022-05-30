import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import starIcon from "../../assets/courseFeed/star.svg";
import bookmarkWhite from "../../assets/courseFeed/bookmarkWhite.svg";
import bookmarkGreen from "../../assets/courseFeed/bookmarkGreen.svg";
import { bookmarkDB, bookmarkMainDB } from "../../redux/modules/course";
import { useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";

const CourseCard = (props) => {
  const dispatch = useDispatch();

  if (props.main) {
    return (
      <>
        <Grid width="384px" display="flex" alignItems="center" margin="0 8px">
          <Grid
            margin="0 0 72px 0"
            width="384px"
            display="flex"
            flexDirection="column"
          >
            <Grid cursor="pointer" position="relative">
              <img
                onClick={() => {
                  history.push(`/courseDetail/${props.courseId}`);
                }}
                style={{
                  width: "384px",
                  height: "288px",
                  position: "relative",
                  borderRadius: "3px 3px 0 0",
                }}
                src={props.courseImageUrl1}
              />
              {props.bookmark ? (
                <BookmarkWhite
                  onClick={() => {
                    dispatch(bookmarkMainDB(props.courseId));
                  }}
                  src={bookmarkGreen}
                />
              ) : (
                <BookmarkWhite
                  onClick={() => {
                    dispatch(bookmarkMainDB(props.courseId));
                  }}
                  src={bookmarkWhite}
                />
              )}

              <Grid
                _onClick={() => {
                  history.push(`/courseDetail/${props.courseId}`);
                }}
                width="354px"
                height="auto"
                bg="white"
                borderRadius="6px"
                padding="16px"
                position="absolute"
                left="15px"
                bottom="-45px"
                cursor="pointer"
              >
                <Text cursor="pointer" margin="0 0 4px 0" size="18px" bold>
                  {props.title}
                </Text>

                <Grid
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  margin="10px 0 8px 0"
                >
                  <img
                    style={{ width: "13px", height: "17px" }}
                    src={starIcon}
                  />
                  <Text cursor="pointer" margin="0 10px 0 4px" bold>
                    {props.starPoint}
                  </Text>
                  <Text
                    cursor="pointer"
                    margin="0"
                    color="#909090"
                    size="14px"
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
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid width="384px" display="flex" alignItems="center" margin="0 8px">
        <Grid
          margin="0 0 72px 0"
          width="384px"
          display="flex"
          flexDirection="column"
        >
          <Grid cursor="pointer" position="relative">
            <img
              onClick={() => {
                history.push(`/courseDetail/${props.courseId}`);
              }}
              style={{
                width: "384px",
                height: "288px",
                position: "relative",
                borderRadius: "3px 3px 0 0",
              }}
              src={props.courseImageUrl1}
            />
            {props.bookmark ? (
              <BookmarkWhite
                onClick={() => {
                  dispatch(bookmarkDB(props.courseId));
                }}
                src={bookmarkGreen}
              />
            ) : (
              <BookmarkWhite
                onClick={() => {
                  dispatch(bookmarkDB(props.courseId));
                }}
                src={bookmarkWhite}
              />
            )}

            <Grid
              _onClick={() => {
                history.push(`/courseDetail/${props.courseId}`);
              }}
              width="354px"
              height="auto"
              bg="white"
              borderRadius="6px"
              padding="16px"
              position="absolute"
              left="15px"
              bottom="-45px"
              cursor="pointer"
            >
              <Text cursor="pointer" margin="0 0 4px 0" size="18px" bold>
                {props.title}
              </Text>

              <Grid
                cursor="pointer"
                display="flex"
                alignItems="center"
                margin="10px 0 8px 0"
              >
                <img style={{ width: "13px", height: "17px" }} src={starIcon} />
                <Text cursor="pointer" margin="0 10px 0 4px" bold>
                  {props.starPoint}
                </Text>
                <Text
                  cursor="pointer"
                  margin="0"
                  color="#909090"
                  size="14px"
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
      </Grid>
    </>
  );
};

const BookmarkWhite = styled.img`
  position: absolute;
  width: 32px;
  height: 36px;
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
  margin: 0 10px 0 0;
  padding: 1px 10px;
  border-radius: 2px;
`;

export default CourseCard;
