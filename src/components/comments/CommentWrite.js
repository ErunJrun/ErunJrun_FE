import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { _addCommentFX } from "../../redux/modules/comments";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comm, setComm] = useState("");

  const writeComm = (e) => {
    setComm(e.target.value);
    console.log(comm);
    dispatch(_addCommentFX("group", props.groupId, comm));
    setComm("");
  };

  return (
    <>
      <CommInput
        type="text"
        placeholder="문의 하기.."
        value={comm}
        onChange={(e) => {
          setComm(e.target.value);
        }}
      ></CommInput>
      <CommBtn onClick={writeComm}>확인</CommBtn>
    </>
  );
};

const CommInput = styled.input`
  width: 920px;
  height: 48px;
  background: #e5e5e5;
  border: none;
  ::placeholder {
    color: #aeaeae;
  }
`;

const CommBtn = styled.button`
  width: 96px;
  height: 32px;
  background: #646464;
  border: none;
  color: white;
  font-weight: 700;
  cursor: pointer;
`;

export default CommentWrite;
