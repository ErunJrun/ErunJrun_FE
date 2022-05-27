import React, { useEffect } from "react";
import { getRunningDB, getEvaluationDB } from "../../redux/modules/mypage";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid, Image, IconButton } from "../../elements";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import backBtn from "../../assets/groupFeed/backBtn.svg";

const MobileGroup = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;
  const myId = localStorage.getItem("userId");

  const running = useSelector((state) => state.mypage.group);

  useEffect(() => {
    dispatch(getRunningDB(userId));
  }, []);

  if (running.length === 0) {
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
              style={{ width: "10px", margin: "0 15px" }}
              src={backBtn}
              onClick={() => {
                history.go(-1);
              }}
            />
            <Text 
              margin="0 0 0 130px" 
              bold 
              size="16px"
            >
              참여 완료
            </Text>
          </Grid>
        </Grid>
        <Grid
          weight="375px"
          margin="80px auto 50px auto"
          textAlign="-webkit-center"
        >
          {running.data.length === 0 ? (
            <Box>참여완료한 그룹러닝이 없습니다</Box>
          ) : (
            <Grid 
              display="flex" 
              width="343px" 
              justifyContent="space-between"
            >
              {running.data.map((data, index) => {
                return userId !== data.userId ? (
                  <Grid 
                    key={index} 
                    width="166px" 
                    margin="0 0px 32px 0px"
                  >
                    <Grid
                      _onClick={() => {
                        history.push(`/groupdetail/${data.groupId}`);
                      }}
                      width="100%"
                      display="flex"
                      flexDirection="column"
                      cursor="pointer"
                    >
                      <Img src={data.thumbnailUrl} />

                      <Grid>
                        <Title>
                          {data.title}
                        </Title>
                        <Text
                          cursor="pointer"
                          size="11px"
                          margin="5px 0 0 0"
                          textAlign="left"
                        >
                          {data.date}
                        </Text>
                      </Grid>

                      <Grid 
                        width="166px" 
                        cursor="pointer" 
                        display="flex"
                      >
                        <Tagg>
                          {data.location}
                        </Tagg>
                        <Tag>
                          {data.distance}km
                        </Tag>
                      </Grid>
                      <Hr></Hr>
                    </Grid>
                    {myId === userId ? (
                      <>
                        <Grid
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          margin="0 0 10px 0"
                        ></Grid>
                        {data.evaluation ? (
                          <ApplyBtnFalse>
                            평가완료
                          </ApplyBtnFalse>
                        ) : (
                          <ApplyBtnTrue
                            onClick={() => {
                              dispatch(
                                getEvaluationDB(
                                  data.groupId,
                                  data.userId,
                                  userId
                                )
                              );
                              history.push(`/evaluation/${data.groupId}`);
                            }}
                          >
                            크루장 평가하기
                          </ApplyBtnTrue>
                        )}
                      </>
                    ) : (
                      <Grid margin="10px 0 0 0">
                        <ApplyBtnTrue
                          onClick={() => {
                            history.push(`/groupdetail/${data.groupId}`);
                          }}
                        >
                          상세보기
                        </ApplyBtnTrue>
                      </Grid>
                    )}
                  </Grid>
                ) : null;
              })}
            </Grid>
          )}
        </Grid>
      </>
    );
  }
};

const Tag = styled.div`
  height: 15px;
  font-size: 8px;
  font-weight: 400;
  color: #7b7b7b;
  background-color: #ddd;
  border-radius: 2px;
  margin: 8px 9px 0 0;
  padding: 2px 6px;
`;

const Tagg = styled.div`
  height: 15px;
  width: 57px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 8px;
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

const ApplyBtnTrue = styled.div`
  font-size: 11px;
  font-weight: 400;
  width: 168px;
  background: #030c37;
  border-radius: 3px;
  height: 19px;
  color: white;
  border: none;
  cursor: pointer;
  padding-top:5px;
  :hover {
    box-shadow: 0 0 3px black;
    font-weight: 900;
  }
`;

const ApplyBtnFalse = styled.div`
  font-size: 11px;
  font-weight: 400;
  width: 168px;
  background: #f0f0f0;
  border-radius: 3px;
  height: 19 px;
  padding-top:5px;
  color: #7b7b7b;
  border: none;
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
  width: 168px;
  border-radius: 3px;
  object-fit: cover;
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

export default MobileGroup;
