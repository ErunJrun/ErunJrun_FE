import React, { useState, Fragment, useEffect } from "react";

//css, library, package
import styled from "styled-components";

//elements
import { Grid, Text } from "../../elements";

const DistanceFilter = (props) => {
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [allState, setAllState] = useState(false);
  const [distance, setDistance] = useState([
    "5km 미만",
    "5km 이상 10km 미만",
    "10km 이상 15km 미만",
    "15km 이상",
  ]);

  const choiceDistance = (e, idx) => {
    if (e.target.checked) {
      setCheckedInputs([...checkedInputs, idx]);
      setAllState(false);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== idx));
    }
  };

  useEffect(() => {
    props?.setFilterDistance(checkedInputs);
  }, [checkedInputs]);

  useEffect(() => {
    if (props?.reset) {
      setCheckedInputs([]);
      props.setResetState(false);
    }
  }, [props.reset]);

  if (props.isMobile) {
    return (
      <Grid
        display="flex"
        width="295px"
        flexDirection="column"
        justifyContent="left"
        alignItems="center"
        margin="0"
        height="auto"
      >
        <Text width="295px" height="auto" size="14px" bold margin="0 0 12px 0">
          러닝 거리
        </Text>

        <Grid
          height="120px"
          margin="0"
          width="295px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {!allState ? (
            <Grid
              _onClick={() => {
                setCheckedInputs([]);
                setAllState(true);
              }}
              width="142px"
              height="32px"
              padding="8px auto"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="60px"
              border="1px solid #b8b8b8"
              bg="white"
              cursor="pointer"
            >
              <Text
                color="#7b7b7b"
                cursor="pointer"
                margin="0"
                regular
                size="13px"
              >
                전체
              </Text>
            </Grid>
          ) : (
            <Grid
              _onClick={() => {
                setCheckedInputs([]);
                setAllState(false);
              }}
              width="142px"
              height="32px"
              padding="8px auto"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="60px"
              border="1px solid #68f99e"
              bg="#68f99e"
              cursor="pointer"
            >
              <Text
                color="#030c37"
                cursor="pointer"
                margin="0"
                regular
                size="13px"
              >
                전체
              </Text>
            </Grid>
          )}
          {distance.map((e, idx) => {
            return (
              <Fragment key={idx}>
                <LabelMob>
                  <input
                    onChange={(e) => {
                      choiceDistance(e, idx + 1);
                    }}
                    checked={checkedInputs.includes(idx + 1)}
                    type="checkbox"
                    name={e}
                    value={idx + 1 || ""}
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
    <Grid
      display="flex"
      alignItems="center"
      width="100%"
      margin="0 auto 24px auto"
    >
      <Text size="16px" margin="0 34px 0 0">
        러닝 거리
      </Text>

      <Grid width="723px" display="flex" justifyContent="space-between">
        {!allState ? (
          <Grid
            _onClick={() => {
              setCheckedInputs([]);
              setAllState(true);
            }}
            width="auto"
            padding="8px 20px"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            borderRadius="60px"
            border="1px solid #f0f0f0"
            bg="#f0f0f0"
            cursor="pointer"
          >
            <Text cursor="pointer" margin="0" regular size="16px">
              전체
            </Text>
          </Grid>
        ) : (
          <Grid
            _onClick={() => {
              setCheckedInputs([]);
              setAllState(false);
            }}
            width="auto"
            padding="8px 20px"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            borderRadius="60px"
            border="1px solid #030c37"
            bg="#030c37"
            cursor="pointer"
          >
            <Text cursor="pointer" color="#68f99e" margin="0" size="16px">
              전체
            </Text>
          </Grid>
        )}

        {distance.map((e, idx) => {
          return (
            <Fragment key={idx}>
              <Label>
                <input
                  onChange={(e) => {
                    choiceDistance(e, idx + 1);
                  }}
                  checked={checkedInputs.includes(idx + 1)}
                  type="checkbox"
                  name={e}
                  value={idx + 1 || ""}
                />
                <Text margin="0" regular>
                  {e}
                </Text>
              </Label>
            </Fragment>
          );
        })}
      </Grid>
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
  margin: 0;
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

export default DistanceFilter;
