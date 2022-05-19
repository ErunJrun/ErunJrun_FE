import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvaluationDB, evaluationDB, getRunningDB } from "../../redux/modules/mypage";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { Text, Grid } from "../../elements";
import { AiOutlineClose } from "react-icons/ai";

import "./Evaluation.css";

const Evaluation = (props) => {
  //console.log(props);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [emoji, setEmoji] = useState(true);
  const [evaluationCategory, setEvaluationCategory] = useState();
  const [point, setPoint]= useState(1);

  const mpoint = () => {
    if(emoji === true) {
      setPoint(-1);
    }else if(emoji === false){
      setPoint(1);
    }
  }

  const [likeCategory, setLikeCategory] = useState([
    "코스 맛집이에요",
    "안내사항이 명확해요",
    "응답이 빨라요",
    "사람들을 잘 이끌어줘요",
    "시간 약속을 잘 지켜요",     
  ]);

  const [category, setCategory] = useState([    
    "코스가 별로에요",
    "응답이 느려요",
    "사람들에게 불친절해요",
    "시간 약속을 어겼어요",
    "안내가 불확실해요",
  ]);
  const userId = localStorage.getItem("userId");
  const groupId = props.running.groupId;
  const hostId = props.running.userId;
 
  const group = useSelector((state) => state.mypage.host);

  const toggleModal = () => {
    setModal(!modal);
  };

  const change = () => {
    setEmoji(!emoji);
  }

  const choiceCategory = (idx) => {
    setEvaluationCategory(idx);
  };

  return (
    <div>
      <Button
        style={{ margin: "0 0 3px 0", border: "none" }}
        onClick={() => {
          toggleModal();
          dispatch(getEvaluationDB(groupId, hostId, userId));
        }}
      >
        크루장 평가하기
      </Button>

      {modal && (
        <div>
          <Overlaye>
            <Wrap>
              <Text bold size="18px" marginTop>
                크루장 평가
              </Text>
              <MyImage src={group?.data?.hostUser?.user?.profileUrl} />
              <Text bold size="16px">
                {group?.data?.hostUser?.user?.nickname}
              </Text>

              <Text size="13px" color="#858585" margin=" -8px 0 0 0">
                {group?.data?.hostUser?.date} &nbsp;{" "}
                {group?.data?.hostUser?.standbyTime} 에 &nbsp;{" "}
                {group?.data?.hostUser?.title}를 &nbsp;함께함
              </Text>
              <Hr/>

              <Text bold size="20px" marginTop>
                {group?.data?.hostUser?.user?.nickname}님의 그룹 러닝은 어땠나요?
              </Text>
              {emoji ? (
                <>
                  <Btn>
                    <Icon>
                      <img style={{ margin: "15px 0 0 0" }} src="https://ifh.cc/g/DPpn4L.png"/>
                      <Text bold size="16px">좋았어요!</Text>
                    </Icon>
                  </Btn>

                  <Btn>
                    <img style={{ margin: "15px 0 0 0" }} src="https://ifh.cc/g/a8rsZ8.png" onClick={() =>{change(); mpoint();}}/>
                    <Text bold  size="16px">아쉬웠어요.</Text>
                  </Btn>
                  <Hr/>
                
                  <Text bold size="20px" margin="35px 0 10px 0">
                    {group?.data?.hostUser?.user?.nickname}님의 가장 좋았던 점을 선택해주세요!
                  </Text>

                  <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">                  
                    {likeCategory.map((e, idx) => {
                      return (
                        <Fragment key={idx}>
                          <LabelDistance>
                            <input
                              onClick={() => {
                                choiceCategory(idx+1); 
                                console.log(idx+1)
                              }}
                              type="radio"
                              name="likeCategory"
                              value={e}
                            ></input>
                            <Text bold>{e}</Text>
                          </LabelDistance>
                        </Fragment>
                      );
                    })}
                  </Grid>
                </>
              )
              :
              (
                <>
                  <Btn>
                    <Icon>
                    <img style={{ margin: "15px 0 0 0" }} src="https://ifh.cc/g/cmv5yP.png" onClick={() =>{change(); mpoint();}}/>
                    <Text bold size="16px">좋았어요!</Text>
                    </Icon>
                  </Btn>

                  <Btn>
                    <img style={{ margin: "15px 0 0 0" }} src="https://ifh.cc/g/Nz1wV8.png"/>
                    <Text bold  size="16px">아쉬웠어요.</Text>
                  </Btn>
                  <Hr/>

                  <Text bold size="20px" margin="35px 0 10px 0">
                    {group?.data?.hostUser?.user?.nickname}님의 가장 아쉬웠던 점을 선택해주세요!
                  </Text>

                  <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">                  
                    {category.map((e, idx) => {
                      return (
                        <Fragment key={idx}>
                          <LabelDistance>
                            <input
                              onClick={() => {
                                choiceCategory(idx+6); 
                                console.log(idx+6)
                              }}
                              type="radio"
                              name="category"
                              value={e}
                            ></input>
                            <Text bold>{e}</Text>
                          </LabelDistance>
                        </Fragment>
                      );
                    })}
                  </Grid>
                </>
              )} 
              <EvaluationButton
                onClick={() => {
                  toggleModal();
                  dispatch(evaluationDB(groupId, hostId, point, evaluationCategory));
                  dispatch(getRunningDB(userId));
                  history.push(`/mypage/${userId}`);
                }}>
                평가완료
              </EvaluationButton>

              <button className="_close-modal" onClick={toggleModal}>
                <AiOutlineClose size="20" color="#222"/>
              </button>
            </Wrap>
          </Overlaye>
        </div>
      )}
    </div>
  );
};

const MyImage = styled.img`
  height: 104px;
  width: 104px;
  margin: 17px 40px 0px 40px;
  border-radius: 50%;
`;

const Icon = styled.div`
  margin-top: 10px;
  height: 80px;
  width: 80px; 
`;

const Hr = styled.div`
  width: 457px;
  height: 1px;
  margin: 30px 0 30px 20px;
  background-color: #ddd;
`;

const Btn = styled.button`
  border: none;
  height: 80px;
  width: 200px;
  margin: 0 0 20px 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
`;

const EvaluationButton = styled.button`
  border: none;
  height: 48px;
  width: 168px; 
  font-weight: bold; 
  margin: 24px 0 25px 10px;
  padding-top: 14px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #dedede;  
  font-size: 16px
 
`;


const Button = styled.button`
  max-width: 382px;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  background: #030c37;
  border-radius: 3px;
  height: 38px;
  color: white;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px black;
    font-weight: 900;
  }
`;
const ApplyBtnTrue = styled.button`
  width: 430px;
  background: #030c37;
  border-radius: 3px;
  height: 35px;
  color: white;
  border: none;
  margin: -30px 0 30px 0px;
`;

const Overlaye = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(49, 49, 49, 0.8);
  z-index: 2;
`;

const Wrap = styled.div`
  z-index: 0;
  position: absolute;
  left: 36%;
  top: 100px;
  margin: 0;
  padding: 14px 28px;
  max-width: 664px;
  width: 500px;
 // height: 530px;
  background: #ffffff;
  box-shadow: 3px 8px 17px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: center;
  line-height: 1.4;
`;


const LabelDistance = styled.label`
  margin-left: 28px; 
  input {
    display: none;
  }
  input + p {
    width: 440px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80px;
    cursor: pointer;
    box-sizing: border-box;
    border: solid 1px #b8b8b8;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #030c37;
  }
  `;

export default Evaluation;
