import React from "react";
import { useSelector } from "react-redux";
import { Text, Grid } from "../../elements";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useMediaQuery } from "react-responsive";
import backBtn from "../../assets/groupFeed/backBtn.svg";

const MobileSchedule = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const profile_list = useSelector((state) => state.mypage.list);
  if (profile_list.length === 0) {
    return <></>;
  }

  if (isMobile) {
    return (
      <>
        <Grid
          zIndex="3"
          bg="#ffffff"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="54px"
          display="flex"
          padding="10px 10px"
          margin="0 auto"
        >
          <Grid
            display="flex"
            width="375px"
            justifyContent="left"
            alignItems="center"
          >
            <img
              style={{ width: "10px", margin: "0 10px" }}
              src={backBtn}
              onClick={() => {
                history.go(-1);
              }}
            />
            <Text margin="0 0 0 130px" bold size="16px">
              참여 예정
            </Text>
          </Grid>
        </Grid>
        <Grid
          weight="100%"
          margin="80px auto 50px auto"
          textAlign="-webkit-center"
        >
          {profile_list.waiting.length === 0 ? (
            <Box>예정된 그룹 러닝이 없습니다</Box>
          ) : (
            <Grid display="flex" width="375px" justifyContent="space-between">
              {profile_list.waiting?.map((waiting, index) => (
                <Grid key={index} width="166px" margin="0 8px 40px 8px">
                  <Grid
                    _onClick={() => {
                      history.push(`/groupdetail/${waiting.groupId}`);
                    }}
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    cursor="pointer"
                  >
                    <Img src={waiting.thumbnailUrl} />

                    <Grid>
                      <Title>{waiting.title}</Title>
                      <Text
                        regular
                        cursor="pointer"
                        size="11px"
                        margin="5px 0 0 0"
                        textAlign="left"
                      >
                        {waiting.date}
                      </Text>
                    </Grid>

                    <Grid width="166px" cursor="pointer" display="flex">
                      <Tag>{waiting.location}</Tag>
                      <Tag>{waiting.distance}</Tag>
                    </Grid>
                    <Hr></Hr>
                    <Grid
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      margin="0 0 10px 0"
                    ></Grid>
                  </Grid>

                  <ApplyBtnTrue
                    onClick={() => {
                      history.push(`/groupdetail/${waiting.groupId}`);
                    }}
                  >
                    상세보기
                  </ApplyBtnTrue>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </>
    );
  }
};

const Tag = styled.div`
  height: 15px;
  font-size: 9px;
  font-weight: 400;
  color: #7b7b7b;
  background-color: #ddd;
  border-radius: 2px;
  margin: 8px 9px 0 0;
  padding: 2px 6px;
`;

const Hr = styled.div`
  border: 1px solid #e5e5e5;
  width: 166px;
  margin: 13px 0 -3px 0;
`;

const ApplyBtnTrue = styled.button`
  font-size: 11px;
  font-weight: 500;
  width: 168px;
  background: #030c37;
  border-radius: 3px;
  height: 24px;
  color: white;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px black;
    font-weight: 900;
  }
`;

const Box = styled.div`
  font-size: 16px;
  color: #333;
  height: 100px;
  width: 376px;
  background-color: #fff;
  padding: 250px 11px;
  text-align: center;
  border: none;
`;

const Img = styled.img`
  height: 126px;
  width: 166px;
  border-radius: 3px;
`;

const Title = styled.text`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
  margin: 9px 0 0 0;
  text-align: left;
`;

export default MobileSchedule;
