import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import defaultProfile2 from "../../assets/defaultProfile2.png";
import { _addReCommentFX } from "../../redux/modules/recomments";
import { useMediaQuery } from "react-responsive";

const RecommentWrite = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const [recomm, setReComm] = useState("");

  const writeReComm = (e) => {
    setReComm(e.target.value);
    dispatch(_addReCommentFX(props.commentId, recomm));
    props.setReComm(false);
    setReComm("");
  };

  if (isMobile) {
    return (
      <>
        <Grid bg="#F0F0F0" padding="10px 0 0 0" margin="0" display="flex">
          <Text color="#7B7B7B" margin="0 20px 0 8px">
            ┗
          </Text>
          <Grid
            width="285px"
            height="100px"
            border="1px solid #B8B8B8"
            borderRadius="3px 3px 0px 0px"
            bg="#FFFFFF"
          >
            <Grid display="flex" alignItems="center" padding="14px">
              <CommTextareaMob
                type="text"
                placeholder="답글을 남겨주세요!"
                value={recomm}
                onChange={(e) => {
                  setReComm(e.target.value);
                }}
              ></CommTextareaMob>
            </Grid>
          </Grid>
          <CancelMob
            onClick={() => {
              props.setReComm(false);
            }}
          >
            취소
          </CancelMob>
          <CommBtnMob onClick={writeReComm}>등록</CommBtnMob>
        </Grid>
      </>
    );
  }

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

const CommBtnMob = styled.button`
  position: relative;
  bottom: 32px;
  left: 245px;
  width: 56px;
  height: 24px;
  background: #030c37;
  border: none;
  color: white;
  font-weight: 500;
  font-size: 11px;
  cursor: pointer;
  border-radius: 3px;
`;
const CancelMob = styled.p`
  position: relative;
  bottom: 105px;
  left: 300px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  font-family: "Spoqa Han Sans Neo";
  text-decoration-line: underline;
  color: #7b7b7b;
  cursor: pointer;
  :hover {
    color: black;
  }
`;

const CommTextareaMob = styled.textarea`
  margin: 0;
  position: relative;
  width: 75%;
  height: 80px;
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
  font-size: 13px;
  line-height: normal;
  overflow: hidden;
  vertical-align: middle;
  :focus {
    outline: none;
  }

  ::placeholder {
    color: #7b7b7b;
    font-size: 13px;
    font-weight: 400;
    font-family: "Spoqa Han Sans Neo";
  }
`;

export default RecommentWrite;
