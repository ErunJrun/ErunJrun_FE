import React, { useState, Fragment, useEffect } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";

const TimeFilter = (props) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  useEffect(() => {
    props?.setFilterTime(checkedInputs);
  }, [checkedInputs]);

  useEffect(() => {
    if (props?.reset) {
      setCheckedInputs([]);
    }
  }, [props.reset]);

  const [time, setTime] = useState([
    "전체 시간",
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

  if (props.isMobile) {
    return (
      <Grid
        display="flex"
        width="295px"
        flexDirection="column"
        justifyContent="left"
        alignItems="center"
        margin="0 0 32px 0"
        height="auto"
      >
        <Text width="295px" height="auto" size="14px" bold margin="0 0 12px 0">
          러닝 시간대
        </Text>

        <Grid
          height="164px"
          margin="0"
          width="295px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {time.map((e, idx) => {
            return (
              <Fragment key={idx}>
                <LabelMob>
                  <input
                    onChange={(e) => {
                      choiceTime(e, idx);
                    }}
                    checked={checkedInputs.includes(idx)}
                    type="checkbox"
                    name={e}
                    value={idx || ""}
                  />
                  <Text margin="0" color="#7B7B7B" regular size="13px">
                    {e}
                  </Text>
                </LabelMob>
              </Fragment>
            );
          })}
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid display="flex" alignItems="center" width="100%" margin="0 auto">
      <Text size="16px" bold margin="0 16px 0 0">
        러닝 시간대
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
              <input type="checkbox" name={e} value={idx || ""} />
              <Text size="16px">{e}</Text>
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
    width: auto;
    padding: 8px 19px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 60px;
    border: solid 1px #f0f0f0;
    background-color: #f0f0f0;
    cursor: pointer;
    box-sizing: border-box;
    color: #000;
  }
  input:checked + p {
    border: solid 1px #030c37;
    background-color: #030c37;
    color: #68f99e;
    font-weight: 500;
  }
  margin: 0 8px 0 0;
`;

const LabelMob = styled.label`
  input {
    display: none;
  }
  input + p {
    width: 142px;
    height: 32px;
    padding: 8px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 60px;
    border: 1px solid #b8b8b8;
    cursor: pointer;
    box-sizing: border-box;
    color: #7b7b7b;
    margin: 0;
  }
  input:checked + p {
    background: #68f99e;
    border: 1px solid #68f99e;
    border-radius: 60px;
    color: #030c37;
    font-weight: 500;
  }
`;

export default TimeFilter;
