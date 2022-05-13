import React from "react";
import styled from "styled-components";
import levelBlack from "../../assets/loginInfo/levelBlack.png";
import levelBlue from "../../assets/loginInfo/levelBlue.png";
import levelOrange from "../../assets/loginInfo/levelOrange.png";
import levelPurple from "../../assets/loginInfo/levelPurple.png";
import levelRed from "../../assets/loginInfo/levelRed.png";

const LevelBox = (props) => {
  console.log(props);
  if (props?.userLevel === "블랙") return <LevelImg src={levelBlack} />;

  if (props?.userLevel === "퍼플") return <LevelImg src={levelPurple} />;

  if (props?.userLevel === "레드") return <LevelImg src={levelRed} />;

  if (props?.userLevel === "오렌지") return <LevelImg src={levelOrange} />;

  if (props?.userLevel === "처음이예요") return <LevelImg src={levelOrange} />;

  if (props?.userLevel === "처음이에요") return <LevelImg src={levelOrange} />;

  if (props?.userLevel === "블루") return <LevelImg src={levelBlue} />;

  if (!props?.userLevel) return <></>;
  if (!props === undefined) return <></>;
};

const LevelImg = styled.img`
  width: 95px;
  height: auto;
`;

export default LevelBox;
