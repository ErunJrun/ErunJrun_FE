import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Grid, Text, Image } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.png";

const Appliers = () => {
  const detailGroup = useSelector((state) => state.feed.detail);

  if (!detailGroup.Appliers) {
    return <></>;
  }

  return (
    <>
      <Grid
        id="크루원"
        display="flex"
        margin="0 0 96px 0"
        flexDirection="column"
      >
        <Text bold size="18px" margin="0 0 25px 0">
          크루원 정보
        </Text>

        {detailGroup?.Appliers?.map((e, idx) => {
          return (
            <Fragment key={idx}>
              <Grid
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                alignContent="flex-start"
              >
                <Image
                  imageType="circle"
                  size="64"
                  src={e ? e.profileUrl : { defaultProfile }}
                ></Image>

                <Text size="14px" width="40px" margin="8px 0 0 0" textalign>
                  {e?.nickname}
                </Text>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
};

export default Appliers;
