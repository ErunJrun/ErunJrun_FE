import React, { useState, Fragment, useEffect } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";

const TimeFilter = (props) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  useEffect(() => {
    props?.setFilterTime(checkedInputs);
  }, [checkedInputs]);

  const [time, setTime] = useState([
    "모든 시간대",
    "00:00 ~ 04:00",
    "04:00 ~ 08:00",
    "08:00 ~ 12:00",
    "12:00 ~ 16:00",
    "16:00 ~ 20:00",
    "20:00 ~ 24:00",
  ]);

  const choiceTime = (e, idx) => {
    if (e.target.checked) {
      setCheckedInputs([...checkedInputs, idx]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== idx));
    }
  };

  return (
    <Grid
      display="flex"
      alignItems="center"
      justifyContent="left"
      width="100%"
      margin="10px auto"
    >
      <Text size="18px" bold margin="12px 16px 9px 0">
        러닝 시간
      </Text>

      {time.map((e, idx) => {
        return (
          <Fragment key={idx}>
            <Label
              onChange={(e) => {
                choiceTime(e, idx);
              }}
              checked={checkedInputs.includes(idx)}
            >
              <input type="checkbox" name={e} value={idx} />
              <Text bold>{e}</Text>
            </Label>
          </Fragment>
        );
      })}
    </Grid>
  );
};

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    padding: 5px 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: solid 1px #000;
    cursor: pointer;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #000;
  }

  margin: 0px 12px;
`;

export default TimeFilter;
