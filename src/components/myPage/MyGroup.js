import React from "react";
import { useParams } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { getAttendDB } from "../../redux/modules/mypage";

//css, library, package
import swal from "sweetalert";

//elements
import { Text, Grid, Image, Spinner } from "../../elements";
import styled from "styled-components";

const MyGroup = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;

  const hostId = localStorage.getItem("userId");

  const my = useSelector((state) => state.mypage.mygroup);

  if (my.length === 0) {
    return <></>;
  }

  return (
    <>
      {my.data.length === 0 ? (
        <Grid minHeight="600px" display="flex">
          <Box>진행한 그룹 러닝이 없습니다</Box>
        </Grid>
      ) : (
        <Grid display="flex" width="1230px" margin="0 0 0 -31px">
          {my.data?.map((data, index) => (
            <Grid
              key={index}
              width="288px"
              margin="0 8px 55px 8px"
              justify-content="space-between"
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
                  <Title cursor="pointer" size="16px" bold margin="8px 0 0 0">
                    {data.title}
                  </Title>
                  <Text cursor="pointer" size="13px" margin="8px 0 0 0">
                    {data.date}
                  </Text>
                </Grid>

                <Grid cursor="pointer" display="flex" margin="-4px 0 0 0">
                  <Tagg>{data.location}</Tagg>
                  <Tag>{data.distance}km</Tag>
                  <Tag>{data.thema}</Tag>
                </Grid>
                <Hr></Hr>
              </Grid>
              {hostId === userId ? (
                <>
                  <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    margin="0 0 10px 0"
                  ></Grid>
                  {data.attendance ? (
                    <ApplyBtnFalse>체크완료</ApplyBtnFalse>
                  ) : data.applyEndTime === "0 일" ? (
                    <ApplyBtnTrue
                      onClick={() => {
                        history.push(`/check/${data.groupId}`);
                        dispatch(
                          getAttendDB(data.groupId, data.userId, hostId)
                        );
                      }}
                    >
                      출석체크
                    </ApplyBtnTrue>
                  ) : (
                    <ApplyBtnTrue
                      onClick={() => {
                        swal("아직 출석체크 시간이 아닙니다");
                      }}
                    >
                      출석체크
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
          ))}
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

const Tagg = styled.div`
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

const ApplyBtnFalse = styled.button`
  max-width: 382px;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  background: #f0f0f0;
  border-radius: 3px;
  height: 32px;
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

export default MyGroup;
