import React from "react";
import styled from "styled-components";
import levelBlack from "../../assets/loginInfo/levelBlack.svg";
import levelBlue from "../../assets/loginInfo/levelBlue.svg";
import levelOrange from "../../assets/loginInfo/levelOrange.svg";
import levelPurple from "../../assets/loginInfo/levelPurple.svg";
import levelRed from "../../assets/loginInfo/levelRed.svg";

import { useMediaQuery } from "react-responsive";

const LevelBox = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  if (props.loginInfo) {
    if (props?.userLevel === "블랙") return <LoginInfoMob src={levelBlack} />;

    if (props?.userLevel === "퍼플") return <LoginInfoMob src={levelPurple} />;

    if (props?.userLevel === "레드") return <LoginInfoMob src={levelRed} />;

    if (props?.userLevel === "오렌지")
      return <LoginInfoMob src={levelOrange} />;

    if (props?.userLevel === "처음이예요")
      return <LoginInfoMob src={levelOrange} />;

    if (props?.userLevel === "처음이에요")
      return <LoginInfoMob src={levelOrange} />;

    if (props?.userLevel === "블루") return <LoginInfoMob src={levelBlue} />;
  }

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
  margin: 0 6px;
`;

const LevelImgMob = styled.img`
  width: 64px;
  height: auto;
  margin: 0 6px;
`;

const LoginInfoMob = styled.img`
  width: 78px;
  height: auto;
  margin: 0 6px;
`;

export default LevelBox;
