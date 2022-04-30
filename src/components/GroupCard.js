import React from "react";
import { Text, Grid, Image } from "../elements";
import styled from "styled-components";

const GroupCard = () => {
  return (
    <>
      <Grid
        display="flex"
        justifyContent="left"
        alignItems="center"
        margin="28px auto 38px auto"
        maxWidth="1360px"
        width="100%"
      >
        <Text margin="0 15px 0 0" size="24px" bold>
          유진열 님을 위한 추천 그룹 러닝입니다!
        </Text>
        <Text margin="0 8px 0 0" size="18px" bold>
          #서울특별시
        </Text>
        <Text size="18px" bold>
          #5km 이상 10km 미만
        </Text>
      </Grid>

      <Grid
        margin="38px auto"
        display="flex"
        flexDirection="row"
        maxWidth="1360px"
      >
        <Grid
          margin="0 35px 80px 0"
          width="430px"
          display="flex"
          flexDirection="column"
        >
          <Grid width="430px">
            <Image
              shape="imgBtn"
              height="359px"
              src="http://cdn.iconsumer.or.kr/news/photo/201806/7186_8464_3912.jpg"
            ></Image>
            <ApplyEnd>
              <Text size="14px" bold>
                모집 마감까지
              </Text>
              <Text bold size="14px">
                약 3시간
              </Text>
            </ApplyEnd>
          </Grid>

          <Grid width="430px">
            <Text size="20px" bold margin="4px 0 0 0">
              벛꽃과 야경 러닝 명소 벛꽃과 야경 러닝 명소
            </Text>
            <Text size="16px" margin="4px 0 0 0">
              2022.04.30 (토) 10:00 (소요 시간 : 2h 30min)
            </Text>
            <Text size="16px" margin="4px 0 0 0">
              신청인원 2 / 8
            </Text>
          </Grid>

          <Grid display="flex">
            <Tag>고양시</Tag>
            <Tag>10km</Tag>
          </Grid>
          <Hr></Hr>
          <ApplyBtn>신청하기</ApplyBtn>
        </Grid>

        <Grid
          margin="0 35px 80px 0"
          width="430px"
          display="flex"
          flexDirection="column"
        >
          <Grid width="430px">
            <Image
              shape="imgBtn"
              height="359px"
              src="http://cdn.iconsumer.or.kr/news/photo/201806/7186_8464_3912.jpg"
            ></Image>
            <ApplyEnd>
              <Text size="14px" bold>
                모집 마감까지
              </Text>
              <Text bold size="14px">
                약 3시간
              </Text>
            </ApplyEnd>
          </Grid>

          <Grid width="430px">
            <Text size="20px" bold margin="4px 0 0 0">
              벛꽃과 야경 러닝 명소 벛꽃과 야경 러닝 명소
            </Text>
            <Text size="16px" margin="4px 0 0 0">
              2022.04.30 (토) 10:00 (소요 시간 : 2h 30min)
            </Text>
            <Text size="16px" margin="4px 0 0 0">
              신청인원 2 / 8
            </Text>
          </Grid>

          <Grid display="flex">
            <Tag>고양시</Tag>
            <Tag>10km</Tag>
          </Grid>
          <Hr></Hr>
          <ApplyBtn>신청하기</ApplyBtn>
        </Grid>

        <Grid
          margin="0 35px 80px 0"
          width="430px"
          display="flex"
          flexDirection="column"
        >
          <Grid width="430px">
            <Image
              shape="imgBtn"
              height="359px"
              src="http://cdn.iconsumer.or.kr/news/photo/201806/7186_8464_3912.jpg"
            ></Image>
            <ApplyEnd>
              <Text size="14px" bold>
                모집 마감까지
              </Text>
              <Text bold size="14px">
                약 3시간
              </Text>
            </ApplyEnd>
          </Grid>

          <Grid width="430px">
            <Text size="20px" bold margin="4px 0 0 0">
              벛꽃과 야경 러닝 명소 벛꽃과 야경 러닝 명소
            </Text>
            <Text size="16px" margin="4px 0 0 0">
              2022.04.30 (토) 10:00 (소요 시간 : 2h 30min)
            </Text>
            <Text size="16px" margin="4px 0 0 0">
              신청인원 2 / 8
            </Text>
          </Grid>

          <Grid display="flex">
            <Tag>고양시</Tag>
            <Tag>10km</Tag>
          </Grid>
          <Hr></Hr>
          <ApplyBtn>신청하기</ApplyBtn>
        </Grid>
      </Grid>
    </>
  );
};

const ApplyEnd = styled.div`
  width: 430px;
  height: 25px;
  background-color: #c4c4c4;
  margin: 21.45px auto;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 16px;
  box-sizing: border-box;
`;

const Tag = styled.div`
  font-weight: 14px;
  background-color: #e5e5e5;
  margin: 20px 12px 0 0;
  padding: 3px 14px;
  border-radius: 3px;
`;

const Hr = styled.div`
  border: 1px solid #e5e5e5;
  width: 430px;
  margin: 16px auto;
`;

const ApplyBtn = styled.button`
  width: 430px;
  background: #000000;
  border-radius: 3px;
  height: 35px;
  color: white;
  border: none;
`;

export default GroupCard;
