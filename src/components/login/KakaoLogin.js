import React from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../../redux/modules/user";

const KakaoLogin = ({ location }) => {
  const dispatch = useDispatch();

  console.log(location);

  // 인가코드
  let params = new URLSearchParams(document.location.search);
  let code = params.get("code");

  // let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  React.useEffect(async () => {
    await dispatch(kakaoLogin(code));
  }, []);

  return <></>;
};

export default KakaoLogin;
