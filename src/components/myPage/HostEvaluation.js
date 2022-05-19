import React from 'react';
import styled from "styled-components";
import { Text, Grid } from "../../elements";

const HostEvaluation = () => {
    return (
        <div>
          <Box>
            <Icon>
              <img style={{marginTop:"30px"}} src="https://ifh.cc/g/DPpn4L.png"/>
              <img style={{marginTop:"24px"}} src="https://ifh.cc/g/Nz1wV8.png"/>
            </Icon>
            <RightBox>
              <EvaluationBox>
                “진행한 코스가 만족스러웠어요!”
              </EvaluationBox>
              <EvaluationBox>
                “진행한 코스가 만족스러웠어요!”
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
          </Box>
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

export default HostEvaluation;