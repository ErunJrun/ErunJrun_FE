import React, { Fragment } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useMediaQuery } from "react-responsive";

const AlarmUpdate = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });
  if (isMobile) {
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
                게시글
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
              {props?.check ? <NewDotMob /> : <NoneDotMob />}
            </Grid>
            <Grid height="auto" display="flex">
              {props.category === "update" ? (
                <Text
                  regular
                  size="10px"
                  textLeft
                  _onClick={() => {
                    props.setAlarmOpen(false);
                  }}
                  hover="font-weight:900;"
                  cursor="pointer"
                  margin="0"
                >
                  <span style={{ color: "#000", fontWeight: "700" }}>
                    {props?.groupTitle}
                  </span>
                  게시물이 수정되었습니다.
                </Text>
              ) : (
                <Text
                  regular
                  size="10px"
                  textLeft
                  _onClick={() => {
                    props.setAlarmOpen(false);
                  }}
                  hover="font-weight:900;"
                  cursor="pointer"
                  margin="0"
                >
                  <span style={{ color: "#000", fontWeight: "700" }}>
                    {props?.groupTitle}
                  </span>
                  게시물이 삭제되었습니다.
                </Text>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Grid
        margin="0 0 32px 0"
        height="auto"
        display="flex"
        alignItems="flex-start"
      >
        {!props?.check ? <NewDot /> : null}

        <Grid margin="0" display="flex" width="315px">
          <Grid
            display="flex"
            alignItems="center"
            height="auto"
            margin="0 0 10px 0"
          >
            <Text bold margin="0 8px 0 0" size="14px" display="inline">
              게시글
            </Text>
            <Text bold margin="0" size="12px" color="#828282" display="inline">
              {props?.createdAt}
            </Text>
          </Grid>
          <Grid margin="0" height="auto" display="flex">
            {props.category === "update" ? (
              <Text
                regular
                textLeft
                _onClick={() => {
                  props.setAlarmOpen(false);
                }}
                hover="font-weight:900;"
                cursor="pointer"
                margin="0"
              >
                <span style={{ color: "#000", fontWeight: "700" }}>
                  {props?.groupTitle}
                </span>
                게시물이 수정되었습니다.
              </Text>
            ) : (
              <Text
                regular
                textLeft
                _onClick={() => {
                  props.setAlarmOpen(false);
                }}
                hover="font-weight:900;"
                cursor="pointer"
                margin="0"
              >
                <span style={{ color: "#000", fontWeight: "700" }}>
                  {props?.groupTitle}
                </span>
                게시물이 삭제되었습니다.
              </Text>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const NewDot = styled.div`
  border-radius: 100%;
  width: 13px;
  height: 13px;
  background-color: #68f99e;
  margin: 4px 12px 1px 0;
`;

const NoneDot = styled.div`
  border-radius: 100%;
  width: 13px;
  height: 13px;
  background-color: white;
  margin: 4px 12px 1px 0;
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

export default AlarmUpdate;
