import React, { Fragment } from "react";
import { Text, Grid, Image } from "../../elements";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import Evaluation from "./Evaluation";

const MGroupCard = (props) => {
  const dispatch = useDispatch();

  return (
    <>
     <button onClick={() => {history.push("/check");}}>출석 체크하기</button>
      <Evaluation />
    </>
  );
};

const Hr = styled.div`
  border: 1px solid #e5e5e5;
  width: 430px;
  margin: 16px auto;
`;

export default MGroupCard;
