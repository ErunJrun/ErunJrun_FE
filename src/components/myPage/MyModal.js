import React, { useState } from 'react';
import { Text, Grid } from "../../elements"
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import "./MyModal.css";

const MyModal = () => {
    const isMobile = useMediaQuery({
        query: "(max-width:820px)",
      });

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    if(isMobile) {
        return (
            <Grid width="100%">
                <Grid 
                width="16px" 
                height="16px"
                 _onClick = {toggleModal}
                 margin="-19px 0 0 100px"
                 >
                    <Img src='https://ifh.cc/g/8Sdtjg.png'/> 
                </Grid>
                {modal && (
                <div>
                    <div onClick={toggleModal} className="overlay_"></div>
                    <ModalContent>
                        <Text bold size="12px" color="#fff"> 
                            굿러너 레벨이란?
                        </Text>

                        <Text size="12px" color="#cccccc">
                            굿러너 레벨은 이RUN저RUN에서 유저의 신뢰도를
                            예측할 수 있는 지표입니다.
                        </Text>
                            
                        <Text bold size="12px" color="#fff">
                            어떻게 레벨을 올릴 수 있나요?
                        </Text>
                            
                        <Text size="12px" color="#cccccc">
                            • 신청한 그룹 러닝에 참석했을때, 
                             <span style={{color: "#68f99e"}}> 1km</span> <br/>
                            • 그룹 러닝의 크루장이 되고 크루원들로부터
                              좋은 평가를 받았을때, 
                              <span style={{color: "#68f99e"}}> 최대 5km</span>
                        </Text>

                        <Text bold size="12px" color="#fff">
                            어떻게 레벨이 감점 되나요?
                        </Text>

                        <Text size="12px" color="#cccccc">
                            • 신청한 그룹 러닝에 불참했을때, 
                            <span style={{color: "#68f99e"}}> 1km</span> <br/>
                            • 그룹 러닝의 크루장이 되고 크루원들로부터
                              좋지 않은 평가를 받았을때,
                             <span style={{color: "#68f99e"}}> 최대 5km</span>
                        </Text>
                        
                        <button
                        className="close-modal_"
                        onClick = {toggleModal}>
                            <AiOutlineClose color="#fff"/>
                        </button>
                    </ModalContent>
                    </div>
                
            )}
            </Grid>
        );
    }

    return (
        <div>
            <button
            className="btn-modal_"
            onClick = {toggleModal}>
                <img src='https://ifh.cc/g/8Sdtjg.png'/> 
            </button>

            {modal && (
                <div>
                    <div onClick={toggleModal} className="overlay_"></div>
                    <div className="modal-content_">
                        <Text bold size="14px" color="#fff"> 
                            굿러너 레벨이란?
                        </Text>

                        <Text size="14px" color="#cccccc">
                            굿러너 레벨은 이RUN저RUN에서 유저의 신뢰도를<br/>
                            예측할 수 있는 지표입니다.
                        </Text>
                            
                        <Text bold size="14px" color="#fff">
                            어떻게 레벨을 올릴 수 있나요?
                        </Text>
                            
                        <Text size="14px" color="#cccccc">
                            • 신청한 그룹 러닝에 참석했을때, 
                             <span style={{color: "#68f99e"}}> 1km</span> <br/>
                            • 그룹 러닝의 크루장이 되고 크루원들로부터 <br/>
                            &nbsp;&nbsp;좋은 평가를 받았을때, 
                              <span style={{color: "#68f99e"}}> 최대 5km</span>
                        </Text>

                        <Text bold size="14px" color="#fff">
                            어떻게 레벨이 감점 되나요?
                        </Text>

                        <Text size="14px" color="#cccccc">
                            • 신청한 그룹 러닝에 불참했을때, 
                            <span style={{color: "#68f99e"}}> 1km</span> <br/>
                            • 그룹 러닝의 크루장이 되고 크루원들로부터 <br/>
                            &nbsp;&nbsp;좋지 않은 평가를 받았을때,
                             <span style={{color: "#68f99e"}}> 최대 5km</span>
                        </Text>
                        
                        <button
                        className="close-modal_"
                        onClick = {toggleModal}>
                            <AiOutlineClose color="#fff"/>
                        </button>
                    </div>
                </div>
            )}
            
        </div>
    );
};


const Img = styled.img`
  max-width: 14x;
  max-height: 14px;
`;

const ModalContent = styled.div`
    position: absolute;
    top: 25%;
    left: 20%;
    //transform: translate(-110%, 55%);
    line-height: 1.4;
    background:#313131;
    padding: 14px 20px;
    border-radius: 10px;
    width: 200px;
    height: 300px;
    z-index: 2;
    justify-content: center;
`;
export default MyModal;
