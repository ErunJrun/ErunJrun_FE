import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEvaluationDB } from "../../redux/modules/mypage"
import styled from "styled-components";
import { Text, Grid } from "../../elements"
import { AiOutlineClose } from "react-icons/ai";

import "./Evaluation.css";

const Evaluation = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

     const userId = localStorage.getItem("userId");
     const groupId = props.running.groupId;
     const hostId = props.running.userId;

     const group = useSelector((state) => state.mypage.host);

     useEffect(() => {
        dispatch(getEvaluationDB(groupId, hostId, userId));
      }, []);

    console.log(group);
    // if (group.length === 0) { return <></>; }

    const toggleModal = () => {
        setModal(!modal)
    };

    return (
        <div>
            <Grid style={{margin:"0 0 3px 0", border:"none"}}
                onClick = {toggleModal}>
                크루장 평가하기
            </Grid>

            {modal && (
                <div>
                    <div onClick={toggleModal} className="_overlay"></div>
                    <div className="_modal-content">
                        <Text bold size="18px" marginTop>크루장 평가</Text>
                        <MyImage src={group?.user?.profileUrl}/>
                        <Text bold size="14px">
                            {group?.user?.nickname}
                        </Text>
                        <Text bold size="20px" marginTop>
                            {group?.user?.nickname}님의 그룹러닝은 어땠나요?
                        </Text>
                        <Text size="13px" color="#858585">
                        {group?.user?.date} 토 {group?.user?.standbyTime} 에 {group?.user?.title}를 함께함
                        </Text>
                        <Btn>
                            <img style={{margin:"15px 0 0 0"}} src='https://ifh.cc/g/3Mn8Ja.png'/>
                            <Text bold>
                                좋았어요
                            </Text>       
                        </Btn>
                        <Btn>
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
                    </div>
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
const ApplyBtnTrue = styled.button`
  width: 430px;
  background:  #030c37;
  border-radius: 3px;
  height: 35px;
  color: white;
  border: none;
  margin: -30px 0 30px 0px
`;

export default Evaluation;
