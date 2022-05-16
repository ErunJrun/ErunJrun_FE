import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEvaluationDB, evaluationDB } from "../../redux/modules/mypage";
import styled from "styled-components";
import { history } from '../../redux/configureStore';
import { Text, Grid } from "../../elements"
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
        setModal(!modal)
    };

           
    return (
        <div>
            <Button style={{margin:"0 0 3px 0", border:"none"}}
                onClick={() => {
                    toggleModal()
                    dispatch(getEvaluationDB(groupId, hostId, userId));
                }}>
                크루장 평가하기
            </Button>

            {modal && (
                <div>
                    <Overlaye onClick={toggleModal} >
                    <Wrap>
                        <Text bold size="18px" marginTop>크루장 평가</Text>
                        <MyImage src={group?.data?.hostUser?.user?.profileUrl}/>
                        <Text bold size="14px">
                            {group?.data?.hostUser?.user?.nickname}
                        </Text>
                        <Text bold size="20px" marginTop>
                            {group?.data?.hostUser?.user?.nickname}님의 그룹러닝은 어땠나요?
                        </Text>
                        <Text size="13px" color="#858585">
                        {group?.data?.hostUser?.date}  &nbsp; {group?.data?.hostUser?.standbyTime} 에 &nbsp; {group?.data?.hostUser?.title}를  &nbsp;함께함
                        </Text>

                        
                        <Btn onClick={() => { 
                            
                            toggleModal();
                            dispatch(evaluationDB(groupId, hostId, 1));
                        }}>
                            <img style={{margin:"15px 0 0 0"}} src='https://ifh.cc/g/3Mn8Ja.png'/>
                            <Text bold>
                                좋았어요
                             </Text>       
                        </Btn>

                        <Btn onClick={() => { 
                       
                            toggleModal();
                            dispatch(evaluationDB(groupId, hostId, -1));
                        }}>
                            <img style={{margin:"15px 0 0 0"}} src='https://ifh.cc/g/rqhHfO.png'/>
                            <Text bold>
                                아쉬웠어요
                            </Text>      
                        </Btn>

                        <Text text_decoration size="14px" color="#888888" _onClick = {toggleModal} marginTop>
                            조금 더 생각해볼게요
                        </Text>

                        <button
                        className="_close-modal"
                        onClick = {toggleModal}>
                            <AiOutlineClose/>
                        </button>
                    </Wrap></Overlaye>
                </div>
            )}
            
        </div>
    );
};

const MyImage = styled.img`
  height: 80px;
  width: 80px;
  margin: 10px 40px 10px 40px;
  border-radius: 50%
`;

const Icon = styled.div`
  margin-top: 10px;
`;

const Btn = styled.button`
    border: none;
    height: 80px;
    width: 220px;
    margin-left: 10px;
    
    align-items: center;
    justify-content: center; 
    flex-direction: column;
`
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
`
const ApplyBtnTrue = styled.button`
  width: 430px;
  background:  #030c37;
  border-radius: 3px;
  height: 35px;
  color: white;
  border: none;
  margin: -30px 0 30px 0px
`;

const Overlaye = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background: rgba(49,49,49,0.8);
    z-index: 2;
`;

const Wrap = styled.div`
  z-index: 0;
  position: absolute;
  left:30%;
  top: 210px;
  margin: 0;
  padding: 14px 28px;
  max-width: 664px;
  width: 500px;
  height: 530px;
  background: #ffffff;
  box-shadow: 3px 8px 17px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: center;
  line-height: 1.4;
`;


export default Evaluation;