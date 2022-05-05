import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "../../elements";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const CalendarFilter = (props) => {
  const [dateRange, setDateRange] = useState([
    new Date(2018, 0),
    new Date(2030, 0),
  ]);
  const [startDate, endDate] = dateRange;

  // console.log(startDate, endDate);
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

  // const choiceDate = () => {
  //   props.setStartDate(_startDate);
  //   props.setEndDate(_endDate);
  // };

  return (
    <>
      <DatePicker
        locale={ko}
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
  width: 255px;
  height: 46px;
  padding: 11px 22px 10px 24px;
  border: solid 1px #000;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  box-sizing: border-box;
  margin: 0;
`;

export default CalendarFilter;
