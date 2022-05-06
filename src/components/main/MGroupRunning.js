import React, { useEffect, useState } from "react";
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import GroupCard from "../groupFeed/GroupCard";
import { useDispatch } from "react-redux";
import { getPostDB } from "../../redux/modules/post";
import { Text, Grid } from "../../elements"
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const MGroupRunning = () => {
  const dispatch = useDispatch();
  const [finish, setFinish] = useState("0");
  const [startDate, setStartDate] = useState("2018-01-01");
  const [endDate, setEndDate] = useState("2030-01-01");
  const [region, setRegion] = useState("");
  const [filterTime, setFilterTime] = useState([]);
  const [filterDistance, setFilterDistance] = useState([]);
  const [filterTheme, setFilterTheme] = useState([]);

  const category = [
    region,
    filterTime,
    filterDistance,
    startDate,
    endDate,
    filterTheme,
    finish,
  ];

  useEffect(() => {
    dispatch(getPostDB(category));
  }, []);

  return (
    <> 
      <CardBox>
          <Box>
            <Grid display="flex" alignItems="center">
              <Text bold size="25px">
                그룹러닝
              </Text>
              <Text  bold size="15px" marginLeft>
                함께 뛰면 즐거움이 두배!
              </Text>
              </Grid>
            <Btn
              onClick={() => {
                history.push("/groupfeed");
              }}
            >
              더보기
              <HiOutlineArrowNarrowRight/>
            </Btn>   
          </Box>

          <GroupCard/>
        </CardBox>

        <CardBox>
          <Box>
          <Grid display="flex" alignItems="center">
              <Text bold size="25px">
                코스추천
              </Text>
              <Text  bold size="15px" marginLeft>
                나만의 코스를 추천해주세요!
              </Text>
            </Grid>
            <Btn
              onClick={() => {
                history.push("/coursefeed");
              }}
            >
              더보기
              <HiOutlineArrowNarrowRight/>
            </Btn>
          </Box>
        </CardBox>
    </>
  );
};

const CardBox = styled.div`
  padding: 0% 13% 0% 13%;
  margin-top: 20px
`;

const Box = styled.div`
  
  display: flex;
  justify-content: space-between;
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
  width: 100px
`;

export default MGroupRunning;