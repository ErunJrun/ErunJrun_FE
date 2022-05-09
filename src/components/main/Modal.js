import React, { useState } from "react";
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logoutDB } from "../../redux/modules/user";

import "./Modal.css";

const Modal = () => {
  const profile = localStorage.getItem("profileUrl");

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  
  return (
    <div>
      <Div className="btn-modal" onClick={toggleModal}>
        <MyImage src={profile}/>
      </Div>

      {modal && (
        <div>
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p
              style = { {cursor:"pointer"} }
              onClick={() => {
                history.push("/mypage")
              }}
            >
              마이 페이지
            </p>
            <p style = { {cursor:"pointer"} }
              onClick={() => {}}>계정 설정</p>
            <hr />
            <p
              style = { {cursor:"pointer"} }
              onClick={() => {
                dispatch(logoutDB());
              }}
            >
              로그아웃
            </p>
            <button className="close-modal" onClick={toggleModal}>
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Div = styled.div`
   background-color: #030c37;
`;

const MyImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%
  
`;

export default Modal;
