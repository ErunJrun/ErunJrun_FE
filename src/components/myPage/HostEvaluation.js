import React, { useState } from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Text, Grid } from "../../elements";
import { useMediaQuery } from "react-responsive";
import { history } from "../../redux/configureStore";
import { useParams } from "react-router-dom";
import { HiOutlineChevronRight } from "react-icons/hi";

const HostEvaluation = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });
  const myId = localStorage.getItem("userId");
  const params = useParams();
  const userId = params.userId;
  
  const profile_list = useSelector((state) => state.mypage.list);

  const [ emoji, setEmoji ] = useState(true);

  const change = () => {
    setEmoji(!emoji);
  }

  if(isMobile) {
    return(
      <Grid 
      width="350px"
      padding="5%"
      margin="0px auto -14px -17px"
      >
        <Text 
        bold 
        size="14px"
        margin="12px 0 0 0"
        >
          받은 굿러너 평가 (총 &nbsp;
          {profile_list?.totalEvaluationCount}
          개)
        </Text>
        <Text 
          bold 
          size="20px" 
          margin="-25px 0 0 100%" 
          profile_list={profile_list}
          _onClick={()=>{
            history.push("/m/evaluation");
          }}
        >
          <HiOutlineChevronRight/>
        </Text>
        <Grid
          display="flex"
          alignItems="center"
          margin="8px 0 0 5px"
        >
          <_Box>
            <_Img src="https://ifh.cc/g/9soljs.png"/>
            <Text 
              bold
              size="11px"
              margin="-4px 0 0 0"
            >
              {profile_list?.evaluation?.evaluationCategory1}
            </Text>
          </_Box>
          <Text
          regular
            size="13px"
            width="208px"
            height="26px"
            bg="#f0f0f0"
            padding="8px 0 0 0"
            textalign="center"
            borderRadius="60px"
          >
            “진행한 코스가 만족스러웠어요!”
          </Text>
        </Grid>
        <Grid 
          display="flex"
          alignItems="center"
          margin="-5px 0 15px 5px"
        >
          <_Box>
            <_Img src="https://ifh.cc/g/9soljs.png"/>
            <Text
              bold 
              size="11px"
              margin="-4px 0 0 0"
            >
              {profile_list?.evaluation?.evaluationCategory4}
            </Text>
          </_Box>
          <Text
            regular
            size="13px"
            width="262px"
            height="26px"
            bg="#f0f0f0"
            padding="8px 0 0 0"
            textalign="center"
            borderRadius="60px"
          >
            “짐을 보관해줘서 편한 러닝이 가능했어요!”
          </Text>
        </Grid>
      </Grid>
    );
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
              {userId === myId ? 
                <>
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
                      “변경사항을 안내해주지 않았어요.”
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
                </>
              :
              <Text 
                size="20px" 
                color="#7b7b7b"
                margin="-80px 0 0 500px"
              >
                “아쉬웠어요.” 는 본인에게만 보여요!
              </Text>
              }
              
          </Box>
          )}          
        </div>
    );
};

const Box = styled.div`
  width: 1198px;
  height: 292px;
  margin: 30px auto 60px auto;
  //padding: 24px 38px 32px 32px;
  border-radius: 6px;
  background-color: #f5f5f5;
  border: 1px solid #f5f5f5;
`;

const _Box = styled.div`
  width: 25px;
  text-align: center;
  margin-right: 10px
`;


const Img = styled.img`
  max-width: 87x;
  max-height: 87px;
`;

const _Img = styled.img`
  max-width: 24px;
  max-height: 24px;
`;

const Icon = styled.div`
  width: 87px;
  height: 194px;
  margin: 18px 0 0 40px;
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
  width: 1120px;
  height: 213px; 
  margin: -212px 0 0 0px;
  line-height: 4.25;
  font-size: 18px;
  font-weight: bold;
  text-align: end;
`;

const _Hr = styled.div`
  width: 102%;
  height: 1px;
  //margin: 0px 0 40px 2.5%;
  background-color: #ddd;
`;

export default HostEvaluation;