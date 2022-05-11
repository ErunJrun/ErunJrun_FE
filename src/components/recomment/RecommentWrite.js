import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Grid } from "../../elements";
import defaultProfile2 from "../../assets/defaultProfile2.png";
import { _addReCommentFX } from "../../redux/modules/recomments";

const RecommentWrite = (props) => {
  const dispatch = useDispatch();
  const [recomm, setReComm] = useState("");

  console.log(props);

  const writeReComm = (e) => {
    setReComm(e.target.value);
    console.log(recomm);
    dispatch(_addReCommentFX(props.commentId, recomm));
    props.setReComm(false);
    setReComm("");
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
            <CommImg src={defaultProfile2} />
            <CommTextarea
              type="text"
              placeholder="답글을 남겨보세요!"
              value={recomm}
              onChange={(e) => {
                setReComm(e.target.value);
              }}
            ></CommTextarea>
          </Grid>
        </Grid>

        <CommBtn onClick={writeReComm}>등록하기</CommBtn>
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
  box-sizing: border-box;
  font-size: 16px;
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
  left: 600px;
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

export default RecommentWrite;
