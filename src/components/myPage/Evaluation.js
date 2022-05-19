import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvaluationDB, evaluationDB } from "../../redux/modules/mypage";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { Text, Grid } from "../../elements";
import { AiOutlineClose } from "react-icons/ai";

import "./Evaluation.css";

const Evaluation = (props) => {
  //console.log(props);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const userId = localStorage.getItem("userId");
  const groupId = props.running.groupId;
  const hostId = props.running.userId;
  //console.log(groupId,hostId);

  const group = useSelector((state) => state.mypage.host);

  //console.log(group);

  const toggleModal = () => {
    setModal(!modal);
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
                {group?.data?.hostUser?.user?.nickname}님의 그룹 러닝은
                어땠나요?
              </Text>

              <Btn
                onClick={() => {
                  toggleModal();
                  dispatch(evaluationDB(groupId, hostId, 1));
                }}
              >
                <Icon>
                <img
                  style={{ margin: "15px 0 0 0" }}
                  src="https://ifh.cc/g/DPpn4L.png"
                />
                <Text bold size="16px">좋았어요!</Text>
                </Icon>
              </Btn>

              <Btn
                onClick={() => {
                  toggleModal();
                  dispatch(evaluationDB(groupId, hostId, -1));
                }}
              >
                <img
                  style={{ margin: "15px 0 0 0" }}
                  src="https://ifh.cc/g/Nz1wV8.png"
                />
                <Text bold  size="16px">아쉬웠어요.</Text>
              </Btn>
              <Hr/>
              
              <Text bold size="20px" margin="30px 0 24px 0">
                {group?.data?.hostUser?.user?.nickname}님의 좋았던 점을 선택해주세요!
              </Text>

              <EvaluationBox>
                코스 맛집이에요
              </EvaluationBox>
              <EvaluationBox>
                안내사항이 명확해요
              </EvaluationBox>
              <EvaluationBox>
                응답이 빨라요
              </EvaluationBox>
              <EvaluationBox>
                사람들을 잘 이끌어줘요
              </EvaluationBox>
              <EvaluationBox>
                시간 약속을 잘 지켜요
              </EvaluationBox>

              {/* <Text bold size="20px" margin="30px 0 5px 0">
                {group?.data?.hostUser?.user?.nickname}님의 아쉬웠던 점을 선택해주세요!
              </Text>
              <EvaluationBox>
                코스가 별로에요
              </EvaluationBox>
              <EvaluationBox>
                응답이 느려요
              </EvaluationBox>
              <EvaluationBox>
                사람들에게 불친절해요
              </EvaluationBox>
              <EvaluationBox>
                시간 약속을 어겼어요
              </EvaluationBox>
              <EvaluationBox>
                안내가 불확실해요
              </EvaluationBox> */}
              <EvaluationButton>
                평가완료
              </EvaluationButton>

              <button className="_close-modal" onClick={toggleModal}>
                <AiOutlineClose />
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

const EvaluationBox = styled.div`
  width: 440px;
  height: 30px;
  font-weight: 500; 
  padding-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  border: solid 1px #b8b8b8;
  text-align: center;
  margin: 0px 0 16px 28px;
  font-size: 16px
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

export default Evaluation;
