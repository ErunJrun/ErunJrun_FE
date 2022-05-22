import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileDB, getMyRunningDB } from "../redux/modules/mypage";
import Profile from "../components/myPage/Profile";
import HostEvaluation from "../components/myPage/HostEvaluation";
import styled from "styled-components";
import { Text, Grid } from "../elements";
import Tabs from "../components/myPage/Tabs";
import { getCookie } from "../shared/Cookie";
import { useMediaQuery } from "react-responsive";
import { history } from "../redux/configureStore";
import { logoutDB } from "../redux/modules/user";

const Mypage = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;

  const isLogin = useSelector((state) => state.user.isLogin);
  const token = getCookie("accessToken");

  useEffect(() => {
    dispatch(getProfileDB(userId));
  }, []);

  if(isMobile) {
    return (
      <Grid width="100%" margin="0 0 100px 0">
        {isLogin && token ? 
          <>
            <Profile userId={userId} />
            <HostEvaluation/>
            <Grid margin="-15px 0 0 20px" lineHeight="24px">
              <Text
                bold
                size="14px"
              >
                나의 그룹 러닝
              </Text>
              <Text
                regular
                size="13px"
                color="#222"
              >
                참여 예정
              </Text>
              <Text
                regular
                size="13px"
                color="#222"
              >
                참여 완료
              </Text>
              <Text
                regular
                size="13px"
                color="#222"
              >
                My 모집
              </Text>
            </Grid>
    
            <Hr/>
    
            <Grid margin="0 0 0 20px" lineHeight="24px">
              <Text
                bold
                size="14px"
              >
                나의 추천 코스
              </Text>
              <Text
                regular
                size="13px"
                color="#222"
              >
                북마크
              </Text>
              <Text
                regular
                size="13px"
                color="#222"
              >
                My 추천
              </Text>
            </Grid>
              <Hr/>
            
              <Text
                regular
                size="12px"
                margin="5px 0 0 20px"
                color="#222"
                _onClick={() => {
                  dispatch(logoutDB());
                }}
              >
                로그아웃
              </Text>
          </>
        :
          <>      
            <Text 
              bold 
              size="20px" 
              margin="95px 0 0 90%" 
              _onClick={()=>{history.push("/login")}}
              >
              >
            </Text>   
            <Grid margin="-48px 0 0 20px" lineHeight="24px">
              <Text
                bold
                size="14px"
              >
                로그인 및 회원가입
              </Text>
              <Text
                regular
                size="12px"
                color="#7b7b7b"
                margin="-12px 0 30px 3px"
              >
                로그인하고 더 즐겁게 러닝 하세요!
              </Text>
            </Grid>

            <Hr/>

            <Grid margin="-2px 0 0 20px" lineHeight="24px">
              <Text
                bold
                size="14px"
              >
                나의 그룹 러닝
              </Text>
              <Text
                regular
                size="13px"
                color="#222"
              >
                참여 예정
              </Text>
              <Text
                regular
                size="13px"
                color="#222"
              >
                참여 완료
              </Text>
              <Text
                regular
                size="13px"
                color="#222"
              >
                My 모집
              </Text>
            </Grid>
    
            <Hr/>
    
            <Grid margin="0 0 0 20px" lineHeight="24px">
              <Text
                bold
                size="14px"
              >
                나의 추천 코스
              </Text>
              <Text
                regular
                size="13px"
                color="#222"
              >
                북마크
              </Text>
              <Text
                regular
                size="13px"
                color="#222"
              >
                My 추천
              </Text>
            </Grid>
          </>
        }
      

        
      </Grid>
    );
  }

  return (
    <Grid width="1200px" margin="auto">
      <Profile userId={userId} />
      <HostEvaluation/>
      {/* {MyId === userId ? <Schedule userId={userId} /> : null} */}
      <Tabs />
    </Grid>
  );
};

const Hr = styled.div`
  width: 91%;
  height: 1px;
  margin: 20px auto;
  background-color: #ddd;
`;
export default Mypage;
