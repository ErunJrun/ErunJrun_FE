import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import ModalPortal from "../shared/modal/ModalPortal";
import ProfileModal from "../shared/modal/ProfileModal";
import { getProfileDB } from "../redux/modules/mypage";

const Modal = () => {
  const dispatch = useDispatch();
  const profile = localStorage.getItem("profileUrl");
  const userId = localStorage.getItem("userId");
  const profile_list = useSelector((state) => state.mypage.list);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getProfileDB(userId));
    }
  }, []);

  return (
    <>
      <Wrap onClick={toggleModal}>
        <ProfileImage src={profile_list?.userInfo?.profileUrl} />
        <ModalPortal>
          {modal ? <ProfileModal onClose={toggleModal} /> : null}
        </ModalPortal>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background-color: #030c37;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
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
