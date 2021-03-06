import React from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { applyGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";

//css, library, package
import styled from "styled-components";
import swal from "sweetalert";

//Image
import shoesYellow from "../../assets/groupFeed/shoesYellow.png";

//elements
import { Text, Grid, Image } from "../../elements";

const GroupCard = (props) => {
  const dispatch = useDispatch();
  const peopleCnt = props?.maxPeople - props?.applyPeople;
  const isLogin = useSelector((state) => state.user.isLogin);

  const goApply = () => {
    if (isLogin) {
      dispatch(applyGroupDB(props.groupId));
    } else {
      swal({
        text: "로그인 후 이용해 주세요",
        closeOnClickOutside: false,
      }).then(function (result) {
        if (result) {
          history.push("/login");
        }
      });
    }
  };

  return (
    <>
      <Grid width="384px" margin="0 8px 80px 8px">
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
                <Text size="14px" margin="0 5px 0 0">
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
                <ShoesImg src={shoesYellow} />
                <Text size="14px" margin="0 5px 0 0">
                  모집기한
                </Text>
              </Grid>
              <Text bold size="14px">
                약 {props?.applyEndTime} 후 마감
              </Text>
            </ApplyEnd>
          )}

          <Grid margin="0">
            <Text
              display="flex"
              alignItems="center"
              height="23px"
              hiddenText
              cursor="pointer"
              size="18px"
              bold
              margin="0"
            >
              {props?.title}
            </Text>
            <Text
              display="flex"
              alignItems="center"
              height="20px"
              cursor="pointer"
              size="16px"
              margin="10px 0 0 0"
            >
              {props?.date}
            </Text>
          </Grid>

          <Grid margin="16px 0 0 0" cursor="pointer" display="flex">
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
                완료된 그룹 러닝
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

const ApplyEnd = styled.div`
  width: 384px;
  height: 30px;
  margin: 16px 0;
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
  margin: 16px 0;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  box-sizing: border-box;
  background-color: gray;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  height: 24px;
  background-color: #ddd;
  margin: 0 10px 0 0;
  padding: 1px 10px;
  border-radius: 2px;
`;

const Hr = styled.div`
  border: 1px solid #e5e5e5;
  width: 100%;
  margin: 16px auto 10px auto;
`;

const ApplyBtnTrue = styled.button`
  max-width: 382px;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  background: #030c37;
  border: 1px solid #030c37;
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
  font-weight: 700;
  width: 100%;
  background-color: white;
  border-radius: 3px;
  height: 38px;
  cursor: pointer;
  color: #030c37;
  border: 1px solid #030c37;
  :hover {
    box-shadow: 0 0 3px black;
    font-weight: 900;
  }
`;

const ShoesImg = styled.img`
  width: 22px;
  height: auto;
  margin-right: 8px;
`;

export default GroupCard;
