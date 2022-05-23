/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid } from "../../elements";
import { useMediaQuery } from "react-responsive";
import { getProfileDB } from "../../redux/modules/mypage"

const MobileEvaluation = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
//   const params = useParams();
//   const userId = params.userId;
   //console.log(props);

//   useEffect(() => {
//     dispatch(getProfileDB(userId));
//   }, []);

  const profile_list = useSelector((state) => state.mypage.list);
  console.log(profile_list);

  if(isMobile) {

    return (
        <Grid weight="100%" margin="80px auto 100px auto">
          <Box>
            <_Box>
                <Img src="https://ifh.cc/g/9soljs.png"/>
                <Text bold size="14px" margin="0 0 0px 10px">
                    좋았어요!
                </Text>
            </_Box>
            <EvaluationBox>
                <Text>
                “진행한 코스가 만족스러웠어요!”
                </Text>
                <Text>
                {profile_list?.evaluation?.evaluationCategory1}
                </Text>
            </EvaluationBox>
            <EvaluationBox>
                <Text>
                “사람들을 잘 이끌어줬어요!“
                </Text>
                <Text>
                {profile_list?.evaluation?.evaluationCategory2}
                </Text>
            </EvaluationBox>
            <EvaluationBox>
                <Text>
                “궁금한 점에 대해 빠르게 답해줬어요!”
                </Text>
                <Text>
                {profile_list?.evaluation?.evaluationCategory3}
                </Text>
            </EvaluationBox>
            <EvaluationBox>
                <Text>
                “짐을 보관해줘서 편한 러닝이 가능했어요!”
                </Text>
                <Text>
                {profile_list?.evaluation?.evaluationCategory4}
                </Text>
            </EvaluationBox>
            <EvaluationBox>
                <Text>
                “시간 약속을 잘 지켰어요!”
                </Text>
                <Text>
                {profile_list?.evaluation?.evaluationCategory5}
                </Text>
            </EvaluationBox>
            <_Box>
                <Img src="https://ifh.cc/g/byFtmr.png"/>
                <Text bold size="14px" margin="0 0 0px 10px">
                아쉬웠어요.
                </Text>
            </_Box>
            <EvaluationBox>
                <Text>
                “진행한 코스가 아쉬웠어요.”
                </Text>
                <Text>
                {profile_list?.evaluation?.evaluationCategory6}
                </Text>
            </EvaluationBox>
            <EvaluationBox>
                <Text>
                “크루원에게 불친절했어요.“
                </Text>
                <Text>
                {profile_list?.evaluation?.evaluationCategory7}
                </Text>
            </EvaluationBox>
            <EvaluationBox>
                <Text>
                “응답이 늦었어요.”
                </Text>  
                <Text>
                {profile_list?.evaluation?.evaluationCategory8}
                </Text>
            </EvaluationBox>
            <EvaluationBox>
                <Text>
                “변경사항을 안내해주지 않았어요.”
                </Text>  
                <Text>
                {profile_list?.evaluation?.evaluationCategory9}
                </Text>
            </EvaluationBox>
            <EvaluationBox>
                <Text>
                “시간 약속을 잘 안지켰어요.”
                </Text>  
                <Text>
                {profile_list?.evaluation?.evaluationCategory10}
                </Text>
            </EvaluationBox>
          </Box>
        </Grid>
    );
};
};

const Box = styled.div`
  width: 375px;
  margin: 30px auto 60px auto;
`;

const _Box = styled.div`
 display: flex;
 align-items: center;
 weight: 305px
 height: 36px;
 margin: 45px auto 20px auto;
 padding: 0px 5%;
`;

const Img = styled.img`
  max-width: 36x;
  max-height: 36px;
`;

const EvaluationBox = styled.div`
  width: 305px;
  height: 43px; 
  font-weight: normal;
  border: solid 1px #ddd;
  border-radius: 60px;
  background-color: #fff;
  font-size: 14px;
  padding: 0px 20px 0 20px;
  margin-bottom: 16px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin: 10px auto;
`;

export default MobileEvaluation;