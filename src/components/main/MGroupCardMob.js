import React, { Fragment, useEffect } from "react";
import { Text, Grid, Image, IconButton } from "../../elements";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { applyGroupDB, getGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import shoesYellow from "../../assets/groupFeed/shoesYellow.png";
import Permit from "../../shared/Permit";

const MGroupCardMob = (props) => {
  return (
    <>
      <Grid width="156px" margin="0">
        <Grid
          width="156px"
          height="auto"
          display="flex"
          flexDirection="column"
          cursor="pointer"
        >
          <Image
            _onClick={() => {
              history.push(`/groupdetail/${props.groupId}`);
            }}
            shape="imgBtn"
            width="156px"
            height="117px"
            src={props?.thumbnailUrl}
            borderRadius="3px"
          ></Image>

          {props.applyEndTime === "0 일" ? (
            <ApplyFinish>
              <Grid display="flex" alignItems="center" margin="0" width="auto">
                <Text color="white" bold size="8px" margin="0 5px 0 0">
                  모집기한종료
                </Text>
              </Grid>
            </ApplyFinish>
          ) : (
            <ApplyEnd>
              <Grid
                cursor="pointer"
                display="flex"
                alignItems="center"
                margin="0"
                width="auto"
                height="auto"
              >
                <Text width="auto" height="auto" size="8px" margin="0">
                  모집기한
                </Text>
              </Grid>
              <Text width="auto" bold size="8px">
                약 {props?.applyEndTime} 후 마감
              </Text>
            </ApplyEnd>
          )}

          <Grid display="flex" flexDirection="column" height="auto">
            <Text
              hiddenText
              width="156px"
              height="auto"
              cursor="pointer"
              size="11px"
              bold
              margin="0"
              textLeft
            >
              {props?.title}
            </Text>
            <Text
              textLeft
              height="auto"
              cursor="pointer"
              size="10px"
              margin="10px 0 0 0"
            >
              {props?.date}
            </Text>
          </Grid>

          <Grid height="auto" cursor="pointer" display="flex">
            <Tag>{props?.location}</Tag>
            <Tag>{props?.distance}km</Tag>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const ApplyEnd = styled.div`
  width: 156px;
  height: 18px;
  margin: 8px 0 8px 0;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  background-color: #68f99e;
`;

const ApplyFinish = styled.div`
  width: 156px;
  height: 18px;
  margin: 16px 0 15px 0;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  background-color: gray;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 8px;
  height: 10px;
  background-color: #ddd;
  margin: 8px 12px 0 0;
  padding: 1px 10px;
  border-radius: 2px;
  :hover {
    background-color: #68f99e;
    box-shadow: 0 0 3px gray;
  }
`;

const ShoesImg = styled.img`
  width: 11.62px;
  height: auto;
  margin-right: 8px;
`;

export default MGroupCardMob;
