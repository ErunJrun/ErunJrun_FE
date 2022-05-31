import React, { Fragment } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useMediaQuery } from "react-responsive";

const AlarmComment = (props) => {
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
                댓글등록
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
              cursor="pointer"
              _onClick={() => {
                history.push(`/groupdetail/${props?.groupId}`);
                props.onClose();
              }}
              height="auto"
              display="flex"
              justifyContent="left"
            >
              {props.category === "comment" ? (
                <Text
                  regular
                  textLeft
                  size="10px"
                  hover="font-weight:900;"
                  cursor="pointer"
                  margin="0"
                  _onClick={() => {
                    history.push(`/groupdetail/${props?.groupId}`);
                    props.onClose();
                  }}
                >
                  <span style={{ color: "#000", fontWeight: "700" }}>
                    {props?.groupTitle}
                  </span>
                  {"   "}
                  게시물에 댓글이 달렸습니다.
                </Text>
              ) : (
                <Text
                  _onClick={() => {
                    history.push(`/groupdetail/${props?.groupId}`);
                    props.onClose();
                  }}
                  regular
                  textLeft
                  size="10px"
                  hover="font-weight:900;"
                  cursor="pointer"
                  margin="0"
                >
                  <span style={{ color: "#000", fontWeight: "700" }}>
                    {props?.groupTitle}
                  </span>{" "}
                  의{"   "}
                  <span style={{ color: "#000", fontWeight: "400" }}>
                    {props?.commentContent}
                  </span>
                  {"   "}
                  댓글에 답글이 달렸습니다.
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
        <Grid margin="0" display="flex" width="315px">
          <Grid
            display="flex"
            alignItems="center"
            height="auto"
            margin="0 0 10px 0"
            justifyContent="flex-start"
          >
            <Text bold margin="0 8px 0 0" size="14px" display="inline">
              댓글등록
            </Text>
            <Text bold margin="0" size="12px" color="#828282" display="inline">
              {props?.createdAt}
            </Text>
            {!props?.check ? <NewDot /> : null}
          </Grid>

          <Grid
            cursor="pointer"
            _onClick={() => {
              history.push(`/groupdetail/${props?.groupId}`);
              props.onClose();
            }}
            height="auto"
            display="flex"
            justifyContent="left"
            margin="0"
          >
            {props.category === "comment" ? (
              <Text
                regular
                textLeft
                hover="font-weight:900;"
                cursor="pointer"
                margin="0"
              >
                <span style={{ color: "#000", fontWeight: "700" }}>
                  {props?.groupTitle}
                </span>
                {"   "}
                게시물에 댓글이 달렸습니다.
              </Text>
            ) : (
              <Text
                regular
                textLeft
                hover="font-weight:900;"
                cursor="pointer"
                margin="0"
              >
                <span style={{ color: "#000", fontWeight: "700" }}>
                  {props?.groupTitle}
                </span>{" "}
                의{"   "}
                <span style={{ color: "#000", fontWeight: "400" }}>
                  {props?.commentContent}
                </span>
                {"   "}
                댓글에 답글이 달렸습니다.
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
export default AlarmComment;
