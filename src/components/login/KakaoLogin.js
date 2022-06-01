import React from "react";

//redux
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../../redux/modules/user";

const KakaoLogin = ({ location }) => {
  const dispatch = useDispatch();

  // 인가코드
  let params = new URLSearchParams(document.location.search);
  let code = params.get("code");

  React.useEffect(async () => {
    await dispatch(kakaoLogin(code));
  }, []);

  return <></>;
};

export default KakaoLogin;
