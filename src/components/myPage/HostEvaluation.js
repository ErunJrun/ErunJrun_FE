/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Text, Grid } from "../../elements";

const HostEvaluation = () => {
  const profile_list = useSelector((state) => state.mypage.list);

  const [ emoji, setEmoji ] = useState(true);

  const change = () => {
    setEmoji(!emoji);
  }

    return (
        <div>
          {emoji ? (
            <Box>
              <Icon>
                <Img style={{marginTop:"30px"}} src="https://ifh.cc/g/9soljs.png"/>
                <Img style={{marginTop:"24px"}} src="https://ifh.cc/g/NbRrk0.png" onClick={change}/>
              </Icon>
              <RightBox>
                <EvaluationBox>
                  “진행한 코스가 만족스러웠어요!”
                </EvaluationBox>
                <EvaluationBox>
                  “사람들을 잘 이끌어줬어요!“
                </EvaluationBox>
                <EvaluationBox>
                  “궁금한 점에 대해 빠르게 답해줬어요!”
                </EvaluationBox>
              </RightBox>
              <LeftBox>
                <EvaluationBox>
                  “짐을 보관해줘서 편한 러닝이 가능했어요!”
                </EvaluationBox>
                <EvaluationBox>
                  “시간 약속을 잘 지켰어요!”
                </EvaluationBox>
              </LeftBox>
              <EvaluationPoint>
                {profile_list?.evaluation?.evaluationCategory1}<br/>
                {profile_list?.evaluation?.evaluationCategory2}<br/>
                {profile_list?.evaluation?.evaluationCategory3}
              </EvaluationPoint>
              <EvaluationPointL>
                {profile_list?.evaluation?.evaluationCategory4}<br/>
                {profile_list?.evaluation?.evaluationCategory5}
              </EvaluationPointL>
            </Box>
          ):(
            <Box>
              <Icon>
                <Img style={{marginTop:"30px"}} src="https://ifh.cc/g/Za01L3.png" onClick={change}/>
                <Img style={{marginTop:"24px"}} src="https://ifh.cc/g/byFtmr.png"/>
              </Icon> 
              <RightBox>
                <EvaluationBox>
                  “진행한 코스가 아쉬웠어요.”
                </EvaluationBox>
                <EvaluationBox>
                  “크루원에게 불친절했어요.“
                </EvaluationBox>
                <EvaluationBox>
                  “응답이 늦었어요.”
                </EvaluationBox>
              </RightBox>
              <LeftBox>
                <EvaluationBox>
                  “응답이 늦었어요.”
                </EvaluationBox>
                <EvaluationBox>
                  “시간 약속을 잘 안지켰어요.”
                </EvaluationBox>
              </LeftBox>
              <EvaluationPoint>
                {profile_list?.evaluation?.evaluationCategory6}<br/>
                {profile_list?.evaluation?.evaluationCategory7}<br/>
                {profile_list?.evaluation?.evaluationCategory8}
              </EvaluationPoint>
              <EvaluationPointL>
                {profile_list?.evaluation?.evaluationCategory9}<br/>
                {profile_list?.evaluation?.evaluationCategory10}
              </EvaluationPointL>
          </Box>
          )}          
        </div>
    );
};

const Box = styled.div`
  width: 1200px;
  height: 246px;
  margin: 30px auto 60px auto;
  padding: 24px 38px 32px 32px;
  border-radius: 6px;
  background-color: #f5f5f5;
`;

const Img = styled.img`
  max-width: 87x;
  max-height: 87px;
`;

const Icon = styled.div`
  width: 87px;
  height: 194px;
  margin: 0px 0 0 32px;
`;

const EvaluationBox = styled.div`
  width: 417px;
  height: 40px; 
  font-weight: normal;
  border-radius: 84px;
  background-color: #fff;
  font-size: 16px;
  text-align: left;
  padding: 20px 30px 0 30px;
  margin-bottom: 16px;
`;

const RightBox = styled.div`
  width: 477px;
  height: 213px; 
  margin: -172px 0 0 170px;
`;

const LeftBox = styled.div`
  width: 477px;
  height: 136px; 
  margin: -212px 0 0 690px;
`;

const EvaluationPoint = styled.div`
  width: 477px;
  height: 213px; 
  margin: -145px 0 0 590px;
  line-height: 4.25;
  font-size: 18px;
  font-weight: bold;
`;

const EvaluationPointL = styled.div`
  width: 477px;
  height: 213px; 
  margin: -212px 0 0 1112px;
  line-height: 4.25;
  font-size: 18px;
  font-weight: bold;
`;

export default HostEvaluation;