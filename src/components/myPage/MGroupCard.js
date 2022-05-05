import React, { Fragment } from "react";
import { Text, Grid, Image } from "../../elements";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGroupDB } from "../../redux/modules/feed";
import { history } from "../../redux/configureStore";
import Evaluation from "./Evaluation";

const MGroupCard = (props) => {
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feed.list);
  const filterArea = useSelector((state) => state.filter.area);
  const filterTime = useSelector((state) => state.filter.time);
  const filterDistance = useSelector((state) => state.filter.distance);

  const category = [filterArea, filterTime, filterDistance, props.finish];

  React.useEffect(() => {
    dispatch(getGroupDB(category));
  }, []);

  return (
    <>
      {/* <Grid
        margin="38px auto"
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        maxWidth="1395px"
        width="100%"
      >
        {feedList.map((feedList, idx) => {
          return (
            <Fragment key={idx}>
              <Grid
                _onClick={() => {
                  history.push(`/groupdetail/${feedList.groupId}`);
                }}
                margin="66px 17.5px"
                maxWidth="430px"
                width="100%"
                display="flex"
                flexDirection="column"
              >
                <Image
                  shape="imgBtn"
                  height="359px"
                  src={feedList?.thumbnailUrl}
                  borderRadius="6px"
                ></Image>

                <Grid width="430px">
                  <Text size="20px" bold margin="4px 0 0 0">
                    {feedList?.title}
                  </Text>
                  <Text size="16px" margin="4px 0 0 0">
                    {feedList?.date} (소요 시간 : {feedList?.totalTime})
                  </Text>
                  <Text size="16px" margin="4px 0 0 0">
                    신청인원 {feedList?.applyPeople} / {feedList?.maxPeople}
                  </Text>
                  
                </Grid>
              </Grid>
              <Evaluation/>
            </Fragment>
          );
        })}
      </Grid> */}
      <Evaluation/>
    </>
  );
};

const Hr = styled.div`
  border: 1px solid #e5e5e5;
  width: 430px;
  margin: 16px auto;
`;



export default MGroupCard;
