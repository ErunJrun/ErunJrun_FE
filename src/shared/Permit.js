import React from "react";
import { useSelector } from "react-redux";
import { getCookie } from "./Cookie";

const Permit = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const isToken = getCookie("accessToken") ? true : false;

  if (isLogin && isToken) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

export default Permit;
