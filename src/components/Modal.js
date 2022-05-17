import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import ModalPortal from "../shared/modal/ModalPortal";
import ProfileModal from "../shared/modal/ProfileModal";

const Modal = () => {
  const profile = localStorage.getItem("profileUrl");
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Wrap onClick={toggleModal}>
        <ProfileImage src={profile} />
      </Wrap>

      <ModalPortal>
        {modal ? <ProfileModal onClose={toggleModal} /> : null}
      </ModalPortal>
    </>
  );
};

const Wrap = styled.div`
  background-color: #030c37;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  padding: 0;
  margin: 0;
  display: block;
  font-size: 18px;
  border: none;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  border: 1px solid #f3f3f3;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0;
  box-sizing: border-box;
`;

export default Modal;
