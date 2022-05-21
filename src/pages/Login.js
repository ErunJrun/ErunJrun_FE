import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import KakaoLogin from "../assets/KakaoLogin.png";
import NaverLogin from "../assets/NaverLogin.png";
import kakaoLoginMob from "../assets/kakaoLoginMob.png";
import naverLoginMob from "../assets/naverLoginMob.png";
import { history } from "../redux/configureStore";
import LoginLogo from "../assets/LoginLogo.png";
import loginLogoMob from "../assets/loginLogoMob.png";
import { getCookie, setCookie } from "../shared/Cookie";
import { useMediaQuery } from "react-responsive";

const Login = ({ location }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

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
    if (token && isLogin) history.push("/");
  }, [isLogin]);

  if (isMobile) {
    return (
      <React.Fragment>
        <Grid
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="10px auto"
          width="375px"
        >
          <LogoImgMob src={loginLogoMob}></LogoImgMob>

          <KakaoBtnMob
            onClick={() => {
              window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${kakaoCallbackUrl}&response_type=code`;
            }}
            src={kakaoLoginMob}
          ></KakaoBtnMob>

          <NaverBtnMob
            onClick={() => {
              window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClinetId}&redirect_uri=${naverCallbackUrl}&state=erunjrun`;
            }}
            src={naverLoginMob}
          ></NaverBtnMob>
        </Grid>
      </React.Fragment>
    );
  }

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
  animation: shake-bottom 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite
    both;

  @keyframes shake-bottom {
    0%,
    100% {
      transform: rotate(0deg);
      transform-origin: 50% 100%;
    }
    10% {
      transform: rotate(2deg);
    }
    20%,
    40%,
    60% {
      transform: rotate(-4deg);
    }
    30%,
    50%,
    70% {
      transform: rotate(4deg);
    }
    80% {
      transform: rotate(-2deg);
    }
    90% {
      transform: rotate(2deg);
    }
  }
`;

const LogoImgMob = styled.img`
  width: 189px;
  height: 81px;
  margin: 150px auto 64px auto;
  animation: shake-bottom 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite
    both;

  @keyframes shake-bottom {
    0%,
    100% {
      transform: rotate(0deg);
      transform-origin: 50% 100%;
    }
    10% {
      transform: rotate(2deg);
    }
    20%,
    40%,
    60% {
      transform: rotate(-4deg);
    }
    30%,
    50%,
    70% {
      transform: rotate(4deg);
    }
    80% {
      transform: rotate(-2deg);
    }
    90% {
      transform: rotate(2deg);
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
    box-shadow: 0 0 3px black;
  }
`;

const KakaoBtnMob = styled.img`
  width: 250px;
  height: 44px;
  margin-bottom: 10px;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #142785;
  }
`;

const NaverBtnMob = styled.img`
  width: 250px;
  height: 44px;
  margin-bottom: 200px;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px black;
  }
`;

export default Login;
