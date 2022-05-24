/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { Text, Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { getAttendDB, patchAttendDB } from "../redux/modules/mypage";
import styled from "styled-components";
import { Redirect, useParams } from "react-router-dom";
import { getCookie } from "../shared/Cookie";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import backBtn from "../assets/groupFeed/backBtn.svg";
import swal from "sweetalert";

const Check = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const id = localStorage.getItem("userId");
  const from = localStorage.getItem("from");
  const isLogin = useSelector((state) => state.user.isLogin);
  const token = getCookie("accessToken");

  //페이지 정보
  const { pathname } = useLocation();

  const check_list = useSelector((state) => state.mypage.attend);

  const [userId, setUserId] = useState([]);

  const choiceTime = (e, index) => {
    if (e.target.checked) {
      setUserId([...userId, index]);
    } else {
      setUserId(userId.filter((el) => el !== index));
    }
  };

  useEffect(() => {
    if (token && from) {
      dispatch(getAttendDB(groupId));
      localStorage.removeItem("from");
    }
  }, [token]);

  if (!token && isMobile) {
    swal("로그인 후 이용해 주세요");
    return <Redirect to={{ pathname: "/login", state: { from: pathname } }} />;
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
                history.push(`/mypage/${id}`);
              }}
            />
            <Text margin="0 0 0 130px" bold size="16px">
              출석체크
            </Text>
          </Grid>
        </Grid>
        <Grid
          display="flex"
          justifyContent="center"
          width="100%"
          margin="50px auto "
        >
          <_InfoBox>
            <Grid display="flex">
              <Text bold size="12px" margin="22px 10px 0 15px">
                {check_list?.groupInfo?.date}
              </Text>
              <Text size="12px" margin="22px 0 0 0">
                {check_list?.groupInfo?.title}
              </Text>
            </Grid>
            <Text bold size="12px" margin="0 20px 0 0">
              {check_list?.groupInfo?.attendanceCount}
            </Text>
          </_InfoBox>

          <_Leader>
            <Grid display="flex">
              <_MyImage src={check_list?.groupInfo?.user?.profileUrl} />
              <Text bold size="15px" margin="30px 0 0 25px">
                {check_list?.groupInfo?.user?.nickname}
              </Text>
              <_Img src="https://ifh.cc/g/06D7Gr.png" />
            </Grid>
            <Text
              width="71px"
              height="31px"
              bold
              size="12px"
              color="#030c37"
              margin="48px 0 0 0"
            >
              크루장
            </Text>
          </_Leader>

          {check_list?.applyUser?.map((applyUser, index) => (
            <_UserBox key={index}>
              <Grid display="flex" margin="32px 0 0 0">
                <_Image src={applyUser.user.profileUrl} />
                <Text bold size="12px" margin="21px 0 0 25px">
                  {applyUser.user.nickname}
                </Text>
              </Grid>
              <_Label
                onClick={(e) => {
                  choiceTime(e, index);
                }}
                checked={userId.includes(index)}
              >
                <input
                  type="checkbox"
                  name={applyUser.userId}
                  value={applyUser.userId}
                />
                <Text size="12px">출석</Text>
              </_Label>
            </_UserBox>
          ))}

          <_Btn
            onClick={() => {
              history.push(`/mypage/${id}`);
              dispatch(patchAttendDB(groupId, userId));
            }}
          >
            출석체크 저장
          </_Btn>
        </Grid>
      </>
    );
  }

  if (token) {
    return (
      <Box>
        <InfoBox>
          <Grid display="flex">
            <Text bold size="15px" margin="22px 10px 0 24px">
              {check_list?.groupInfo?.date}
            </Text>
            <Text size="15px" margin="22px 0 0 0">
              {check_list?.groupInfo?.title}
            </Text>
          </Grid>
          <Text bold size="15px" margin="0 30px 0 0">
            {check_list?.groupInfo?.attendanceCount}
          </Text>
        </InfoBox>

        <Leader>
          <Grid display="flex">
            <MyImage src={check_list?.groupInfo?.user?.profileUrl} />
            <Text bold size="16px" margin="30px 0 0 25px">
              {check_list?.groupInfo?.user?.nickname}
            </Text>
            <Img src="https://ifh.cc/g/06D7Gr.png" />
          </Grid>
          <Text
            width="104px"
            height="44px"
            bold
            size="16px"
            color="#030c37"
            margin="20px -10px 0 0"
          >
            크루장
          </Text>
        </Leader>

        {check_list?.applyUser?.map((applyUser, index) => (
          <UserBox key={index}>
            <Grid display="flex" margin="32px 0 0 0">
              <Image src={applyUser.user.profileUrl} />
              <Text bold size="16px" margin="21px 0 0 25px">
                {applyUser.user.nickname}
              </Text>
            </Grid>
            <Label
              onClick={(e) => {
                choiceTime(e, index);
              }}
              checked={userId.includes(index)}
            >
              <input
                type="checkbox"
                name={applyUser.userId}
                value={applyUser.userId}
              />
              <Text size="16px">출석</Text>
            </Label>
          </UserBox>
        ))}

        <Btn
          onClick={() => {
            history.push(`/mypage/${id}`);
            dispatch(patchAttendDB(groupId, userId));
          }}
        >
          출석체크 완료
        </Btn>
      </Box>
    );
  }

  if (!token) {
    swal("로그인 후 이용해 주세요");
    return <Redirect to={{ pathname: "/login", state: { from: pathname } }} />;
  }
};

const Box = styled.div`
  width: 540px;
  border: 1px solid #ccc;
  margin: 100px auto 30px auto;
`;

const InfoBox = styled.div`
  height: 65px;
  background-color: #f3f3f3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const _InfoBox = styled.div`
  height: 60px;
  background-color: #f3f3f3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Leader = styled.div`
  width: 510px;
  height: 84px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const _Leader = styled.div`
  height: 50px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 375px;
`;

const MyImage = styled.img`
  height: 64px;
  width: 64px;
  border: 2px solid #68f99e;
  border-radius: 50%;
  margin-top: 7px;
`;

const _MyImage = styled.img`
  height: 55px;
  width: 55px;
  border: 2px solid #68f99e;
  border-radius: 50%;
  margin-top: 7px;
`;

const Image = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 50%;
`;

const _Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const Img = styled.img`
  height: 27px;
  width: 22px;
  margin: 29px 0 0 10px;
`;

const _Img = styled.img`
  height: 23px;
  width: 18px;
  margin: 29px 0 0 10px;
`;

const UserBox = styled.div`
  width: 510px;
  height: 98px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center; ;
`;

const _UserBox = styled.div`
  height: 50px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 375px;
`;

const Btn = styled.button`
  width: 186px;
  height: 56px;
  margin: 50px 0 100px 180px;
  border-radius: 3px;
  border: none;
  background-color: #68f99e;
  color: #030c37;
  font-size: 16px;
  font-weight: 550;
`;

const _Btn = styled.button`
  width: 200px;
  height: 44px;
  margin: 109px auto;
  border-radius: 3px;
  border: none;
  background-color: #030c37;
  color: #68f99e;
  font-size: 14px;
  font-weight: 550;
`;

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    width: 95px;
    height: 36px;
    padding: 8px 19px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: solid 1px #f0f0f0;
    background-color: #f0f0f0;
    cursor: pointer;
    box-sizing: border-box;
    color: #000;
    content: "dff";
  }
  input:checked + p {
    border: solid 1px #030c37;
    background-color: #030c37;
    color: #68f99e;
    font-weight: 500;
  }
  margin: 0px 8px 0 0;
`;

const _Label = styled.label`
  input {
    display: none;
  }
  input + p {
    width: 71px;
    height: 31px;
    padding: 8px 19px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: solid 1px #f0f0f0;
    background-color: #f0f0f0;
    cursor: pointer;
    box-sizing: border-box;
    color: #000;
    content: "dff";
  }
  input:checked + p {
    border: solid 1px #030c37;
    background-color: #030c37;
    color: #68f99e;
    font-weight: 500;
  }
  margin: 48px 8px 0 0;
`;

export default Check;
