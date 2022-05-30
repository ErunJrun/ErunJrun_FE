import React, { Fragment, useEffect } from "react";
import { Text, Grid, Image, IconButton } from "../../elements";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { applyGroupDB, getGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import shoesYellow from "../../assets/groupFeed/shoesYellow.png";
import Permit from "../../shared/Permit";

const MGroupCard = (props) => {
  return (
    <>
      <Grid width="384px" margin="0 8px 80px 8px">
        <Grid
          _onClick={() => {
            history.push(`/groupdetail/${props.groupId}`);
          }}
          width="100%"
          display="flex"
          flexDirection="column"
          cursor="pointer"
        >
          <CardImage src={props?.thumbnailUrl}></CardImage>

          {props.applyEndTime === "0 일" ? (
            <ApplyFinish>
              <Grid display="flex" alignItems="center" margin="0" width="384px">
                <Text color="" bold size="14px" margin="0 5px 0 0">
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
                <Grid width="22px" margin="0 5px 0 0 ">
                  <ShoesImg src={shoesYellow} />
                </Grid>

                <Text width="auto" height="auto" size="14px" margin="0 5px 0 0">
                  모집기한
                </Text>
              </Grid>
              <Text width="auto" bold size="14px">
                약 {props?.applyEndTime} 후 마감
              </Text>
            </ApplyEnd>
          )}

          <Grid display="flex" flexDirection="column" height="auto">
            <Text
              hiddenText
              width="384px"
              height="auto"
              cursor="pointer"
              size="18px"
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
              size="16px"
              margin="10px 0 0 0"
            >
              {props?.date}
            </Text>
          </Grid>

          <Grid height="auto" cursor="pointer" display="flex">
            <Tag>{props?.location}</Tag>
            <Tag>{props?.distance}km</Tag>
            <Tag>{props?.thema}</Tag>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const CardImage = styled.img`
  width: 384px;
  height: 288px;
  border-radius: 3px;
`;

const ApplyEnd = styled.div`
  width: 384px;
  height: 30px;
  margin: 16px 0 15px 0;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px;
  box-sizing: border-box;
  background-color: #68f99e;
`;

const ApplyFinish = styled.div`
  width: 384px;
  height: 30px;
  margin: 16px 0 15px 0;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  box-sizing: border-box;
  background-color: gray;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  height: 24px;
  background-color: #ddd;
  margin: 20px 12px 0 0;
  padding: 1px 10px;
  border-radius: 2px;
`;

const ShoesImg = styled.img`
  width: 22px;
  height: auto;
  margin-right: 8px;
`;

export default MGroupCard;
