import React, { useState, useEffect } from "react";
import { Text, Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { patchAttendDB } from "../redux/modules/mypage";
import styled from "styled-components";
import { Redirect, useParams } from "react-router-dom";
import { getCookie } from "../shared/Cookie";
import { useLocation } from "react-router-dom";

import Ready from "../shared/Ready";

const Check = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const isLogin = useSelector((state) => state.user.isLogin);
  const token = getCookie("accessToken");
  localStorage.removeItem("from");

  //페이지 정보
  const { pathname } = useLocation();

  console.log(groupId);

  const check_list = useSelector((state) => state.mypage.attend);
  console.log(check_list);

  const [userId, setUserId] = useState([]);
  console.log(userId);

  const choiceTime = (e, index) => {
    if (e.target.checked) {
      setUserId([...userId, index]);
    } else {
      // 체크 해제
      setUserId(userId.filter((el) => el !== index));
    }
  };
  // useEffect(() => {
  //   if(isLogin || token) history.push("/");
  // }, [])
  // useEffect(() => {
  //   if (!isLogin) {
  //     window.alert("로그인 후 이용해 주세요");
  //     history.push("/login");
  //   }
  // }, []);

  // if (check_list.length === 0) return <></>;

  if (token) {
    return (
      <Box>
        <Grid height="142px" bg="#030c37">
          <Img src={check_list?.groupInfo?.user?.profileUrl} />
          <img src="https://ifh.cc/g/fkqsm3.png" />
        </Grid>

        <InfoBox>
          <Grid display="flex">
            <Text bold size="16px" margin="22px 15px 0 32px">
              {check_list?.groupInfo?.date}
            </Text>
            <Text size="16px" margin="22px 0 0 0">
              {check_list?.groupInfo?.title}
            </Text>
          </Grid>
          <Text bold size="16px" margin="0 50px 0 0">
            {check_list?.groupInfo?.attendanceCount}
          </Text>
        </InfoBox>

        <Leader>
          <Grid display="flex">
            <MyImage src={check_list?.groupInfo?.user?.profileUrl} />
            <Text bold size="16px" margin="30px 0 0 25px">
              {check_list?.groupInfo?.user?.nickname}
            </Text>
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
              onChange={(e) => {
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
            history.push("/mypage");
            dispatch(patchAttendDB(groupId, userId));
          }}
        >
          출석체크 완료
        </Btn>
      </Box>
    );
  }

  if (!token) {
    window.alert("로그인 후 이용해주세요");
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

const Leader = styled.div`
  width: 510px;
  height: 84px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MyImage = styled.img`
  height: 64px;
  width: 64px;
  border: 2px solid #68f99e;
  border-radius: 50%;
  margin-top: 7px;
`;

const Image = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 50%;
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const UserBox = styled.div`
  width: 510px;
  height: 98px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center; ;
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
  margin: 0 8px 0 0;
`;

export default Check;
