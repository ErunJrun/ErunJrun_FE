import React, { useState } from 'react';
import styled from "styled-components";
import { Text } from "../../elements"
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { HiOutlineEmojiSad } from "react-icons/hi";

import "./Evaluation.css";

const Evaluation = () => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    return (
        <div>
            <button
            className="_btn-modal"
            onClick = {toggleModal}>
                크루장 평가하기
            </button>

            {modal && (
                <div>
                    <div onClick={toggleModal} className="_overlay"></div>
                    <div className="_modal-content">
                        <Text bold size="18px" marginTop>크루장 평가</Text>
                        <MyImage src="https://ifh.cc/g/qT8V9W.jpg"/>
                        <Text bold size="14px">
                            김다운
                        </Text>
                        <Text bold size="20px" marginTop>
                            김다운님의 그룹러닝은 어땠나요?
                        </Text>
                        <Text size="13px" color="#858585">
                            2022.04.27 토 10:00 에 벚꽃과 야경 러닝 명소를 함께함
                        </Text>
                        <Btn>
                            <Icon>
                                <HiOutlineEmojiHappy size="30" color="#9613f3"/>
                            </Icon>
                            <Text bold>
                                좋았어요
                            </Text>       
                        </Btn>
                        <Btn>
                            <Icon>
                              <HiOutlineEmojiSad size="30" color="#9613f3"/>  
                            </Icon>
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

export default Evaluation;
