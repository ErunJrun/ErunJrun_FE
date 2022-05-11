import React, { Fragment } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";

const AlarmStart = (props) => {
  if (props.category === "start") {
    return (
      <Fragment>
        <Grid
          cursor="pointer"
          margin="0 0 32px 0"
          height="auto"
          display="flex"
          alignItems="flex-start"
        >
          {!props?.check ? <NewDot /> : null}

          <Grid margin="0" display="flex" width="auto">
            <Grid
              display="flex"
              alignItems="center"
              height="auto"
              margin="0 0 10px 0"
            >
              <Text margin="0 8px 0 0" size="14px" display="inline">
                그룹러닝
              </Text>
              <Text margin="0" size="12px" color="#828282" display="inline">
                {props?.createdAt}
              </Text>
            </Grid>
            <Grid height="auto" display="flex">
              {props.role === "host" ? (
                <Text margin="0">
                  30분 뒤{" "}
                  <span style={{ color: "#FF2D55" }}>{props?.groupTitle}</span>{" "}
                  그룹러닝이 시작합니다. 출석체크를 해주세요.
                </Text>
              ) : (
                <Text margin="0">
                  <span style={{ color: "#FF2D55" }}>{props?.groupTitle}</span>{" "}
                  러닝이 시작합니다.
                </Text>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  if (props.category === "end") {
    return (
      <Fragment>
        <Grid
          cursor="pointer"
          margin="0 0 32px 0"
          height="auto"
          display="flex"
          alignItems="flex-start"
        >
          {!props?.check === true ? <NewDot /> : null}

          <Grid margin="0" display="flex" width="auto">
            <Grid
              display="flex"
              alignItems="center"
              height="auto"
              margin="0 0 10px 0"
            >
              <Text margin="0 8px 0 0" size="14px" display="inline">
                그룹러닝
              </Text>
              <Text margin="0" size="12px" color="#828282" display="inline">
                {props?.createdAt}
              </Text>
            </Grid>
            <Grid height="auto" display="flex">
              {props.role === "host" ? (
                <Text margin="0">
                  <span style={{ color: "#FF2D55" }}>{props?.groupTitle}</span>
                  은 어떠셨나요? 당신은 멋진 크루장입니다!
                </Text>
              ) : (
                <Text margin="0">
                  <span style={{ color: "#FF2D55" }}>{props?.groupTitle}</span>{" "}
                  은 어떠셨나요? 크루장평가를 해주세요
                </Text>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  if (props.category === "dDay") {
    return (
      <Fragment>
        <Grid
          cursor="pointer"
          margin="0 0 32px 0"
          height="auto"
          display="flex"
          alignItems="flex-start"
        >
          {!props?.check === true ? <NewDot /> : null}

          <Grid margin="0" display="flex" width="auto">
            <Grid
              display="flex"
              alignItems="center"
              height="auto"
              margin="0 0 10px 0"
            >
              <Text margin="0 8px 0 0" size="14px" display="inline">
                그룹러닝
              </Text>
              <Text margin="0" size="12px" color="#828282" display="inline">
                {props?.createdAt}
              </Text>
            </Grid>
            <Grid height="auto" display="flex">
              <Text margin="0">
                오늘은 이RUN 저RUN{" "}
                <span style={{ color: "#FF2D55" }}>{props?.groupTitle}</span>
                그룹 러닝이 있습니다.
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
};

const NewDot = styled.div`
  border-radius: 100%;
  width: 13px;
  height: 13px;
  background-color: #68f99e;
  margin: 4px 12px 1px 0;
`;

export default AlarmStart;
