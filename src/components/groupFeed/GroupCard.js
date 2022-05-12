import React, { Fragment, useEffect } from "react";
import { Text, Grid, Image, IconButton } from "../../elements";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { applyGroupDB, getGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import Permit from "../../shared/Permit";

const GroupCard = (props) => {
  const dispatch = useDispatch();
  const peopleCnt = props?.maxPeople - props?.applyPeople;
  const isLogin = useSelector((state) => state.user.isLogin);

  const goApply = () => {
    if (isLogin) {
      dispatch(applyGroupDB(props.groupId));
    } else {
      window.alert("로그인 후 이용해 주세요");
    }
  };

  return (
    <>
      <Grid maxWidth="384px" width="100%" margin="0 8px 80px 8px">
        <Grid
          _onClick={() => {
            history.push(`/groupdetail/${props.groupId}`);
          }}
          width="100%"
          display="flex"
          flexDirection="column"
          cursor="pointer"
        >
          <Image
            shape="imgBtn"
            width="384px"
            height="288px"
            src={props?.thumbnailUrl}
            borderRadius="3px"
          ></Image>

          {props.applyEndTime === "0 일" ? (
            <ApplyFinish>
              <Grid display="flex" alignItems="center" margin="0" width="auto">
                <Text color="" bold size="14px" margin="0 5px 0 0">
                  모집기한종료
                </Text>
              </Grid>
            </ApplyFinish>
          ) : (
            <ApplyEnd>
              <Grid
                cursor="pointer"
                display="flex"
                alignItems="center"
                margin="0"
                width="auto"
              >
                <IconButton
                  size="20"
                  width="20px"
                  height="20px"
                  calendar
                  margin="0 5px 0 0"
                />
                <Text size="14px" margin="0 5px 0 0">
                  모집기한
                </Text>
              </Grid>
              <Text size="14px">약 {props?.applyEndTime} 후 마감</Text>
            </ApplyEnd>
          )}

          <Grid>
            <Text cursor="pointer" size="18px" bold margin="0">
              {props?.title}
            </Text>
            <Text cursor="pointer" size="16px" margin="10px 0 0 0">
              {props?.date} (소요 시간 : {props?.totalTime})
            </Text>
          </Grid>

          <Grid cursor="pointer" display="flex">
            <Tag>{props?.location}</Tag>
            <Tag>{props?.distance}km</Tag>
            <Tag>{props?.thema}</Tag>
          </Grid>
          <Hr></Hr>

          {props.applyEndTime === "0 일" ? (
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="0 0 10px 0"
            >
              <Text bold size="14px" margin="0">
                완료된 그룹러닝
              </Text>
            </Grid>
          ) : (
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="0 0 10px 0"
            >
              <Text bold size="14px" margin="0">
                남은 자리 {peopleCnt}개!
              </Text>
            </Grid>
          )}
        </Grid>
        {props.applyEndTime === "0 일" ? (
          <ApplyBtnFalse style={{ background: "black" }}>종료</ApplyBtnFalse>
        ) : props.applyState ? (
          <ApplyBtnFalse onClick={goApply}>신청취소</ApplyBtnFalse>
        ) : (
          <ApplyBtnTrue onClick={goApply}>신청하기</ApplyBtnTrue>
        )}
      </Grid>
    </>
  );
};

const ApplyEnd = styled.div`
  width: 384px;
  height: 30px;
  margin: 16px 0 15px 0;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px;
  box-sizing: border-box;
  background-color: #68f99e;
`;

const ApplyFinish = styled.div`
  width: 384px;
  height: 30px;
  margin: 16px 0 15px 0;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  box-sizing: border-box;
  background-color: gray;
`;

const Tag = styled.div`
  font-weight: 500;
  height: 24px;
  background-color: #ddd;
  margin: 20px 12px 0 0;
  padding: 3px 11px;
  border-radius: 2px;
  :hover {
    background-color: #68f99e;
    box-shadow: 0 0 3px gray;
  }
`;

const Hr = styled.div`
  border: 1px solid #e5e5e5;
  width: 100%;
  margin: 16px auto 10px auto;
`;

const ApplyBtnTrue = styled.button`
  max-width: 382px;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  background: #030c37;
  border-radius: 3px;
  height: 38px;
  color: white;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px black;
    font-weight: 900;
  }
`;

const ApplyBtnFalse = styled.button`
  max-width: 382px;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  background: gray;
  border-radius: 3px;
  height: 38px;
  color: white;
  border: none;
  cursor: pointer;
`;

export default GroupCard;