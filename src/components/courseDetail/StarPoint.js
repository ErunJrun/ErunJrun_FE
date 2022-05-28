import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchStarPointDB } from "../../redux/modules/course";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./StarPoint.css";

const StarPoint = (props) => {
  const dispatch = useDispatch();
  const [myStarPoint, setMyStarPoint] = React.useState(
    props?.starPoint?.myStarPoint
  );
  const starPointList = useSelector((state) => state.course.starPoint);
  console.log(starPointList);
  console.log(myStarPoint);

  const myStar = (newValue) => {
    console.log("22222222222222222222", newValue);
    setMyStarPoint(newValue);
    dispatch(patchStarPointDB(props.courseId, newValue));
  };

  useEffect(() => {
    setMyStarPoint(props?.starPoint?.myStarPoint);
  }, [starPointList.starPoint]);

  if (props.starOne) {
    return (
      <Stack spacing={1}>
        <Rating
          readOnly
          name="size-large"
          defaultValue={1}
          max={1}
          size="large"
        />
      </Stack>
    );
  }
  return (
    <Stack spacing={1}>
      <Rating
        value={starPointList.myStarPoint ? starPointList.myStarPoint : 0}
        onChange={(event, newValue) => {
          myStar(newValue);
        }}
        name="size-large"
        size="large"
      />
    </Stack>
  );
};

export default StarPoint;
