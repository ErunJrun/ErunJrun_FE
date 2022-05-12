import React, { useEffect, useState } from "react";
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import GroupCard from "../groupFeed/GroupCard";
import { useDispatch, useSelector } from "react-redux";
import { getPostDB } from "../../redux/modules/post";
import { Text, Grid } from "../../elements";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import courseFeedBanner from "../../assets/courseFeedBanner.png";

const MGroupRunning = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);

  useEffect(() => {
    dispatch(getPostDB());
  }, []);

  return (
    <>
      <Grid
        maxWidth="1240px"
        display="flex"
        justifyContent="column"
        margin="100px auto 320px auto"
      >
        <Grid
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          margin="0 0 40px 0"
        >
          <Grid display="flex" alignItems="flex-end" width="auto">
            <Text bold size="26px" margin="0 16px 0 0">
              그룹러닝
            </Text>
            <Text lineHeight="30px" size="16px" margin="0">
              함께 뛰면 즐거움이 두배!
            </Text>
          </Grid>

          <Btn
            onClick={() => {
              history.push("/coursefeed");
            }}
          >
            더보기
            <HiOutlineArrowNarrowRight />
          </Btn>
        </Grid>

        <Grid
          padding="0%"
          margin="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxWidth="1395px"
          width="100%"
        >
          {postList?.map((item, idx) => {
            return <GroupCard key={idx} {...item} />;
          })}
        </Grid>
      </Grid>

      <Grid
        maxWidth="1240px"
        display="flex"
        justifyContent="column"
        margin="80px auto 320px auto"
      >
        <Grid
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          margin="0 0 40px 0"
        >
          <Grid display="flex" alignItems="flex-end" width="auto">
            <Text bold size="26px" margin="0 16px 0 0">
              코스추천
            </Text>
            <Text lineHeight="30px" size="16px" margin="0">
              나만의 코스를 추천해주세요!
            </Text>
          </Grid>

          <Btn
            onClick={() => {
              history.push("/coursefeed");
            }}
          >
            더보기
            <HiOutlineArrowNarrowRight />
          </Btn>
        </Grid>

        <CourseBanner src={courseFeedBanner}></CourseBanner>
      </Grid>
    </>
  );
};

const Btn = styled.button`
  border: none;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  color: #000000;
  background-color: transparent;
  font-weight: 1000;
  text-align: center;
  text-decoration: none;
  margin-left: 30px;
  width: 100px;
  cursor: pointer;
`;

const CourseBanner = styled.img`
  max-width: 1240px;
  width: 100%;
`;

export default MGroupRunning;
