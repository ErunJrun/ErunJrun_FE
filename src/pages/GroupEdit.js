import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import EditContent from "../components/groupEdit/EditContent";
import EditImages from "../components/groupEdit/EditImages";
import { Text } from "../elements";
import { history } from "../redux/configureStore";
import { getGroupDetailDB } from "../redux/modules/feed";

const GroupEdit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);
  const isLogin = useSelector((state) => state.user.isLogin);

  console.log(detailGroup);

  const [isLoaded1, setIsLoad1] = useState(false);
  const [isLoaded2, setIsLoad2] = useState(false);

  useEffect(() => {
    dispatch(getGroupDetailDB(groupId));
  }, []);

  useEffect(() => {
    if (!isLogin) {
      window.alert("비정상적인 접근입니다.");
      history.push("/");
    }
  }, []);

  if (!isLoaded1) {
    return (
      <>
        <EditContent
          setIsLoad1={setIsLoad1}
          setIsLoad2={setIsLoad2}
          {...detailGroup}
        />
      </>
    );
  }

  if (isLoaded2) {
    return (
      <>
        <EditImages
          setIsLoad1={setIsLoad1}
          setIsLoad2={setIsLoad2}
          {...detailGroup}
        />
      </>
    );
  }
};

export default GroupEdit;
