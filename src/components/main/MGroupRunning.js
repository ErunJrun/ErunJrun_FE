import React, { useEffect, useState } from "react";
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import GroupCard from "../groupFeed/GroupCard";
import { useDispatch, useSelector } from "react-redux";
import { getPostDB } from "../../redux/modules/post";
import { Text, Grid } from "../../elements";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const MGroupRunning = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);

  useEffect(() => {
    dispatch(getPostDB());
  }, []);

  return (
    <>
      <CardBox>
        <Box>
          <Grid display="flex" alignItems="center">
            <Text bold size="25px">
              그룹러닝
            </Text>
            <Text bold size="15px" marginLeft>
              함께 뛰면 즐거움이 두배!
            </Text>
          </Grid>
          <Btn
            onClick={() => {
              history.push("/groupfeed");
            }}
          >
            더보기
            <HiOutlineArrowNarrowRight />
          </Btn>
        </Box>

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
      </CardBox>

      <CardBox>
        <Box>
          <Grid display="flex" alignItems="center">
            <Text bold size="25px">
              코스추천
            </Text>
            <Text bold size="15px" marginLeft>
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
        </Box>
      </CardBox>
    </>
  );
};

const CardBox = styled.div`
  padding: 0% 16% 0% 16%;
  margin-top: 20px;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3% 5% 0% 5%;
`;

const Btn = styled.button`
  border: none;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 0.9rem;
  color: #000000;
  background-color: transparent;
  font-weight: 1000;
  text-align: center;
  text-decoration: none;
  margin-left: 30px;
  width: 100px;
`;

export default MGroupRunning;
