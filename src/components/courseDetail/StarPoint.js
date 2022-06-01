import React, { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { patchStarPointDB } from "../../redux/modules/course";
import { history } from "../../redux/configureStore";

//css, library, package
import swal from "sweetalert";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./StarPoint.css";

//cookie
import { getCookie } from "../../shared/Cookie";

const StarPoint = (props) => {
  const dispatch = useDispatch();

  const starPointList = useSelector((state) => state.course.starPoint);
  const token = getCookie("accessToken");

  const [myStarPoint, setMyStarPoint] = React.useState(
    props?.starPoint?.myStarPoint
  );

  const myStar = (newValue) => {
    if (!token) {
      return swal({
        text: "로그인 후 이용해 주세요",
        closeOnClickOutside: false,
      }).then(function (result) {
        if (result) {
          history.push("/login");
        }
      });
    }
    setMyStarPoint(newValue);
    dispatch(patchStarPointDB(props.courseId, newValue));
  };

  useEffect(() => {
    setMyStarPoint(props?.starPoint?.myStarPoint);
  }, [starPointList.starPoint]);

  if (props.starOne && !props.small) {
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
  if (props.small) {
    return (
      <Stack spacing={1}>
        <Rating
          readOnly
          name="size-large"
          defaultValue={1}
          max={1}
          size="middle"
        />
      </Stack>
    );
  }

  return (
    <Stack spacing={1}>
      <Rating
        value={starPointList.myStarPoint ? starPointList.myStarPoint : 1}
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
