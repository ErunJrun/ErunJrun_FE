import React, { useState, Fragment, useEffect } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const DistanceFilter = (props) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  useEffect(() => {
    props?.setFilterDistance(checkedInputs);
  }, [checkedInputs]);

  const [distance, setDistance] = useState([
    "전체",
    "5km 미만",
    "5km 이상 10km 미만",
    "10km 이상 15km 미만",
    "15km 이상",
  ]);

  const choiceDistance = (e, idx) => {
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
        러닝 거리
      </Text>

      {distance.map((e, idx) => {
        return (
          <Fragment key={idx}>
            <Label
              onChange={(e) => {
                choiceDistance(e, idx);
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

export default DistanceFilter;
