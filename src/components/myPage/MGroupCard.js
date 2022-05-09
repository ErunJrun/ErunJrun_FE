import React, { Fragment } from "react";
import { Text, Grid, Image } from "../../elements";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import Evaluation from "./Evaluation";

const MGroupCard = (props) => {
  const dispatch = useDispatch();

  // 서버연결하면 전체수정!

  return (
    <>
    <Grid
        _onClick={() => {
          history.push(`/groupdetail/${props.groupId}`);
        }}
        margin="66px 17.5px"
        maxWidth="430px"
        width="100%"
        display="flex"
        flexDirection="column"
      >
        <Image
          shape="imgBtn"
          height="359px"
          src="https://www.outdoornews.co.kr/news/photo/202012/32235_91262_1629.jpg"
          borderRadius="6px"
        ></Image>
        <ApplyEnd>
          <Text size="14px" bold>
            모집 마감까지
          </Text>
          <Text bold size="14px">
            약 {props?.applyEndTime}
          </Text>
        </ApplyEnd>

        <Grid width="430px">
          <Text size="20px" bold margin="4px 0 0 0">
            {props?.title}
          </Text>
          <Text size="16px" margin="4px 0 0 0">
            {props?.date} (소요 시간 : {props?.totalTime})
          </Text>
          <Text size="16px" margin="4px 0 0 0">
            신청인원 {props?.applyPeople} / {props?.maxPeople}
          </Text>
        </Grid>

        <Grid display="flex">
          <Tag>{props?.location}</Tag>
          <Tag>{props?.distance}km</Tag>
        </Grid>
        <Hr></Hr>
       
      </Grid>
      <ApplyBtnTrue onClick={() => {history.push("/check");}}>출석 체크하기</ApplyBtnTrue>

      <Grid margin="-728px 0 0 460px">
        <Grid 
        _onClick={() => {
          history.push(`/groupdetail/${props.groupId}`);
        }}
        margin="66px 17.5px"
        maxWidth="430px"
        width="100%"
        display="flex"
        flexDirection="column"
      >
        <Image
          shape="imgBtn"
          height="359px"
          src="https://www.outdoornews.co.kr/news/photo/202012/32235_91262_1629.jpg"
          borderRadius="6px"
        ></Image>
        <ApplyEnd>
          <Text size="14px" bold>
            모집 마감까지
          </Text>
          <Text bold size="14px">
            약 {props?.applyEndTime}
          </Text>
        </ApplyEnd>

        <Grid width="430px">
          <Text size="20px" bold margin="4px 0 0 0">
            {props?.title}
          </Text>
          <Text size="16px" margin="4px 0 0 0">
            {props?.date} (소요 시간 : {props?.totalTime})
          </Text>
          <Text size="16px" margin="4px 0 0 0">
            신청인원 {props?.applyPeople} / {props?.maxPeople}
          </Text>
        </Grid>

        <Grid display="flex">
          <Tag>{props?.location}</Tag>
          <Tag>{props?.distance}km</Tag>
        </Grid>
        <Hr></Hr>
       
      </Grid>
      <Evaluation styled={{margin:"-50px 0 0 0"}}/>
      </Grid>
    </>
  );
};

const ApplyEnd = styled.div`
  width: 430px;
  height: 25px;
  background-color: #c4c4c4;
  margin: 21.45px auto;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 16px;
  box-sizing: border-box;
`;

const Tag = styled.div`
  font-weight: 14px;
  background-color: #e5e5e5;
  margin: 20px 12px 0 0;
  padding: 3px 14px;
  border-radius: 3px;
`;

const Hr = styled.div`
  border: 1px solid #e5e5e5;
  width: 430px;
  margin: 16px auto;
`;

const ApplyBtnTrue = styled.button`
  width: 430px;
  background:  #030c37;
  border-radius: 3px;
  height: 35px;
  color: white;
  border: none;
  cursor: pointer;
`;

const ApplyBtnFalse = styled.button`
  width: 430px;
  background: gray;
  border-radius: 3px;
  height: 35px;
  color: white;
  border: none;
`;
export default MGroupCard;
