import React from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../../redux/modules/user";

const KakaoLogin = () => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  React.useEffect(async () => {
    await dispatch(kakaoLogin(code));
  }, []);

  return <></>;
};

export default KakaoLogin;
