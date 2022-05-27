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
import inputArrowGray from "../../assets/groupUpload/inputArrowGray.svg";

const CalendarFilter = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });
  console.log(props);
  // const [dateRange, setDateRange] = useState(["", ""]);
  // const [startDate, endDate] = dateRange;

  const [startDate, setStartDate] = useState("");
  const [uploadDate, setUploadDate] = useState(props.date);
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

  const onChange2 = (e) => {
    console.log(e);
    setUploadDate(e);
    if (uploadDate) {
      setIsCalendarOpen(false);
    }
  };

  const _startDate = formatDate(startDate);
  const _endDate = formatDate(endDate);
  const _uploadDate = formatDate(uploadDate);

  console.log(uploadDate, _uploadDate);

  const koStartDate = dayjs(_startDate).format("YYYY년 M월 D일");
  const koEndDate = dayjs(_endDate).format("YYYY년 M월 D일");
  const koUploadDate = dayjs(_uploadDate).format("YYYY년 M월 D일");

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
    if (props.upload) {
      props.setDate(_uploadDate);
    }
  }, [uploadDate]);

  useEffect(() => {
    props.setStartDate(_startDate);
    props.setEndDate(_endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    setStartDate("");
    setEndDate("");
    setUploadDate("");
    setIsCalendarOpen(false);
  }, [props.reset]);

  useEffect(() => {
    setIsCalendarOpen(false);
  }, [props.closeCalendar]);

  if (props.upload && !isMobile) {
    return (
      <>
        <Grid
          display="flex"
          alignItems="center"
          padding="10px 20px"
          width="357px"
          height="75px"
          border="1px solid #CBCBCB"
          borderRadius="3px 0 0 3px"
          borderRight="none"
          hover="border:1px solid #030C37;"
          margin="0"
          _onClick={() => {
            setIsCalendarOpen(!isCalendarOpen);
          }}
        >
          {_uploadDate === "NaN-NaN-NaN" ? (
            <>
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text textalign color="#818181" width="auto" margin="0 4px 0 0">
                  러닝날짜(YYYY.MM.DD)
                </Text>
                <img src={inputArrowGray} />
              </Grid>
            </>
          ) : (
            <>
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text textalign width="auto" margin="0 4px 0 0" regular>
                  {koUploadDate}
                </Text>
                <img src={inputArrowGray} />
              </Grid>
            </>
          )}
        </Grid>
        <Grid>
          {isCalendarOpen ? (
            <DatePicker
              calendarClassName="rasta-stripes"
              selected={uploadDate}
              onChange={(e) => {
                onChange2(e);
                setIsCalendarOpen(false);
              }}
              startDate={uploadDate}
              minDate={new Date()}
              inline
              locale={ko}
            />
          ) : null}
        </Grid>
      </>
    );
  }

  if (!props.upload && isMobile) {
    return (
      <>
        <Grid width="295px" display="flex">
          <Grid
            display="flex"
            justifyContent="right"
            alignItems="center"
            padding="10px 14px"
            width="147.5px"
            height="44px"
            border="1px solid #CBCBCB"
            borderRadius="3px 0 0 3px"
            hover="border:1px solid #030C37;"
            margin="0"
            _onClick={() => {
              setIsCalendarOpen(!isCalendarOpen);
            }}
          >
            {_startDate === "NaN-NaN-NaN" ? (
              <>
                <Text
                  size="13px"
                  textalign
                  width="120px"
                  margin="0 8px 0 0"
                  regular
                ></Text>
                <Text
                  size="13px"
                  width="auto"
                  margin="0"
                  regular
                  color="#818181"
                >
                  부터
                </Text>
              </>
            ) : (
              <Text
                size="13px"
                textalign
                width="120px"
                margin="0 8px 0 0"
                regular
              >
                {koStartDate}
              </Text>
            )}
          </Grid>

          <Grid
            display="flex"
            alignItems="center"
            justifyContent="right"
            padding="10px 14px"
            width="147.5px"
            height="44px"
            border="1px solid #CBCBCB"
            borderRadius="3px 0 0 3px"
            hover="border:1px solid #030C37;"
            margin="0"
            _onClick={() => {
              setIsCalendarOpen(!isCalendarOpen);
            }}
          >
            {_endDate === "1970-01-01" || _endDate === "NaN-NaN-NaN" ? (
              <>
                <Text
                  size="13px"
                  textalign
                  width="120px"
                  margin="0 8px 0 0"
                  regular
                ></Text>
                <Text
                  size="13px"
                  width="auto"
                  margin="0 6px 0 0"
                  regular
                  color="#818181"
                >
                  까지
                </Text>
              </>
            ) : (
              <Text size="13px" textalign width="100px" margin="0" regular>
                {koEndDate}
              </Text>
            )}

            <img style={{ width: "10px" }} src={inputArrow} />
          </Grid>
        </Grid>

        {isCalendarOpen ? (
          <Grid width="295px" display="relative">
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              locale={ko}
            />
          </Grid>
        ) : null}
      </>
    );
  }

  if (isMobile && props.upload) {
    return (
      <>
        <Grid
          display="flex"
          alignItems="center"
          padding="10px 14px"
          width="171.5px"
          height="44px"
          border="1px solid #CBCBCB"
          borderRadius="3px 0 0 3px"
          hover="border:1px solid #030C37;"
          margin="0"
          _onClick={() => {
            setIsCalendarOpen(!isCalendarOpen);
          }}
        >
          {_uploadDate === "NaN-NaN-NaN" ? (
            <>
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  size="13px"
                  regular
                  textalign
                  color="#818181"
                  width="auto"
                  margin="0 4px 0 0"
                >
                  러닝날짜
                </Text>
                <img src={inputArrowGray} />
              </Grid>
            </>
          ) : (
            <>
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  size="13px"
                  regular
                  textalign
                  width="auto"
                  margin="0 4px 0 0"
                >
                  {koUploadDate}
                </Text>
                <img src={inputArrowGray} />
              </Grid>
            </>
          )}
        </Grid>
        <Grid>
          {isCalendarOpen ? (
            <DatePicker
              calendarClassName="rasta-stripes"
              selected={uploadDate}
              onChange={(e) => {
                onChange2(e);
                setIsCalendarOpen(false);
              }}
              startDate={uploadDate}
              minDate={new Date()}
              inline
              locale={ko}
            />
          ) : null}
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid display="flex">
        <StartDate
          onClick={() => {
            setIsCalendarOpen(!isCalendarOpen);
          }}
        >
          {_startDate === "NaN-NaN-NaN" ? (
            <Text textalign width="120px" margin="0 8px 0 0" regular></Text>
          ) : (
            <Text textalign width="120px" margin="0 8px 0 0" regular>
              {koStartDate}
            </Text>
          )}

          <Text width="auto" margin="0" regular color="#818181">
            부터
          </Text>
        </StartDate>

        <EndDate
          onClick={() => {
            setIsCalendarOpen(!isCalendarOpen);
          }}
        >
          {_endDate === "1970-01-01" || _endDate === "NaN-NaN-NaN" ? (
            <Text textalign width="120px" margin="0 8px 0 0" regular></Text>
          ) : (
            <Text textalign width="120px" margin="0 8px 0 0" regular>
              {koEndDate}
            </Text>
          )}

          <Text width="auto" margin="0 16px 0 0" regular color="#818181">
            까지
          </Text>
          <img style={{ width: "13px" }} src={inputArrow} />
        </EndDate>
      </Grid>

      {isCalendarOpen ? (
        <Grid width="425px" display="relative">
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            locale={ko}
            // minDate={new Date()}
          />
        </Grid>
      ) : null}
    </>
  );
};

const StartDateMob = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 44px;
  padding: 10px;
  border: 1px solid #b8b8b8;
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

const EndDateMob = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 153px;
  height: 44px;
  padding: 10px;
  border: 1px solid #b8b8b8;
  border-left: none;
  border-radius: 0 3px 3px 0;
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

const StartDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  justify-content: center;
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

export default CalendarFilter;
