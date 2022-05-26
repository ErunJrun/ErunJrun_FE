import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Text } from "../../elements";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { useMediaQuery } from "react-responsive";
import "./CalendarFilter.css";
import inputArrow from "../../assets/groupFeed/inputArrow.svg";
import dayjs from "dayjs";

const CalendarFilter = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  // const [dateRange, setDateRange] = useState(["", ""]);
  // const [startDate, endDate] = dateRange;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onChange = (dates) => {
    const [start, end] = dates;
    console.log(start, end);
    setStartDate(start);
    setEndDate(end);
    if (end) {
      setIsCalendarOpen(false);
    }
  };

  const _startDate = formatDate(startDate);
  const _endDate = formatDate(endDate);

  const koStartDate = dayjs(_startDate).format("YYYY년 M월 DD일");
  const koEndDate = dayjs(_endDate).format("YYYY년 M월 DD일");

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
  }, [startDate, endDate]);

  // useEffect(() => {
  //   setDateRange(["", ""]);
  // }, [props.reset]);

  // if (isMobile) {
  //   return (
  //     <>
  //       <DatePicker
  //         locale={ko}
  //         placeholderText="날짜 범위를 선택해주세요"
  //         dateFormat="yyyy-MM-dd"
  //         selectsRange={true}
  //         startDate={startDate}
  //         endDate={endDate}
  //         onChange={(update) => {
  //           setDateRange(update);
  //         }}
  //         customInput={<DateInputMob />}
  //       />
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <DatePicker
  //       locale={ko}
  //       placeholderText="날짜 범위를 선택해주세요"
  //       dateFormat="yyyy-MM-dd"
  //       selectsRange={true}
  //       startDate={startDate}
  //       endDate={endDate}
  //       onChange={(update) => {
  //         setDateRange(update);
  //       }}
  //       customInput={<DateInput />}
  //     />
  //   </>
  // );

  return (
    <>
      <Grid display="flex">
        <StartDate
          onClick={() => {
            setIsCalendarOpen(!isCalendarOpen);
          }}
        >
          <Text width="auto" margin="0 8px 0 0" regular>
            {_startDate === "NaN-NaN-NaN" ? null : koStartDate}
          </Text>
          <Text width="auto" margin="0" regular color="#818181">
            부터
          </Text>
        </StartDate>

        <EndDate
          onClick={() => {
            setIsCalendarOpen(!isCalendarOpen);
          }}
        >
          <Text width="auto" margin="0 8px 0 0" regular>
            {_endDate === "1970-01-01" || _endDate === "NaN-NaN-NaN"
              ? null
              : koEndDate}
          </Text>
          <Text width="auto" margin="0 16px 0 0" regular color="#818181">
            까지
          </Text>
          <img style={{ width: "13px" }} src={inputArrow} />
        </EndDate>
      </Grid>
      <Grid width="auto" zIndex="3">
        {isCalendarOpen ? (
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            withPortal
            locale={ko}

            // minDate={new Date()}
          />
        ) : null}
      </Grid>
    </>
  );
};

const StartDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 198px;
  height: 46px;
  padding: 10px 16px;
  border: solid 1px #000;
  border-radius: 3px 0 0 3px;
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

const EndDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 227px;
  height: 46px;
  padding: 10px 16px;
  border: solid 1px #000;
  border-left: none;
  border-radius: 0 3px 3px 0;
  font-size: 16px;
  font-weight: 400;
  color: #818181;
  margin: 0 16px 0 0;
  box-sizing: border-box;
  outline: none;
  :focus {
    border: 1px solid #68f99e;
  }
`;

const DateInputMob = styled.input`
  width: 295px;
  height: 44px;
  padding: 13px 16px;
  border: 1px solid #b8b8b8;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 400;
  color: #818181;
  box-sizing: border-box;
  :focus {
    border: 1px solid #68f99e;
  }
`;

export default CalendarFilter;
