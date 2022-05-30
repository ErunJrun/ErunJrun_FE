import React from "react";
import { Text, Grid } from "../../elements";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { bookmarkDB } from "../../redux/modules/course";
import starIcon from "../../assets/courseFeed/star.svg";
import bookmarkWhite from "../../assets/courseFeed/bookmarkWhite.svg";
import bookmarkGreen from "../../assets/courseFeed/bookmarkGreen.svg";

const Bookmark = () => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.mypage.mycourse);

  return (
    <Grid width="1230px" display="flex" margin="0 0 0 -31px">
      {course?.data?.feed?.length === 0 ? (
        <Box>내가 만든 코스추천 게시물이 없습니다</Box>
      ) : (
        <>
          {course?.data?.feed?.map((feed, index) => {
            return (
              <Grid
                key={index}
                width="288px"
                display="flex"
                alignItems="center"
                margin="0 8px"
                _onClick={() => {
                  history.push(`/courseDetail/${feed?.courseId}`);
                }}
              >
                <Grid
                  margin="0 0 90px 0"
                  width="288px"
                  display="flex"
                  flexDirection="column"
                >
                  <Grid position="relative">
                    <img
                      style={{
                        width: "288px",
                        height: "216px",
                        position: "relative",
                        borderRadius: "3px 3px 0 0",
                      }}
                      src={feed?.courseImageUrl1}
                    />
                    {feed?.bookmark ? (
                      <BookmarkWhite
                        onClick={() => {
                          dispatch(bookmarkDB(feed?.courseId));
                        }}
                        src={bookmarkGreen}
                      />
                    ) : (
                      <BookmarkWhite
                        onClick={() => {
                          dispatch(bookmarkDB(feed?.courseId));
                        }}
                        src={bookmarkWhite}
                      />
                    )}

                    <Grid
                      width="267px"
                      height="auto"
                      bg="white"
                      borderRadius="6px"
                      padding="10px 16px"
                      position="absolute"
                      left="10px"
                      bottom="-45px"
                    >
                      <Text margin="0 0 4px 0" size="14px" bold>
                        {feed?.title}
                      </Text>

                      <Grid
                        display="flex"
                        alignItems="center"
                        margin="10px 0 8px 0"
                      >
                        <img
                          style={{ width: "13px", height: "17px" }}
                          src={starIcon}
                        />
                        <Text margin="0 10px 0 4px" size="13px" bold>
                          {feed?.starPoint && feed?.starPoint !== "Nan"
                            ? feed?.starPoint
                            : 0}
                        </Text>
                        <Text margin="0" color="#909090" size="12px" regular>
                          리뷰{feed?.commentCnt}개
                        </Text>
                      </Grid>
                      <Grid cursor="pointer" display="flex">
                        <Tag>{feed?.location}</Tag>
                        <Tag>{feed?.distance}km</Tag>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </>
      )}
    </Grid>
  );
};

const Box = styled.div`
  font-weight: 900;
  font-size: 26px;
  color: #333;
  height: 100px;
  width: 1220px;
  background-color: #fff;
  padding: 250px 11px;
  text-align: center;
  border: none;
`;
const BookmarkWhite = styled.img`
  position: absolute;
  width: 26px;
  height: 32px;
  z-index: 2;
  right: 15px;
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

export default Bookmark;
