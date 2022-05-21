import React, { useEffect } from "react";
import { getRunningDB, getEvaluationDB } from "../../redux/modules/mypage";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid, Image, IconButton } from "../../elements";
import Evaluation from "../../pages/Evaluation";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useParams } from "react-router-dom";

const Group = () => {
  const dispatch = useDispatch();
  const myId = localStorage.getItem("userId");
  const params = useParams();
  const userId = params.userId;

  const running = useSelector((state) => state.mypage.group);
  console.log(running);

  useEffect(() => {
    dispatch(getRunningDB(userId));
  }, []);

  if (running.length === 0) {
    return <></>;
  }

  return (
    <>
      {running.data.length === 0 ? (
        <Box>참여완료한 그룹러닝이 없습니다</Box>
      ) : (
        <Grid display="flex">
          {running?.data?.map((data, index) => {
            return userId !== data.userId ? (
              <Grid
                key={index}
                maxWidth="288px"
                width="100%"
                margin="0 8px 55px 8px"
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
                  <Image
                    shape="imgBtn"
                    width="288px"
                    height="216px"
                    src={data.thumbnailUrl}
                    borderRadius="3px"
                  ></Image>

                  <Grid>
                    <Title cursor="pointer" size="16px" bold margin="14px 0 0 0">
                      {data.title}
                    </Title>
                    <Text cursor="pointer" size="13px" margin="2px 0 0 0">
                      {data.date} (소요 시간 : {data.totalTime})
                    </Text>
                  </Grid>

                  <Grid cursor="pointer" display="flex" margin="-10px 0 0 0">
                    <Tag>{data.location}</Tag>
                    <Tag>{data.distance}km</Tag>
                    <Tag>{data.thema}</Tag>
                  </Grid><Hr></Hr>
                </Grid>
                  {myId === userId ? 
                    <>
                      <Grid
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        margin="0 0 10px 0"
                      >
                      </Grid>
                      {data.evaluation ? (
                        <ApplyBtnFalse>평가완료</ApplyBtnFalse>
                      ) 
                      :
                      (
                        <ApplyBtnTrue  
                        onClick={() => { 
                          dispatch(getEvaluationDB(data.groupId, data.userId, userId));
                          history.push("/evaluation");                   
                        }}   
                      >
                        크루장 평가하기 
                      </ApplyBtnTrue> 
                      )}
                    </>
                  : 
                    null
                  }
              </Grid>
            ) : null;
          })}
        </Grid>
      )}
    </>
  );
};

const ApplyEnd = styled.div`
  width: 384px;
  height: 30px;
  background-color: #c4c4c4;
  margin: 16px 0 15px 0;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px;
  box-sizing: border-box;
  background-color: #68f99e;
`;

const Tag = styled.div`
  font-size: 12px;
  font-weight: 500;
  height: 21px;
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
  font-weight: bold;
  width: 100%;
  background: #f0f0f0;
  border-radius: 3px;
  height: 38px;
  color: #7b7b7b;
  border: none;
`;

const Box = styled.div`
  font-weight: 900;
  font-size: 26px;
  color: #333;
  height: 100px;
  width: 1220px;
  background-color: #fff;
  padding: 250px 11px;
  text-align: center;
  border: none;
`;

const Title = styled.text`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis; 
white-space: nowrap; 
display:block;
font-weight: bold;
font-size: 16px;
cursor:pointer;
margin:14px 0 0 0;
`;


export default Group;
