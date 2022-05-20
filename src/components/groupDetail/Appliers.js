import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Grid, Text, Image } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.png";
import { history } from "../../redux/configureStore";
import { useMediaQuery } from "react-responsive";

const Appliers = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const detailGroup = useSelector((state) => state.feed.detail);

  if (!detailGroup.Appliers) {
    return <></>;
  }

  if (isMobile) {
    return (
      <>
        <Grid display="flex" margin="0 0 100px 0" flexDirection="column">
          <Text bold size="13px" margin="0 0 20px 0">
            크루원 정보
          </Text>

          <Grid display="flex" width="340px">
            {detailGroup?.Appliers?.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <Grid
                    cursor="pointer"
                    width="auto"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    alignContent="flex-start"
                    margin="0 17px 20px 0"
                    _onClick={() => {
                      history.push(`/mypage/${e?.userId}`);
                    }}
                  >
                    <Image
                      imageType="circle"
                      size="64"
                      src={e ? e.profileUrl : { defaultProfile }}
                      border="2px solid #DDDDDD"
                    ></Image>

                    <Text size="12px" width="50px" margin="8px 0 0 0" textalign>
                      {e?.nickname}
                    </Text>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>
      </>
    );
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

        <Grid display="flex">
          {detailGroup?.Appliers?.map((e, idx) => {
            return (
              <Fragment key={idx}>
                <Grid
                  cursor="pointer"
                  width="auto"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  alignContent="flex-start"
                  margin="0 13px 0 0"
                  _onClick={() => {
                    history.push(`/mypage/${e?.userId}`);
                  }}
                >
                  <Image
                    imageType="circle"
                    size="64"
                    src={e ? e.profileUrl : { defaultProfile }}
                    border="1px solid gray"
                  ></Image>

                  <Text size="14px" width="55px" margin="8px 0 0 0" textalign>
                    {e?.nickname}
                  </Text>
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default Appliers;
