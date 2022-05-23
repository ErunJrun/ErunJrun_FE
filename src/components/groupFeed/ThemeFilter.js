import React, { useState, Fragment, useEffect } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";

const ThemeFilter = (props) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  useEffect(() => {
    props?.setFilterTheme(checkedInputs);
  }, [checkedInputs]);

  useEffect(() => {
    if (props?.reset) {
      setCheckedInputs([]);
    }
  }, [props.reset]);

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
      setCheckedInputs([...checkedInputs, theme[idx]]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== theme[idx]));
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
        margin="32px 0 0 0"
        height="auto"
      >
        <Text width="295px" height="auto" size="14px" bold margin="0 0 12px 0">
          러닝 테마
        </Text>

        <Grid
          height="120px"
          margin="0"
          width="295px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {theme.map((e, idx) => {
            return (
              <Fragment key={idx}>
                <LabelMob>
                  <input
                    onChange={(e) => {
                      choiceTheme(e, idx);
                    }}
                    checked={checkedInputs.includes(e)}
                    type="checkbox"
                    name={e}
                    value={e || ""}
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
        러닝 테마
      </Text>

      {theme.map((e, idx) => {
        return (
          <Fragment key={idx}>
            <Label
              onChange={(e) => {
                choiceTheme(e, idx);
              }}
              checked={checkedInputs.includes(idx)}
            >
              <input type="checkbox" name={e} value={idx || ""} />
              <Text>{e}</Text>
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
  margin: 0 12px 0 0;
`;

const LabelMob = styled.label`
  input {
    display: none;
  }
  input + p {
    width: 91px;
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
export default ThemeFilter;
