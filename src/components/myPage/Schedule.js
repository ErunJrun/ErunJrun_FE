import React from "react";
import { useSelector } from "react-redux";
import { Text, Grid, Image } from "../../elements";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

const Schedule = () => {
  const profile_list = useSelector((state) => state.mypage.list);
  console.log(profile_list);
  if (profile_list.length === 0) {
    return <></>;
  }

  return (
    <>
      {profile_list.waiting.length === 0 ? (
        <Box>예정된 그룹 러닝이 없습니다</Box>
      ) : (
        <Grid display="flex">
          {profile_list.waiting?.map((waiting, index) => (
            <Grid
              key={index}
              maxWidth="288px"
              width="100%"
              margin="0 8px 55px 8px"
            >
              <Grid
                _onClick={() => {
                  history.push(`/groupdetail/${waiting.groupId}`);
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
                  src={waiting.thumbnailUrl}
                  borderRadius="3px"
                ></Image>

                <Grid>
                  <Title>
                    {waiting.title}
                  </Title>
                  <Text cursor="pointer" size="13px" margin="10px 0 0 0">
                    {waiting.date} (소요 시간 : {waiting.totalTime})
                  </Text>
                </Grid>

                <Grid cursor="pointer" display="flex" margin="-10px 0 0 0">
                  <Tag>{waiting.location}</Tag>
                  <Tag>{waiting.distance}</Tag>
                  <Tag>{waiting.thema}</Tag>
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
    </>
  );
};

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


export default Schedule;
