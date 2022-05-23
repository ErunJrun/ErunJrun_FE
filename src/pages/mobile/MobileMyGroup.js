 /* eslint-disable no-undef */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid } from "../../elements";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { getAttendDB, getMyRunningDB } from "../../redux/modules/mypage";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import swal from 'sweetalert';

const MobileMyGroup = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const hostId = localStorage.getItem("userId");
  const params = useParams();
  const userId = params.userId;

  console.log(userId);
  const my = useSelector((state) => state.mypage.mygroup);
  console.log(my);

  useEffect(() => {
    dispatch(getMyRunningDB(userId));
  }, []);

  if (my.length === 0) {
    return <></>;
  }

  if(isMobile){
  return (
    <Grid weight="100%" margin="80px auto 50px auto" textAlign="-webkit-center">
      {my.data.length === 0 ? (
          <Box>진행한 그룹 러닝이 없습니다</Box>
      ) : (
        <Grid display="flex" width="375px" >
          {my.data?.map((data, index) => (
            <Grid
              key={index}
              width="166px"
              margin="0 8px 40px 8px"
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
                  <Text cursor="pointer" size="11px" margin="5px 0 0 0" textAlign="left">
                    {data.date}
                  </Text>
                </Grid>

                <Grid width="166px" cursor="pointer" display="flex">
                  <Tag>{data.location}</Tag>
                  <Tag>{data.distance}km</Tag>
                </Grid>
                <Hr></Hr>
              </Grid>
              { hostId === userId ? 
              <>
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  margin="0 0 10px 0"
                >
                </Grid>
                {data.attendance ? (
                  <ApplyBtnFalse>체크완료</ApplyBtnFalse>
                ) : ( 
                  data.applyEndTime === "0 일" ?
                  <ApplyBtnTrue
                    onClick={() => {
                      history.push(`/check/${data.groupId}`);
                      dispatch(getAttendDB(data.groupId, data.userId, hostId));
                    }}
                  >
                    출석체크
                  </ApplyBtnTrue> 
                  :
                  <ApplyBtnTrue
                    onClick={() => {
                      swal("아직 출석체크 시간이 아닙니다");
                    }}
                  >
                    출석체크
                  </ApplyBtnTrue>
                )}
              </>
              : 
              <Grid margin="10px 0 0 0">
                  <ApplyBtnTrue
                    onClick={() => {
                      history.push(`/groupdetail/${data.groupId}`);
                    }}
                  >
                    상세보기
                </ApplyBtnTrue>
              </Grid>
              }
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};
};

const Tag = styled.div` 
  height: 15px;
  font-size: 9px;
  font-weight: 400; 
  color: #7B7B7B;
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

const ApplyBtnFalse = styled.button`
  font-size: 11px;
  font-weight: 500;
  width: 168px;
  background: #f0f0f0;
  border-radius: 3px;
  height: 24 px;
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
  width: 166px;
  border-radius: 3px;
`;

const Title = styled.text`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  white-space: nowrap; 
  display:block;
  font-weight: 700;
  font-size: 11px;
  cursor:pointer;
  margin:9px 0 0 0;
  text-align: left;
`;

export default MobileMyGroup;
