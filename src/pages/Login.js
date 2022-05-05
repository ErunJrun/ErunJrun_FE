import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import KakaoLogin from "../assets/KakaoLogin.png";
import NaverLogin from "../assets/NaverLogin.png";
import { history } from "../redux/configureStore";

const Login = () => {
  const dispatch = useDispatch();
  const naverClinetId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const naverCallbackUrl = process.env.REACT_APP_NAVER_CALLBACK_URL;
  const kakaoClientId = process.env.REACT_APP_KAKAO_LOGIN_ID;
  const kakaoCallbackUrl = process.env.REACT_APP_KAKAO_CALLBACK_URL;

  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (isLogin) {
      return history.push("/");
    }
  }, []);

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
        <Grid
          maxWidth="470px"
          width="100%"
          display="flex"
          flexDirection="column"
          margin="0 0 163px 0"
        >
          <Text margin="0" size="48px">
            함께 달리고 싶을 땐
          </Text>
          <Text margin="0" bold size="48px">
            이RUN저RUN
          </Text>
        </Grid>

        <Grid
          maxWidth="470px"
          width="100%"
          display="flex"
          flexDirection="column"
        >
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
      </Grid>
    </React.Fragment>
  );
};

const KakaoBtn = styled.img`
  margin-bottom: 20px;
`;

const NaverBtn = styled.img`
  margin-bottom: 20px;
`;

export default Login;
