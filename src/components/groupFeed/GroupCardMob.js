import React, { Fragment, useEffect } from "react";
import { Text, Grid, Image, IconButton } from "../../elements";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { applyGroupDB, getGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import Permit from "../../shared/Permit";
import swal from "sweetalert";

const GroupCardMob = (props) => {
  const dispatch = useDispatch();
  const peopleCnt = props?.maxPeople - props?.applyPeople;
  const isLogin = useSelector((state) => state.user.isLogin);

  const goApply = () => {
    if (isLogin) {
      dispatch(applyGroupDB(props.groupId));
    } else {
      swal("로그인 후 이용해 주세요");
      history.push("/login");
    }
  };

  return (
    <>
      <Grid width="168px" margin="0 0 32px 0">
        <Grid
          _onClick={() => {
            history.push(`/groupdetail/${props.groupId}`);
          }}
          width="100%"
          display="flex"
          flexDirection="column"
          cursor="pointer"
        >
          <MobImage src={props?.thumbnailUrl}></MobImage>

          {props.applyEndTime === "0 일" ? (
            <ApplyFinish>
              <Grid
                cursor="pointer"
                display="flex"
                alignItems="center"
                margin="0"
                width="auto"
              >
                <Text size="9px" margin="0">
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
                <Text size="9px" margin="0">
                  모집기한
                </Text>
              </Grid>
              <Text bold size="9px">
                약 {props?.applyEndTime} 후 마감
              </Text>
            </ApplyEnd>
          )}

          <Grid>
            <Text hiddenText cursor="pointer" size="11px" bold margin="0">
              {props?.title}
            </Text>
            <Text cursor="pointer" size="11px" margin="4px 0 0 0">
              {props?.date}
            </Text>
          </Grid>

          <Grid cursor="pointer" display="flex">
            <Tag>{props?.location}</Tag>
            <Tag>{props?.distance}km</Tag>
            <Tag>{props?.thema}</Tag>
          </Grid>
          <Hr />

          {props.applyEndTime === "0 일" ? (
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="0 0 4px 0"
            >
              <Text bold size="9px" margin="0">
                완료된 그룹 러닝
              </Text>
            </Grid>
          ) : (
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="0"
            >
              <Text color="#ff2d55" bold size="9px" margin="0 0 4px 0">
                남은 자리 {peopleCnt}개!
              </Text>
            </Grid>
          )}
        </Grid>
        {props.applyEndTime === "0 일" ? (
          <ApplyBtnFalse
            style={{ background: "black", color: "white" }}
            onClick={() => {
              swal("기한이 종료되었습니다.");
            }}
          >
            종료
          </ApplyBtnFalse>
        ) : props.applyState ? (
          <ApplyBtnFalse onClick={goApply}>취소하기</ApplyBtnFalse>
        ) : (
          <ApplyBtnTrue onClick={goApply}>신청하기</ApplyBtnTrue>
        )}
      </Grid>
    </>
  );
};

const MobImage = styled.img`
  width: 168px;
  height: 126px;
  border-radius: 1.3px;
`;

const ApplyEnd = styled.div`
  width: 168px;
  height: 19px;
  margin: 8px 0;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 4px;
  box-sizing: border-box;
  background-color: #68f99e;
`;

const ApplyFinish = styled.div`
  width: 168px;
  height: 19px;
  margin: 8px 0;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 4px;
  box-sizing: border-box;
  background-color: gray;
`;

const Tag = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 9px;
  height: 15px;
  background-color: #ddd;
  margin: 8px 6px 0 0;
  padding: 2px 6px;
  border-radius: 1px;
  :hover {
    background-color: #68f99e;
    box-shadow: 0 0 3px gray;
  }
`;

const Hr = styled.hr`
  border: 1px solid #e5e5e5;
  width: 168px;
  height: 0px;
  margin: 7.1px 0 4px 0;
`;

const ApplyBtnTrue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: 24px;
  font-size: 11px;
  font-weight: 500;
  background: #030c37;
  border: 1px solid #030c37;
  box-sizing: border-box;
  border-radius: 3px;
  color: white;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px black;
    font-weight: 900;
  }
`;

const ApplyBtnFalse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: 24px;
  font-size: 11px;
  font-weight: 500;
  background-color: white;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
  color: #030c37;
  border: 1px solid #030c37;
  :hover {
    box-shadow: 0 0 3px black;
    font-weight: 900;
  }
`;

export default GroupCardMob;
