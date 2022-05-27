import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import inputArrowGray from "../../assets/groupUpload/inputArrowGray.svg";

import { TimepickerUI } from "timepicker-ui";

import "./TimePicker.css";
import { Grid } from "../../elements";

const TimePickers = (props) => {
  const tmRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const testHandler = useCallback(({ detail: { hour, minutes, type } }) => {
    console.log(hour, minutes, type);

    if (type === "PM") {
      return setInputValue(Number(`${hour}`) + 12 + ":" + `${minutes}`);
    }

    if (type === "AM") {
      return setInputValue(`${hour}:${minutes}`);
    }
  }, []);

  useEffect(() => {
    props.setStandbyTime(inputValue);
  }, [inputValue]);

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
