import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import KakaoLogin from "../assets/KakaoLogin.png";
import NaverLogin from "../assets/NaverLogin.png";
import { history } from "../redux/configureStore";
import LoginLogo from "../assets/LoginLogo.png";
import { getCookie, setCookie } from "../shared/Cookie";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Login = ({ location }) => {
  const dispatch = useDispatch();
  const naverClinetId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const naverCallbackUrl = process.env.REACT_APP_NAVER_CALLBACK_URL;
  const kakaoClientId = process.env.REACT_APP_KAKAO_LOGIN_ID;
  const kakaoCallbackUrl = process.env.REACT_APP_KAKAO_CALLBACK_URL;

  const isLogin = useSelector((state) => state.user.isLogin);
  const token = getCookie("accessToken");

  console.log(isLogin);
  console.log("패쓰네임", location);

  if (location?.state) {
    localStorage.setItem("from", location?.state?.from);
  }

  useEffect(() => {
    if (token) history.push("/");
  }, [token]);

  // const from = location.state.from;

  // if (token || from) {
  //   return <Redirect to={from} />;
  // }

  return (
    <React.Fragment>
      <Grid
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        margin="10px auto"
        padding="16px"
      >
        <LogoImg src={LoginLogo}></LogoImg>

        <KakaoBtn
          onClick={() => {
            window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${kakaoCallbackUrl}&response_type=code`;
          }}
          src={KakaoLogin}
        ></KakaoBtn>

        <NaverBtn
          onClick={() => {
            window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClinetId}&redirect_uri=${naverCallbackUrl}&state=erunjrun`;
          }}
          src={NaverLogin}
        ></NaverBtn>
      </Grid>
    </React.Fragment>
  );
};

const LogoImg = styled.img`
  width: 292px;
  height: 146px;
  margin: 135px auto 64px auto;
  animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955)
    infinite both;

  @keyframes wobble-hor-bottom {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70% {
      transform: translateX(-10px);
    }
    20%,
    40%,
    60% {
      transform: translateX(10px);
    }
    80% {
      transform: translateX(8px);
    }
    90% {
      transform: translateX(-8px);
    }
  }
`;

const KakaoBtn = styled.img`
  width: 360px;
  height: 54px;
  margin-bottom: 24px;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #142785;
  }
`;

const NaverBtn = styled.img`
  width: 360px;
  height: 54px;
  margin-bottom: 297px;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #142785;
  }
`;

export default Login;
