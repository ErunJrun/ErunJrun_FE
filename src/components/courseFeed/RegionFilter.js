import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";
import { getCourseDB, resetCourse } from "../../redux/modules/course";

//css, library, package
import styled from "styled-components";

//elements
import { Grid, Text } from "../../elements";

const RegionFilter = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const regionId = params.region;

  const [regionTag, setRegionTag] = useState([
    "전국",
    "서울특별시",
    "경기도",
    "인천광역시",
    "강원도",
    "충청도 / 세종특별자치시 / 대전광역시",
    "경상북도 / 대구광역시",
    "경상남도 / 부산광역시 / 울산광역시",
    "전라도 / 광주광역시",
    "제주특별자치도",
  ]);
  const [checkedRegion, setCheckedRegion] = useState("전국");

  const choiceRegion = (e) => {
    setCheckedRegion(e);
  };

  return (
    <>
      <Grid
        width="1200px"
        height="152px"
        border="1px solid #B8B8B8"
        bg="white"
        borderRadius="3px"
        display="flex"
        padding="32px 48px"
      >
        {regionTag.map((e, idx) => {
          return (
            <Fragment key={idx}>
              <Label>
                <input
                  onChange={() => {
                    choiceRegion(e, idx);
                    history.push(`/coursefeed/${idx}`);
                    dispatch(getCourseDB(idx, "new", 1, 6));
                  }}
                  type="radio"
                  name="runType"
                  value={e}
                  checked={checkedRegion === e ? e : ""}
                ></input>
                <Text>{e}</Text>
              </Label>
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
};

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    font-weight: 500;
    color: #7b7b7b;
    margin: 0 8.75px;
    width: auto;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 24px;
    border-radius: 80px;
    cursor: pointer;
    box-sizing: border-box;
    background: #f0f0f0;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #000;
  }
`;

export default RegionFilter;
