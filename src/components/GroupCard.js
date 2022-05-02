import React, { Fragment } from "react";
import { Text, Grid, Image } from "../elements";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGroupDB } from "../redux/modules/feed";
import { history } from "../redux/configureStore";

const GroupCard = () => {
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feed.list);
  console.log(feedList);

  React.useEffect(() => {
    dispatch(getGroupDB("all"));
  }, []);

  return (
    <>
      <Grid
        display="flex"
        justifyContent="left"
        alignItems="center"
        margin="28px auto 38px auto"
        maxWidth="1360px"
        width="100%"
      >
        <Text margin="0 15px 0 0" size="24px" bold>
          ㅇㅇㅇ 님을 위한 추천 그룹 러닝입니다!
        </Text>
        <Text margin="0 8px 0 0" size="18px" bold>
          #서울특별시
        </Text>
        <Text size="18px" bold>
          #5km 이상 10km 미만
        </Text>
      </Grid>
      <Grid
        margin="38px auto"
        display="flex"
        flexWrap="wrap"
        // justifyContent="center"
        alignItems="center"
        maxWidth="1395px"
        width="100%"
      >
        {feedList.map((feedList, idx) => {
          return (
            <Fragment key={idx}>
              <Grid
                _onClick={() => {
                  history.push(`/groupdetail/${feedList.groupId}`);
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
                  src={feedList?.thumbnailUrl}
                  borderRadius="6px"
                ></Image>
                <ApplyEnd>
                  <Text size="14px" bold>
                    모집 마감까지
                  </Text>
                  <Text bold size="14px">
                    약 {feedList?.applyEndTime}
                  </Text>
                </ApplyEnd>

                <Grid width="430px">
                  <Text size="20px" bold margin="4px 0 0 0">
                    {feedList?.title}
                  </Text>
                  <Text size="16px" margin="4px 0 0 0">
                    {feedList?.date} {feedList?.standbyTime} (소요 시간 : 2h
                    30min)
                  </Text>
                  <Text size="16px" margin="4px 0 0 0">
                    신청인원 {feedList?.applyPeople} / {feedList?.maxPeople}
                  </Text>
                </Grid>

                <Grid display="flex">
                  <Tag>{feedList?.location}</Tag>
                  <Tag>{feedList?.distance}km</Tag>
                </Grid>
                <Hr></Hr>
                {feedList.applyState ? (
                  <ApplyBtnFalse>신청완료</ApplyBtnFalse>
                ) : (
                  <ApplyBtnTrue>신청하기</ApplyBtnTrue>
                )}
              </Grid>
            </Fragment>
          );
        })}
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
  background: #000000;
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

export default GroupCard;
