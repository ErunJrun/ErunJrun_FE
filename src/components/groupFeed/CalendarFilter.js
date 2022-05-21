import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "../../elements";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const CalendarFilter = (props) => {
  const [dateRange, setDateRange] = useState(["", ""]);
  const [startDate, endDate] = dateRange;

  const _startDate = formatDate(startDate);
  const _endDate = formatDate(endDate);

  //날짜 포맷 변환
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  useEffect(() => {
    props.setStartDate(_startDate);
    props.setEndDate(_endDate);
  }, [dateRange]);

  useEffect(() => {
    setDateRange(["", ""]);
  }, [props.reset]);

  return (
    <>
      <DatePicker
        locale={ko}
        placeholderText="날짜 범위를 선택해주세요"
        dateFormat="yyyy-MM-dd"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        customInput={<DateInput />}
      />
    </>
  );
};

const DateInput = styled.input`
  width: 317px;
  height: 46px;
  padding: 13px 16px;
  border: solid 1px #000;
  border-radius: 3px;
  font-size: 16px;
  font-weight: 400;
  color: #818181;
  margin: 0;
  box-sizing: border-box;
  outline: none;
  :focus {
    border: 1px solid #68f99e;
  }
`;

export default CalendarFilter;
