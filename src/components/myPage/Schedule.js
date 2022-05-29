import React from "react";
import { useSelector } from "react-redux";
import { Text, Grid, Image } from "../../elements";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

const Schedule = () => {
  const profile_list = useSelector((state) => state.mypage.list);
  if (profile_list.length === 0) {
    return <></>;
  }

  return (
    <>
      {profile_list.waiting.length === 0 ? (
        <Box>예정된 그룹 러닝이 없습니다</Box>
      ) : (
        <Grid display="flex" width="1230px" margin="0 0 0 -31px">
          {profile_list.waiting?.map((waiting, index) => (
            <Grid
              key={index}
              width="288px"
              margin="0 8px 55px 8px"
              justify-content="space-between"
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
                  <Title margin="8px 0 0 0">{waiting.title}</Title>
                  <Text cursor="pointer" size="13px" margin="8px 0 0 0">
                    {waiting.date} (소요 시간 : {waiting.totalTime})
                  </Text>
                </Grid>

                <Grid cursor="pointer" display="flex" margin="-4px 0 0 0">
                  <Tagg>{waiting.location}</Tagg>
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

const Tagg = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 500;
  height: 21px;
  width: 65px;
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
  border-top: 1px solid #e5e5e5;
  width: 100%;
  margin: 16px auto 10px auto;
`;

const ApplyBtnTrue = styled.button`
  max-width: 382px;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  background: #030c37;
  border-radius: 3px;
  height: 32px;
  color: white;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px black;
    font-weight: 900;
  }
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

const Title = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin: 14px 0 0 0;
`;

export default Schedule;
