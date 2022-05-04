import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroupDetailDB } from "../redux/modules/feed";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const detailGroup = useSelector((state) => state.feed.detail);
  console.log(detailGroup);

  useEffect(() => {
    dispatch(getGroupDetailDB(groupId));
  }, []);

  return <div>GroupDetail</div>;
};

export default GroupDetail;
