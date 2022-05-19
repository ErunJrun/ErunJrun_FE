import React from "react";
import styled from "styled-components";
import levelBlack from "../../assets/loginInfo/levelBlack.png";
import levelBlue from "../../assets/loginInfo/levelBlue.png";
import levelOrange from "../../assets/loginInfo/levelOrange.png";
import levelPurple from "../../assets/loginInfo/levelPurple.png";
import levelRed from "../../assets/loginInfo/levelRed.png";
import { useMediaQuery } from "react-responsive";

const LevelBox = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  console.log(props);
  if (isMobile) {
    if (props?.userLevel === "블랙") return <LevelImgMob src={levelBlack} />;

    if (props?.userLevel === "퍼플") return <LevelImgMob src={levelPurple} />;

    if (props?.userLevel === "레드") return <LevelImgMob src={levelRed} />;

    if (props?.userLevel === "오렌지") return <LevelImgMob src={levelOrange} />;

    if (props?.userLevel === "처음이예요")
      return <LevelImgMob src={levelOrange} />;

    if (props?.userLevel === "처음이에요")
      return <LevelImgMob src={levelOrange} />;

    if (props?.userLevel === "블루") return <LevelImgMob src={levelBlue} />;
  }

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

const LevelImgMob = styled.img`
  width: 64px;
  height: auto;
`;

export default LevelBox;
