import React, { useState } from "react";

//Redux
import { useDispatch } from "react-redux";
import { _addCommentFX } from "../../redux/modules/comments";

//css, library, package
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import swal from "sweetalert";

//Image
import defaultProfile from "../../assets/defaultProfile.png";

//elements
import { Grid } from "../../elements";

const CommentWrite = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });
  const dispatch = useDispatch();

  const [comm, setComm] = useState("");

  const writeComm = (e) => {
    if (comm.trim() === "" || comm === null) {
      setComm("");
      return swal("내용을 입력해주세요");
    }

    if (props.course) {
      dispatch(_addCommentFX("course", props.courseId, comm));
      setComm("");
      return;
    }
    dispatch(_addCommentFX("group", props.groupId, comm));
    setComm("");
  };

  const checkMaxLength = (e) => {
    let wordLength = e.target.value.length;

    if (wordLength >= 40) {
      swal("40자 이상 작성할 수 없습니다.");
      return;
    }
  };

  if (props.course && !isMobile) {
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
                placeholder="코스에 대한 리뷰를 남겨주세요!"
                value={comm}
                onChange={(e) => {
                  setComm(e.target.value);
                  checkMaxLength(e);
                }}
              ></CommTextarea>
            </Grid>
          </Grid>

          <CommBtn onClick={writeComm}>등록하기</CommBtn>
        </Grid>
      </>
    );
  }

  if (props.course && isMobile) {
    return (
      <>
        <Grid width="343px" height="96px" margin="0 0 32px 0">
          <Grid
            height="96px"
            bg="white"
            border="1px solid #C4C4C4"
            borderRadius="3px"
          >
            <Grid display="flex" alignItems="center" padding="14px">
              <CommTextareaMob
                type="text"
                placeholder="코스에 대한 리뷰를 남겨주세요!"
                value={comm}
                onChange={(e) => {
                  setComm(e.target.value);
                  checkMaxLength(e);
                }}
              ></CommTextareaMob>
            </Grid>
          </Grid>

          <CommBtnMob onClick={writeComm}>등록</CommBtnMob>
        </Grid>
      </>
    );
  }

  if (!props.course && isMobile) {
    return (
      <>
        <Grid width="343px" height="96px" margin="0 0 32px 0">
          <Grid
            height="96px"
            bg="white"
            border="1px solid #C4C4C4"
            borderRadius="3px"
          >
            <Grid display="flex" alignItems="center" padding="14px">
              <CommTextareaMob
                type="text"
                placeholder="궁금하신 점을 댓글로 남겨보세요! (40자)"
                value={comm}
                onChange={(e) => {
                  setComm(e.target.value);
                  checkMaxLength(e);
                }}
              ></CommTextareaMob>
            </Grid>
          </Grid>

          <CommBtnMob onClick={writeComm}>등록</CommBtnMob>
        </Grid>
      </>
    );
  }

  if (!props.course && !isMobile) {
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
                placeholder="궁금하신 점을 댓글로 남겨보세요! (40자이내)"
                value={comm}
                onChange={(e) => {
                  setComm(e.target.value);
                  checkMaxLength(e);
                }}
              ></CommTextarea>
            </Grid>
          </Grid>

          <CommBtn onClick={writeComm}>등록하기</CommBtn>
        </Grid>
      </>
    );
  }
};

const CommImg = styled.img`
  width: 36px;
  height: 36px;
  margin: 0 14px 0 24px;
`;

const CommTextarea = styled.input`
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

const CommTextareaMob = styled.textarea`
  margin: 0;
  position: relative;
  width: 75%;
  height: 70px;
  background: white;
  outline: none;
  resize: none;
  font-size: 13px;
  box-sizing: border-box;
  overflow: scroll;
  border: none;
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

const CommBtnMob = styled.button`
  position: relative;
  bottom: 35px;
  left: 280px;
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

export default CommentWrite;
