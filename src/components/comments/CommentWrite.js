import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Grid } from "../../elements";
import { _addCommentFX } from "../../redux/modules/comments";
import defaultProfile from "../../assets/defaultProfile.png";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comm, setComm] = useState("");

  const writeComm = (e) => {
    if (comm === "") {
      window.alert("내용을 입력해주세요");
    }
    setComm(e.target.value);
    console.log(comm);
    dispatch(_addCommentFX("group", props.groupId, comm));
    setComm("");
  };

  return (
    <>
      <Grid>
        <Grid
          height="60px"
          bg="#efefef"
          border="1px solid #D3D3D3"
          borderRadius="3px 3px 0px 0px"
        >
          <Grid display="flex" alignItems="center">
            <CommImg src={defaultProfile} />
            <CommTextarea
              type="text"
              placeholder="궁금하신 점을 댓글로 남겨보세요!"
              value={comm}
              onChange={(e) => {
                setComm(e.target.value);
              }}
            ></CommTextarea>
          </Grid>
        </Grid>

        <CommBtn onClick={writeComm}>등록하기</CommBtn>
      </Grid>
    </>
  );
};

const CommImg = styled.img`
  width: 36px;
  height: 36px;
  margin: 0 14px 0 24px;
`;

const CommTextarea = styled.textarea`
  margin: 0;
  position: relative;
  width: 75%;
  height: 20px;
  background: #efefef;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  box-sizing: border-box;
  line-height: normal;
  overflow: hidden;
  vertical-align: middle;
  :focus {
    outline: none;
  }

  ::placeholder {
    color: #818181;
    font-size: 16px;
    font-weight: 400;
    background-color: #efefef;
  }
`;

const CommBtn = styled.button`
  position: relative;
  bottom: 45px;
  left: 650px;
  max-width: 92px;
  width: 100%;
  height: 32px;
  background: #030c37;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
`;

export default CommentWrite;
