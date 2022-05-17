import React, { useEffect } from "react";
import { getRunningDB } from "../../redux/modules/mypage";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid, Image, IconButton } from "../../elements";
import Evaluation from "./Evaluation";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

const Group = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

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
    {running.data.length === 0 ? 
      <Box>
        참여한 그룹러닝이 없습니다
      </Box>
      : 
      <Grid display="flex">
      {running?.data?.map((data, index) => 
        userId !== data.userId &&
      (
        <Grid key={index} maxWidth="384px" width="100%" margin="0 8px 80px 8px">
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
              width="384px"
              height="288px"
              src={data.thumbnailUrl}
              borderRadius="3px"
            ></Image>

            <Grid>
              <Text cursor="pointer" size="18px" bold margin="0">
                {data.title}
              </Text>
              <Text cursor="pointer" size="16px" margin="10px 0 0 0">
                {data.date} (소요 시간 : {data.totalTime})
              </Text>
            </Grid>

            <Grid cursor="pointer" display="flex">
              <Tag>{data.location}</Tag>
              <Tag>{data.distance}km</Tag>
              <Tag>{data.thema}</Tag>
            </Grid>
            <Hr></Hr>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="0 0 10px 0"
            ></Grid>
          </Grid>

          {data.evaluation ? 
            (<ApplyBtnFalse>평가완료</ApplyBtnFalse>)
           : 
            (
              <div>
                <Evaluation running={data} />
              </div>
            )
          }
          
        </Grid>
      ))}
    </Grid>
    }
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
  border:none;
`;

export default Group;
