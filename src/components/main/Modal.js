import React, { useState } from "react";
import { history } from "../../redux/configureStore";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logoutDB } from "../../redux/modules/user";
import { getProfileDB, getMyRunningDB } from "../../redux/modules/mypage";

import "./Modal.css";
import { Grid, Image, Text } from "../../elements";

const Modal = (props) => {
  const profile = localStorage.getItem("profileUrl");

  const userId = localStorage.getItem("userId");
  console.log(userId);

  const dispatch = useDispatch();
  const [modal, setModal] = useState(props.modalOpen);

  const toggleModal = () => {
    setModal(!modal);
    props.setAlarmOpen(false);
  };

  return (
    <div>
      <Div className="btn-modal" onClick={toggleModal}>
        <Image
          imageType="circle"
          src={profile}
          size="40"
          border="1px solid #F3F3F3"
          margin="0"
          padding="0"
        />
      </Div>

      {modal && (
        <div>
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <Grid display="flex">
              <Text
                margin="0 0 32px 0"
                cursor="pointer"
                _onClick={() => {
                  //history.push("/mypage");
                  history.push(`/mypage/${userId}`);
                  setModal(false);
                }}
                size="18px"
              >
                마이 페이지
              </Text>
              <Text
                margin="0"
                cursor="pointer"
                size="18px"
                _onClick={() => {
                  history.push("/edit");
                  setModal(false);
                }}
              >
                계정 설정
              </Text>
            </Grid>
            <Hr />
            <Grid display="flex">
              <Text
                color="#FF2D55"
                margin="0"
                cursor="pointer"
                size="18px"
                style={{ margin: "0", cursor: "pointer" }}
                _onClick={() => {
                  dispatch(logoutDB());
                  setModal(false);
                }}
              >
                로그아웃
              </Text>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

const Div = styled.div`
  background-color: #030c37;
`;

const Hr = styled.hr`
  width: 150px;
  height: 0px;
  border: 1px solid rgba(149, 149, 149, 0.25);
  margin: 16px 0;
`;

export default Modal;
