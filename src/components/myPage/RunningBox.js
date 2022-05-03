import React from 'react';
import { history } from '../../redux/configureStore';
import Attend from '../../pages/Attend';
import Make from '../../pages/Make';
import Recommend from '../../pages/Recommend';
import Bookmark from '../../pages/Bookmark';
import styled from "styled-components";

const RunningBox = () => {
    return (
        <Box>
            <Category>
                <CategoryBox>
                  <Btn onClick={() => {history.push("/mypage");}}> 참여한 그룹 러닝</Btn>
                </CategoryBox>
                <CategoryBox>
                  <Btn  onClick={() => {history.push("/mypage/recommend");}}>내가 만든 추천 코스</Btn>
                </CategoryBox>  
                <CategoryBox>
                  <Btn  onClick={() => {history.push("/mypage/make");}}>내가 만든 그룹 러닝</Btn>
                </CategoryBox>  
                <CategoryBox>
                  <Btn onClick={() => {history.push("/mypage/bookmark");}}>북마크 추천 코스</Btn>
                </CategoryBox>
            </Category>
            <Attend/>
            <Recommend/>
            <Make/>
            <Bookmark/>
        </Box>
    );
};

const Box = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  width: 82%;
  height: 400px;
  margin-top: 30px;
`;

const Category = styled.div`
  display: felx;
  justify-content: flex-start;
  padding: 2.5%;
  margin-right: 10px;
`;

const CategoryBox = styled.div`
  margin-right: 20px;
`;

const Btn = styled.button`
  width: 150px;
  height: 40px;
  border: transparent;
  background-color: transparent;
  :hover{
     width: 150px;
     height: 40px;
     border-radius: 5px;
     background-color: black;
     color: white;
  }
`;
export default RunningBox;