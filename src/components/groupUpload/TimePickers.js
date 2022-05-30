import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import inputArrowGray from "../../assets/groupUpload/inputArrowGray.svg";

import { TimepickerUI } from "timepicker-ui";

import "./TimePicker.css";
import { Grid } from "../../elements";
import dayjs from "dayjs";
import swal from "sweetalert";

const TimePickers = (props) => {
  const tmRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const testHandler = useCallback(({ detail: { hour, minutes, type } }) => {
    if (type === "PM") {
      standbyTimePick(Number(`${hour}`) + 12 + ":" + `${minutes}`);
      setInputValue(Number(`${hour}`) + 12 + ":" + `${minutes}`);
    }

    if (type === "AM") {
      standbyTimePick(`${hour}:${minutes}`);
      setInputValue(`${hour}:${minutes}`);
    }
  }, []);

  //스탠바이 시간 선택
  const standbyTimePick = (time) => {
    if (
      dayjs(props.date).format("YYYYMMDD") ===
      dayjs(new Date()).format("YYYYMMDD")
    ) {
      if (time < dayjs().format("HH:mm")) {
        props.setStandbyTime("");
        swal("현재 시간부터 6시간 이후 등록이 가능합니다.");
      }

      if (time < dayjs().add(6, "hour").format("HH:mm")) {
        props.setStandbyTime("");
        swal("현재 시간부터 6시간 이후 등록이 가능합니다.");
      }
      // } else {
      //   if (time > dayjs().add(6, "hour").format("HH:mm")) {
      //     if (time < dayjs().add(30, "hour").format("HH:mm")) {
      //       props.setStandbyTime("");
      //       swal("현재 시간부터 6시간 이후 등록이 가능합니다.");
      //     }
      //   }
    }
  };

  useEffect(() => {
    // standbyTimePick(inputValue);
    props.setStandbyTime(inputValue);
  }, [inputValue, props.date]);

  useEffect(() => {
    const tm = tmRef.current;
    const newPicker = new TimepickerUI(tm, {});
    newPicker.create();

    tm.addEventListener("accept", testHandler);

    return () => {
      tm.removeEventListener("accept", testHandler);
    };
  }, [testHandler]);

  return (
    <Grid
      width="auto"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <div className="timepicker-ui" ref={tmRef}>
        <input
          placeholder="출발 시간(00:00)"
          type="test"
          className="timepicker-ui-input"
        />
        <img src={inputArrowGray} />
      </div>
    </Grid>
  );
};

export default TimePickers;
