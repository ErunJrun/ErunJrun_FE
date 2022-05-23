import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import starIcon from "../../assets/courseFeed/star.svg";
import bookmarkWhite from "../../assets/courseFeed/bookmarkWhite.svg";

const CourseCard = () => {
  return (
    <>
      <Grid
        width="1200px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          margin="0 0 72px 0"
          width="384px"
          display="flex"
          flexDirection="column"
        >
          <Grid position="relative">
            <img
              style={{
                width: "384px",
                height: "auto",
                position: "relative",
                borderRadius: "3px 3px 0 0",
              }}
              src="https://scorefactory.io/files/attach/images/1064321/311/104/001/a62bc82ce0e4ce07deb899e1d0321708.jpg"
            />

            <BookmarkWhite src={bookmarkWhite} />
            <Grid
              width="354px"
              height="auto"
              bg="white"
              borderRadius="6px"
              padding="16px"
              position="absolute"
              left="15px"
              bottom="-45px"
            >
              <Text margin="0 0 4px 0" size="18px" bold>
                벚꽃과 함께 달리는 러닝 명소
              </Text>

              <Grid display="flex" alignItems="center" margin="10px 0 8px 0">
                <img style={{ width: "13px", height: "17px" }} src={starIcon} />
                <Text margin="0 10px 0 4px" bold>
                  4.57
                </Text>
                <Text margin="0" color="#909090" size="14px" regular>
                  리뷰 427개
                </Text>
              </Grid>
              <Grid cursor="pointer" display="flex">
                <Tag>서울 관악구</Tag>
                <Tag>10km</Tag>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          margin="0 0 72px 0"
          width="384px"
          display="flex"
          flexDirection="column"
        >
          <Grid position="relative">
            <img
              style={{
                width: "384px",
                height: "auto",
                position: "relative",
                borderRadius: "3px 3px 0 0",
              }}
              src="https://scorefactory.io/files/attach/images/1064321/311/104/001/a62bc82ce0e4ce07deb899e1d0321708.jpg"
            />

            <BookmarkWhite src={bookmarkWhite} />
            <Grid
              width="354px"
              height="auto"
              bg="white"
              borderRadius="6px"
              padding="16px"
              position="absolute"
              left="15px"
              bottom="-45px"
            >
              <Text margin="0 0 4px 0" size="18px" bold>
                벚꽃과 함께 달리는 러닝 명소
              </Text>

              <Grid display="flex" alignItems="center" margin="10px 0 8px 0">
                <img style={{ width: "13px", height: "17px" }} src={starIcon} />
                <Text margin="0 10px 0 4px" bold>
                  4.57
                </Text>
                <Text margin="0" color="#909090" size="14px" regular>
                  리뷰 427개
                </Text>
              </Grid>
              <Grid cursor="pointer" display="flex">
                <Tag>서울 관악구</Tag>
                <Tag>10km</Tag>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          margin="0 0 72px 0"
          width="384px"
          display="flex"
          flexDirection="column"
        >
          <Grid position="relative">
            <img
              style={{
                width: "384px",
                height: "auto",
                position: "relative",
                borderRadius: "3px 3px 0 0",
              }}
              src="https://scorefactory.io/files/attach/images/1064321/311/104/001/a62bc82ce0e4ce07deb899e1d0321708.jpg"
            />

            <BookmarkWhite src={bookmarkWhite} />
            <Grid
              width="354px"
              height="auto"
              bg="white"
              borderRadius="6px"
              padding="16px"
              position="absolute"
              left="15px"
              bottom="-45px"
            >
              <Text margin="0 0 4px 0" size="18px" bold>
                벚꽃과 함께 달리는 러닝 명소
              </Text>

              <Grid display="flex" alignItems="center" margin="10px 0 8px 0">
                <img style={{ width: "13px", height: "17px" }} src={starIcon} />
                <Text margin="0 10px 0 4px" bold>
                  4.57
                </Text>
                <Text margin="0" color="#909090" size="14px" regular>
                  리뷰 427개
                </Text>
              </Grid>
              <Grid cursor="pointer" display="flex">
                <Tag>서울 관악구</Tag>
                <Tag>10km</Tag>
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
  top: -3px;
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
