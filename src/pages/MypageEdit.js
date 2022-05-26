import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformationDB} from "../redux/modules/mypage"
import Edit from "../components/myPage/Edit";

const MypageEdit = () => {
  
  const dispatch = useDispatch(); 
  
  useEffect(() => {
    dispatch(getInformationDB());
  }, []);

  const profile = useSelector((state) => state.mypage.info);
//console.log(profile);
  if (profile.length === 0) { return <></>; }
 
  return (
    <> 
      <Edit profile={profile}/>
    </>
  );
};


export default MypageEdit;