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
    <Grid display="flex" alignItems="center" width="100%" margin="0 auto">
      <Text size="16px" bold margin="0 16px 0 0">
        러닝 거리
      </Text>

      {distance.map((e, idx) => {
        return (
          <Fragment key={idx}>
            <Label
              onChange={(e) => {
                choiceDistance(e, idx);
              }}
              checked={checkedInputs.includes(idx)}
            >
              <input type="checkbox" name={e} value={idx} />
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

export default DistanceFilter;