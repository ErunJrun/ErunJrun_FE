import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import EditContent from "../components/groupEdit/EditContent";
import EditImages from "../components/groupEdit/EditImages";
import { Text } from "../elements";
import { getGroupDetailDB } from "../redux/modules/feed";

const GroupEdit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);

  console.log(detailGroup);

  const [isLoaded1, setIsLoad1] = useState(false);
  const [isLoaded2, setIsLoad2] = useState(false);

  useEffect(() => {
    dispatch(getGroupDetailDB(groupId));
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
