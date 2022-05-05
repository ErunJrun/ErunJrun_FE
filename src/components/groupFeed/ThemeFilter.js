import React, { useState, Fragment, useEffect } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";

const ThemeFilter = (props) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  useEffect(() => {
    props?.setFilterTheme(checkedInputs);
  }, [checkedInputs]);

  const [theme, setTheme] = useState([
    "전체",
    "도시",
    "공원",
    "트랙",
    "강변",
    "해변",
    "산",
  ]);

  const choiceTheme = (e, idx) => {
    if (e.target.checked) {
      setCheckedInputs([...checkedInputs, e]);
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
        러닝 테마
      </Text>

      {theme.map((e, idx) => {
        return (
          <Fragment key={idx}>
            <Label
              onChange={(e) => {
                choiceTheme(e, idx);
                console.log(e);
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

export default ThemeFilter;
