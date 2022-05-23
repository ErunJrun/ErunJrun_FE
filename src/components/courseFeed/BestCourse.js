import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import starIcon from "../../assets/courseFeed/star.svg";
import bookmarkWhite from "../../assets/courseFeed/bookmarkWhite.svg";

const BestCourse = () => {
  return (
    <>
      <Grid margin="0 0 16px 0" display="flex" alignItems="baseline">
        <Text margin="0 4px 0 0" bold size="18px">
          #고양시
        </Text>
        <Text margin="0">코스맛집 BEST 4</Text>
      </Grid>

      <Grid display="flex" width="1200px">
        <Grid
          margin="0 16px 0 0"
          width="288px"
          display="flex"
          flexDirection="column"
        >
          <Grid position="relative">
            <img
              style={{
                width: "288px",
                height: "213px",
                position: "relative",
                borderRadius: "3px 3px 0 0",
              }}
              src="https://scorefactory.io/files/attach/images/1064321/311/104/001/a62bc82ce0e4ce07deb899e1d0321708.jpg"
            />
            <Text
              margin="0"
              size="40px"
              position="absolute"
              top="1px"
              left="20px"
              color="white"
            >
              1
            </Text>
            <BookmarkWhite src={bookmarkWhite} />
          </Grid>

          <Grid
            width="258px"
            height="auto"
            bg="white"
            borderRadius="6px"
            padding="16px"
            position="absolute"
            top="340px"
            left="15px"
          >
            <Text margin="0 0 4px 0" size="14px" bold>
              벚꽃과 함께 달리는 러닝 명소
            </Text>

            <Grid display="flex" alignItems="center" margin="10px 0 8px 0">
              <img style={{ width: "13px", height: "17px" }} src={starIcon} />
              <Text margin="0 10px 0 4px" size="12px" bold>
                4.57
              </Text>
              <Text margin="0" color="#909090" size="12px" regular>
                리뷰 427개
              </Text>
            </Grid>
            <Grid cursor="pointer" display="flex">
              <Tag>서울 관악구</Tag>
              <Tag>10km</Tag>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          margin="0 16px 0 0"
          width="288px"
          display="flex"
          flexDirection="column"
        >
          <Grid position="relative">
            <img
              style={{
                width: "288px",
                height: "213px",
                position: "relative",
                borderRadius: "3px 3px 0 0",
              }}
              src="https://img.wkorea.com/w/2018/07/style_5b52b0a698fd3-1200x800.jpg"
            />
            <Text
              margin="0"
              size="40px"
              position="absolute"
              top="1px"
              left="20px"
              color="white"
            >
              2
            </Text>
            <BookmarkWhite src={bookmarkWhite} />
          </Grid>

          <Grid
            width="258px"
            height="auto"
            bg="white"
            borderRadius="6px"
            padding="16px"
            position="absolute"
            top="340px"
            left="320px"
          >
            <Text margin="0 10px 4px 0" size="14px" bold>
              잠수교 야간 러닝 코스
            </Text>

            <Grid display="flex" alignItems="center" margin="10px 0 8px 0">
              <img style={{ width: "13px", height: "17px" }} src={starIcon} />
              <Text margin="0 10px 0 4px" size="12px" bold>
                4.57
              </Text>
              <Text margin="0" color="#909090" size="12px" regular>
                리뷰 427개
              </Text>
            </Grid>
            <Grid cursor="pointer" display="flex">
              <Tag>서울 관악구</Tag>
              <Tag>10km</Tag>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          margin="0 16px 0 0"
          width="288px"
          display="flex"
          flexDirection="column"
        >
          <Grid position="relative">
            <img
              style={{
                width: "288px",
                height: "213px",
                position: "relative",
                borderRadius: "3px 3px 0 0",
              }}
              src="https://img.hani.co.kr/imgdb/resize/2017/1103/150959670686_20171103.JPG"
            />
            <Text
              margin="0"
              size="40px"
              position="absolute"
              top="1px"
              left="20px"
              color="white"
            >
              3
            </Text>
            <BookmarkWhite src={bookmarkWhite} />
          </Grid>

          <Grid
            width="258px"
            height="auto"
            bg="white"
            borderRadius="6px"
            padding="16px"
            position="absolute"
            top="340px"
            left="624px"
          >
            <Text margin="0 10px 4px 0" size="14px" bold>
              계절마다 좋은 석촌호수
            </Text>

            <Grid display="flex" alignItems="center" margin="10px 0 8px 0">
              <img style={{ width: "13px", height: "17px" }} src={starIcon} />
              <Text margin="0 10px 0 4px" size="12px" bold>
                4.57
              </Text>
              <Text margin="0" color="#909090" size="12px" regular>
                리뷰 427개
              </Text>
            </Grid>
            <Grid cursor="pointer" display="flex">
              <Tag>서울 관악구</Tag>
              <Tag>10km</Tag>
            </Grid>
          </Grid>
        </Grid>

        <Grid width="288px" display="flex" flexDirection="column">
          <Grid position="relative">
            <img
              style={{
                width: "288px",
                height: "213px",
                position: "relative",
                borderRadius: "3px 3px 0 0",
              }}
              src="https://scorefactory.io/files/attach/images/1064321/311/104/001/a62bc82ce0e4ce07deb899e1d0321708.jpg"
            />
            <Text
              margin="0"
              size="40px"
              position="absolute"
              top="1px"
              left="20px"
              color="white"
            >
              4
            </Text>
            <BookmarkWhite src={bookmarkWhite} />
          </Grid>

          <Grid
            width="258px"
            height="auto"
            bg="white"
            borderRadius="6px"
            padding="16px"
            position="absolute"
            top="340px"
            left="928px"
          >
            <Text margin="0 10px 4px 0" size="14px" bold>
              벚꽃과 함께 달리는 러닝 명소
            </Text>

            <Grid display="flex" alignItems="center" margin="10px 0 8px 0">
              <img style={{ width: "13px", height: "17px" }} src={starIcon} />
              <Text margin="0 10px 0 4px" size="12px" bold>
                4.57
              </Text>
              <Text margin="0" color="#909090" size="12px" regular>
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
    </>
  );
};

const BookmarkWhite = styled.img`
  position: absolute;
  width: 19px;
  height: 25px;
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
  margin: 0 4px 0 0;
  padding: 1px 10px;
  border-radius: 2px;
`;

export default BestCourse;
