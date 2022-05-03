import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { naverLoginDB } from "../redux/modules/user";

const NaverLogin = () => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");
  let state = new URL(window.location.href).searchParams.get("state");

  useEffect(() => {
    dispatch(naverLoginDB(code, state));
  }, []);

  return null;
};

export default NaverLogin;
