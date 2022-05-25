import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import EditContent from "../components/groupEdit/EditContent";
import EditImages from "../components/groupEdit/EditImages";
import { Text } from "../elements";
import { history } from "../redux/configureStore";
import { getGroupDetailDB } from "../redux/modules/feed";
import swal from "sweetalert";
import { useMediaQuery } from "react-responsive";
import EditContentMob from "../components/groupEdit/EditContentMob";
import { getCookie } from "../shared/Cookie";

const GroupEdit = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [isLoaded1, setIsLoad1] = useState(false);
  const [isLoaded2, setIsLoad2] = useState(false);

  useEffect(() => {
    dispatch(getGroupDetailDB(groupId));
  }, []);

  const token = getCookie("accessToken");

  useEffect(() => {
    if (!token) {
      swal("비정상적인 접근입니다.");
      history.push("/");
    }
  }, []);

  if (isMobile) {
    if (!isLoaded1) {
      return (
        <>
          <EditContentMob
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
            isMobile={true}
            setIsLoad1={setIsLoad1}
            setIsLoad2={setIsLoad2}
            {...detailGroup}
          />
        </>
      );
    }
  }

  if (!isMobile) {
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
  }
};

export default GroupEdit;
