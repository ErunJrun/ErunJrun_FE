import React from "react";
import styled from "styled-components";
import shoesBlack from "../assets/loginInfo/shoesBlack.png";
import levelBlue from "../assets/loginInfo/shoesBlue.png";
import shoesOrange from "../assets/loginInfo/shoesOrange.png";
import shoesPurple from "../assets/loginInfo/shoesPurple.png";
import shoesRed from "../assets/loginInfo/shoesRed.png";

const LevelShoes = (props) => {
  if (props.isMobile) {
    if (props?.userLevel === "블랙") return <LevelImgMob src={shoesBlack} />;

    if (props?.userLevel === "퍼플") return <LevelImgMob src={shoesPurple} />;

    if (props?.userLevel === "레드") return <LevelImgMob src={shoesRed} />;

    if (props?.userLevel === "오렌지") return <LevelImgMob src={shoesOrange} />;

    if (props?.userLevel === "처음이예요")
      return <LevelImgMob src={shoesOrange} />;

    if (props?.userLevel === "처음이에요")
      return <LevelImgMob src={shoesOrange} />;

    if (props?.userLevel === "블루") return <LevelImgMob src={levelBlue} />;
  }

  if (props?.userLevel === "블랙") return <LevelImg src={shoesBlack} />;

  if (props?.userLevel === "퍼플") return <LevelImg src={shoesPurple} />;

  if (props?.userLevel === "레드") return <LevelImg src={shoesRed} />;

  if (props?.userLevel === "오렌지") return <LevelImg src={shoesOrange} />;

  if (props?.userLevel === "처음이예요") return <LevelImg src={shoesOrange} />;

  if (props?.userLevel === "처음이에요") return <LevelImg src={shoesOrange} />;

  if (props?.userLevel === "블루") return <LevelImg src={levelBlue} />;

  if (!props?.userLevel) return <></>;
};

const LevelImg = styled.img`
  width: 28.29px;
  height: auto;
`;

const LevelImgMob = styled.img`
  width: 14.43px;
  height: auto;
`;

export default LevelShoes;
