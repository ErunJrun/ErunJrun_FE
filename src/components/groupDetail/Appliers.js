import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Grid, Text, Image } from "../../elements";

const Appliers = () => {
  const detailGroup = useSelector((state) => state.feed.detail);

  if (!detailGroup.Appliers) {
    return <></>;
  }

  return (
    <>
      <Grid
        display="flex"
        flexDirection="column"
        height="auto"
        margin="10px"
        justifyContent="left"
      >
        <Text bold>모집현황</Text>

        <Grid display="flex" flexDirection="row">
          <Grid width="auto" display="flex" flexDirection="column">
            {detailGroup?.Appliers?.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <Image
                    imageType="circle"
                    size="72"
                    src={e?.profileUrl}
                    margin="0 18px 0 0"
                  ></Image>

                  <Text margin="5px" bold>
                    {e?.nickname}
                  </Text>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Appliers;
