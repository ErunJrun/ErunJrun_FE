import React, { useEffect, useState } from "react";
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import GroupCard from "../groupFeed/GroupCard";
import { useDispatch } from "react-redux";
import { getGroupDB } from "../../redux/modules/feed";

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
    dispatch(getGroupDB(category));
  }, []);

  return (
    <div>
      <Box>
        <h2>그룹 러닝</h2>

        <Btn
          onClick={() => {
            history.push("/groupfeed");
          }}
        >
          더보기
        </Btn>
        <GroupCard></GroupCard>
      </Box>

      <Box>
        <h2>코스추천</h2>
        <Btn
          onClick={() => {
            history.push("/coursefeed");
          }}
        >
          더보기
        </Btn>
      </Box>
    </div>
  );
};

const Box = styled.div`
  padding: 5%;
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
`;

export default MGroupRunning;
