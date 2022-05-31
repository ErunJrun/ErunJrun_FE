import React, { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getInformationDB } from "../redux/modules/mypage";

//components
import Edit from "../components/myPage/Edit";

const MypageEdit = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.mypage.info);

  useEffect(() => {
    dispatch(getInformationDB());
  }, []);

  if (profile.length === 0) {
    return <></>;
  }

  return (
    <>
      <Edit profile={profile} />
    </>
  );
};

export default MypageEdit;
