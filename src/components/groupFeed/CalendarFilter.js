import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarFilter = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // console.log(
  //   startDate.toISOString().substring(0, 10),
  //   "사이칸",
  //   endDate,

  // );

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
    />
  );
};

export default CalendarFilter;
