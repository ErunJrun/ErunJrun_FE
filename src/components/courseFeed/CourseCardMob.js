import React from "react";

//Redux
import { bookmarkDB, bookmarkMainDB } from "../../redux/modules/course";
import { useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";

//css, library, package
import styled from "styled-components";

//Image
import starIcon from "../../assets/courseFeed/star.svg";
import bookmarkWhite from "../../assets/courseFeed/bookmarkWhite.svg";
import bookmarkGreen from "../../assets/courseFeed/bookmarkGreen.svg";
//elements
import { Grid, Text } from "../../elements";

const CourseCardMob = (props) => {
  const dispatch = useDispatch();

  if (props.main) {
    return (
      <>
        <Grid
          width="156px"
          display="flex"
          alignItems="center"
          margin="53px 2px 52px 2px"
        >
          <Grid
            margin="0 0 7px 0"
            width="156px"
            display="flex"
            flexDirection="column"
          >
            <Grid cursor="pointer" position="relative" margin="0">
              <img
                onClick={() => {
                  history.push(`/courseDetail/${props.courseId}`);
                }}
                style={{
                  width: "156px",
                  height: "117px",
                  position: "relative",
                  borderRadius: "3px 3px 0 0",
                  objectFit: "cover",
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
                width="146px"
                height="auto"
                bg="white"
                borderRadius="6px"
                padding="8px"
                position="absolute"
                left="5px"
                bottom="-35px"
                cursor="pointer"
              >
                <Text
                  hiddenText
                  cursor="pointer"
                  margin="0 0 5px 0"
                  size="9px"
                  bold
                >
                  {props.title}
                </Text>

                <Grid
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  margin="0 0 7px 0"
                >
                  <img
                    style={{ width: "7.4px", height: "7px" }}
                    src={starIcon}
                  />
                  <Text size="8px" cursor="pointer" margin="0 4px 0 1.3px" bold>
                    {props.starPoint && props.starPoint !== "Nan"
                      ? props.starPoint
                      : 0}
                  </Text>
                  <Text cursor="pointer" margin="0" color="#909090" size="8px">
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
      <Grid
        width="166px"
        display="flex"
        alignItems="center"
        margin="0 2px 52px 2px"
      >
        <Grid
          margin="0 0 7px 0"
          width="166px"
          display="flex"
          flexDirection="column"
        >
          <Grid cursor="pointer" position="relative" margin="0">
            <img
              onClick={() => {
                history.push(`/courseDetail/${props.courseId}`);
              }}
              style={{
                width: "166px",
                height: "126px",
                position: "relative",
                borderRadius: "3px 3px 0 0",
                objectFit: "cover",
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
              width="156px"
              height="auto"
              bg="white"
              borderRadius="6px"
              padding="8px"
              position="absolute"
              left="5px"
              bottom="-35px"
              cursor="pointer"
            >
              <Text
                hiddenText
                cursor="pointer"
                margin="0 0 5px 0"
                size="9px"
                bold
              >
                {props.title}
              </Text>

              <Grid
                cursor="pointer"
                display="flex"
                alignItems="center"
                margin="0 0 7px 0"
              >
                <img style={{ width: "7.4px", height: "7px" }} src={starIcon} />
                <Text size="8px" cursor="pointer" margin="0 4px 0 1.3px" bold>
                  {props.starPoint && props.starPoint !== "Nan"
                    ? props.starPoint
                    : 0}
                </Text>
                <Text cursor="pointer" margin="0" color="#909090" size="8px">
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
  width: 15px;
  height: 19px;
  z-index: 1;
  right: 10px;
  top: 0;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 8px;
  height: 14px;
  background-color: #ddd;
  margin: 0 6px 0 0;
  padding: 1px 6px;
  border-radius: 1px;
  color: #7b7b7b;
`;

export default CourseCardMob;
