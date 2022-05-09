import React, { Fragment, useEffect, useState } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";
import { Link } from "react-scroll";

const InfoCategory = () => {
  const [checkedInfo, setCheckedInfo] = useState("");
  const [courseInfo, setCourseInfo] = useState(true);
  const [introduceInfo, setIntroduceInfo] = useState(false);
  const [apllyInfo, setApllyInfo] = useState(false);
  const [commentInfo, setCommentInfo] = useState(false);

  console.log(checkedInfo);

  const goInfo = (e) => {
    setCheckedInfo(e);
  };

  const [infoCategory, setInfoCategory] = useState([
    "코스정보",
    "소개",
    "크루원",
    "Q&A",
  ]);
  return (
    <>
      <Grid display="flex" maxWidth="758px" margin="65px auto 0 auto">
        <Link to="코스정보" spy={true} smooth={true}>
          <Grid
            margin="0 20px 0 0"
            display="flex"
            maxWidth="98px"
            justifyContent="center"
          >
            <Text cursor="pointer" size="18px" bold margin="0">
              코스정보
            </Text>
            <Hr></Hr>
          </Grid>
        </Link>

        <Link to="소개" spy={true} smooth={true}>
          <Grid
            margin="0 20px 0 0"
            display="flex"
            maxWidth="98px"
            justifyContent="center"
          >
            <Text cursor="pointer" size="18px" bold margin="0">
              소개
            </Text>
            <Hr></Hr>
          </Grid>
        </Link>

        <Link to="크루원" spy={true} smooth={true}>
          <Grid
            margin="0 20px 0 0"
            display="flex"
            maxWidth="98px"
            justifyContent="center"
          >
            <Text cursor="pointer" size="18px" bold margin="0">
              크루원
            </Text>
            <Hr></Hr>
          </Grid>
        </Link>

        <Link to="Q&A" spy={true} smooth={true}>
          <Grid display="flex" maxWidth="98px" justifyContent="center">
            <Text cursor="pointer" size="18px" bold margin="0">
              Q&A
            </Text>
            <Hr></Hr>
          </Grid>
        </Link>
        <Hr2></Hr2>
      </Grid>
    </>
  );
};

const Hr = styled.hr`
  border: 2px solid #68f99e;
  width: 98px;
  height: 0px;
  margin-top: 8px;
  margin-bottom: 0;
`;

const Hr2 = styled.hr`
  border: 1px solid #cbcbcb;
  width: 100%;
  height: 0px;
  margin: 0 0 48px 0;
`;

export default InfoCategory;
