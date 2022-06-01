import React, { Fragment } from "react";

//Redux
import { history } from "../../redux/configureStore";

//css, library, package
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

//elements
import { Grid, Text } from "../../elements";

const AlarmStart = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  if (isMobile) {
    if (props.category === "start") {
      return (
        <Fragment>
          <Grid
            margin="0 0 16px 0"
            height="auto"
            display="flex"
            alignItems="flex-start"
          >
            <Grid margin="0" display="flex" width="315px">
              <Grid
                display="flex"
                alignItems="center"
                height="auto"
                margin="0 0 5px 0"
                justifyContent="flex-start"
              >
                <Text bold margin="0 8px 0 0" size="9px" display="inline">
                  그룹 러닝
                </Text>
                <Text
                  bold
                  margin="0 4px 0 0"
                  size="8px"
                  color="#828282"
                  display="inline"
                >
                  {props?.createdAt}
                </Text>
                {!props?.check ? <NewDotMob /> : <NoneDotMob />}
              </Grid>
              <Grid
                _onClick={() => {
                  history.push(`/groupdetail/${props?.groupId}`);
                  props.onClose();
                }}
                height="auto"
                display="flex"
              >
                {props.role === "host" ? (
                  <Text
                    regular
                    textLeft
                    size="10px"
                    cursor="pointer"
                    hover="font-weight:900;"
                    margin="0"
                  >
                    <span style={{ color: "#FF2D55", fontWeight: "700" }}>
                      30분 뒤{" "}
                    </span>
                    <span style={{ color: "#000", fontWeight: "700" }}>
                      {props?.groupTitle}
                    </span>{" "}
                    그룹 러닝이 시작합니다. 출석체크를 해주세요.
                  </Text>
                ) : (
                  <Text
                    regular
                    size="10px"
                    textLeft
                    cursor="pointer"
                    hover="font-weight:900;"
                    margin="0"
                  >
                    <span style={{ color: "#FF2D55", fontWeight: "700" }}>
                      30분 뒤{" "}
                    </span>
                    <span style={{ color: "#000", fontWeight: "700" }}>
                      {props?.groupTitle}
                    </span>{" "}
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
            margin="0 0 16px 0"
            height="auto"
            display="flex"
            alignItems="flex-start"
          >
            <Grid margin="0" display="flex" width="315px">
              <Grid
                display="flex"
                alignItems="center"
                height="auto"
                margin="0 0 5px 0"
                justifyContent="flex-start"
              >
                <Text bold margin="0 8px 0 0" size="9px" display="inline">
                  그룹 러닝
                </Text>
                <Text
                  bold
                  margin="0 4px 0 0"
                  size="8px"
                  color="#828282"
                  display="inline"
                >
                  {props?.createdAt}
                </Text>
                {!props?.check ? <NewDotMob /> : <NoneDotMob />}
              </Grid>
              <Grid
                _onClick={() => {
                  history.push(`/groupdetail/${props?.groupId}`);
                  props.onClose();
                }}
                height="auto"
                display="flex"
              >
                {props.role === "host" ? (
                  <Text
                    regular
                    size="10px"
                    textLeft
                    cursor="pointer"
                    hover="font-weight:900;"
                    margin="0"
                  >
                    <span style={{ color: "#000", fontWeight: "700" }}>
                      {props?.groupTitle}
                    </span>
                    은 어떠셨나요? 당신은 멋진 크루장입니다!
                  </Text>
                ) : (
                  <Text
                    regular
                    size="10px"
                    textLeft
                    cursor="pointer"
                    hover="font-weight:900;"
                    margin="0"
                  >
                    <span style={{ color: "#000", fontWeight: "700" }}>
                      {props?.groupTitle}
                    </span>{" "}
                    은 어떠셨나요? 크루장평가를 해주세요
                  </Text>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Fragment>
      );
    }

    if (props.category === "Dday") {
      return (
        <Fragment>
          <Grid
            margin="0 0 16px 0"
            height="auto"
            display="flex"
            alignItems="flex-start"
          >
            <Grid margin="0" display="flex" width="315px">
              <Grid
                display="flex"
                alignItems="center"
                height="auto"
                margin="0 0 5px 0"
                justifyContent="flex-start"
              >
                <Text bold margin="0 8px 0 0" size="9px" display="inline">
                  그룹 러닝
                </Text>
                <Text
                  bold
                  margin="0 4px 0 0"
                  size="8px"
                  color="#828282"
                  display="inline"
                >
                  {props?.createdAt}
                </Text>
                {!props?.check ? <NewDotMob /> : <NoneDotMob />}
              </Grid>
              <Grid
                _onClick={() => {
                  history.push(`/groupdetail/${props?.groupId}`);
                  props.onClose();
                }}
                height="auto"
                display="flex"
              >
                <Text
                  regular
                  size="10px"
                  textLeft
                  cursor="pointer"
                  hover="font-weight:900;"
                  margin="0"
                >
                  오늘은 이RUN 저RUN{" "}
                  <span style={{ color: "#000", fontWeight: "700" }}>
                    {props?.groupTitle}
                  </span>
                  그룹 러닝이 있습니다.
                </Text>
              </Grid>
            </Grid>
          </Grid>
        </Fragment>
      );
    }
  }

  if (props.category === "start") {
    return (
      <Fragment>
        <Grid
          cursor="pointer"
          margin="0 0 16px 0"
          height="auto"
          display="flex"
          alignItems="flex-start"
          justifyContent="left"
        >
          <Grid margin="0" display="flex" width="315px">
            <Grid
              display="flex"
              alignItems="center"
              height="auto"
              margin="0 0 10px 0"
            >
              <Text bold margin="0 8px 0 0" size="14px" display="inline">
                그룹 러닝
              </Text>
              <Text
                bold
                margin="0"
                size="12px"
                color="#828282"
                display="inline"
              >
                {props?.createdAt}
              </Text>
              {!props?.check === true ? <NewDot /> : null}
            </Grid>
            <Grid
              _onClick={() => {
                history.push(`/groupdetail/${props?.groupId}`);
                props.onClose();
              }}
              height="auto"
              display="flex"
            >
              {props.role === "host" ? (
                <Text
                  regular
                  textLeft
                  cursor="pointer"
                  hover="font-weight:900;"
                  margin="0"
                >
                  <span style={{ color: "#FF2D55", fontWeight: "700" }}>
                    30분 뒤{" "}
                  </span>
                  <span style={{ color: "#000", fontWeight: "700" }}>
                    {props?.groupTitle}
                  </span>{" "}
                  그룹 러닝이 시작합니다. 출석체크를 해주세요.
                </Text>
              ) : (
                <Text
                  regular
                  textLeft
                  cursor="pointer"
                  hover="font-weight:900;"
                  margin="0"
                >
                  <span style={{ color: "#FF2D55", fontWeight: "700" }}>
                    30분 뒤{" "}
                  </span>
                  <span style={{ color: "#000", fontWeight: "700" }}>
                    {props?.groupTitle}
                  </span>{" "}
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
          margin="0 0 32px 0"
          height="auto"
          display="flex"
          alignItems="flex-start"
        >
          <Grid margin="0" display="flex" width="315px">
            <Grid
              display="flex"
              alignItems="center"
              height="auto"
              margin="0 0 10px 0"
            >
              <Text bold margin="0 8px 0 0" size="14px" display="inline">
                그룹 러닝
              </Text>
              <Text
                bold
                margin="0"
                size="12px"
                color="#828282"
                display="inline"
              >
                {props?.createdAt}
              </Text>
              {!props?.check ? <NewDot /> : <NoneDot />}
            </Grid>
            <Grid
              _onClick={() => {
                history.push(`/groupdetail/${props?.groupId}`);
                props.onClose();
              }}
              height="auto"
              display="flex"
            >
              {props.role === "host" ? (
                <Text
                  regular
                  textLeft
                  cursor="pointer"
                  hover="font-weight:900;"
                  margin="0"
                >
                  <span style={{ color: "#000", fontWeight: "700" }}>
                    {props?.groupTitle}
                  </span>
                  은 어떠셨나요? 당신은 멋진 크루장입니다!
                </Text>
              ) : (
                <Text
                  regular
                  textLeft
                  cursor="pointer"
                  hover="font-weight:900;"
                  margin="0"
                >
                  <span style={{ color: "#000", fontWeight: "700" }}>
                    {props?.groupTitle}
                  </span>{" "}
                  은 어떠셨나요? 크루장평가를 해주세요
                </Text>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  if (props.category === "Dday") {
    return (
      <Fragment>
        <Grid
          cursor="pointer"
          margin="0 0 32px 0"
          height="auto"
          display="flex"
          alignItems="flex-start"
        >
          <Grid margin="0" display="flex" width="315px">
            <Grid
              display="flex"
              alignItems="center"
              height="auto"
              margin="0 0 10px 0"
            >
              <Text bold margin="0 8px 0 0" size="14px" display="inline">
                그룹 러닝
              </Text>
              <Text
                bold
                margin="0"
                size="12px"
                color="#828282"
                display="inline"
              >
                {props?.createdAt}
              </Text>
              {!props?.check === true ? <NewDot /> : null}
            </Grid>
            <Grid
              _onClick={() => {
                history.push(`/groupdetail/${props?.groupId}`);
                props.onClose();
              }}
              height="auto"
              display="flex"
            >
              <Text
                regular
                textLeft
                cursor="pointer"
                hover="font-weight:900;"
                margin="0"
              >
                오늘은 이RUN 저RUN{" "}
                <span style={{ color: "#000", fontWeight: "700" }}>
                  {props?.groupTitle}
                </span>
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
  margin: 0 0 0 12px;
`;

const NoneDot = styled.div`
  border-radius: 100%;
  width: 13px;
  height: 13px;
  background-color: white;
  margin: 0 0 0 12px;
`;

const NewDotMob = styled.div`
  border-radius: 500%;
  width: 8px;
  height: 8px;
  background-color: #68f99e;
  margin: 0;
`;

const NoneDotMob = styled.div`
  border-radius: 50%;
  width: 8px;
  height: 8px;
  background-color: white;
  margin: 0;
`;

export default AlarmStart;
