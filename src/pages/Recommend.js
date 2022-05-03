import React from "react";
import Profile from "../components/myPage/Profile";
import Schedule from "../components/myPage/Schedule";
import styled from "styled-components";
import Badge from "../components/myPage/Badge";
import { history } from "../redux/configureStore";

const Recommend = () => {
  return (
    <Box1>
      <Box2>
        <Profile/>
        <Schedule/>
      </Box2>  
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
          내가만든 추천코스
          <button>더보기</button>
        </Box>
        <Badge/>
    </Box1>
  );
};

const Box2 = styled.div`
  display: flex;
`;

const Box1 = styled.div`
  justify-content: center;
  align-item: center;
  margin: auto;
`;

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

export default Recommend;
