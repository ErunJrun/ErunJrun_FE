import React, { useRef, useEffect, useState } from "react";

//Redux
import { useSelector } from "react-redux";

//css, library, package
import {
  Map,
  Polyline,
  CustomOverlayMap,
  MapMarker,
} from "react-kakao-maps-sdk";
import { useMediaQuery } from "react-responsive";

//elements
import { Grid, Input, Text } from "../../elements";

function MapInfo(props) {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const detailGroup = useSelector((state) => state.feed.detail);

  const [map, setMap] = useState();

  if (isMobile) {
    return (
      <>
        <Grid margin="0 0 96px 0">
          <Grid display="flex" padding="10px 16px" border="1px solid #F0F0F0">
            <Grid width="auto" display="flex" margin="0 32px 0 0">
              <Text margin="0 8px 0 0" size="12px" color="#7B7B7B">
                장소
              </Text>
              <Text margin="0" size="12px">
                {detailGroup?.location}
              </Text>
            </Grid>

            <Grid width="auto" display="flex" margin="0">
              <Text margin="0 8px 0 0" size="12px" color="#7B7B7B">
                거리
              </Text>
              <Text margin="0" size="12px">
                {detailGroup?.distance}km
              </Text>
            </Grid>
          </Grid>
          <Grid>
            <Map
              id={`map`}
              center={{
                lat: detailGroup?.mapLatLng[0]?.lat,
                lng: detailGroup?.mapLatLng[0]?.lng,
              }}
              style={{
                width: "343px",
                height: "200px",
              }}
              level={5}
              onCreate={setMap}
            >
              <Polyline
                path={detailGroup?.mapLatLng}
                strokeWeight={5}
                strokeColor={"#686EF9"}
                strokeOpacity={1}
                strokeStyle={"solid"}
              />
            </Map>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid margin="0 0 96px 0">
        <Grid>
          <Map
            id={`map`}
            center={{
              lat: detailGroup?.mapLatLng[0]?.lat,
              lng: detailGroup?.mapLatLng[0]?.lng,
            }}
            style={{
              width: "758px",
              height: "406px",
            }}
            level={7}
            onCreate={setMap}
          >
            <Polyline
              path={detailGroup?.mapLatLng}
              strokeWeight={5}
              strokeColor={"#686EF9"}
              strokeOpacity={1}
              strokeStyle={"solid"}
            />
          </Map>
        </Grid>
      </Grid>
    </>
  );
}

export default MapInfo;
