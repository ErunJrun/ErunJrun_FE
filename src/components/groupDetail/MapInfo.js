import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Map,
  Polyline,
  CustomOverlayMap,
  MapMarker,
} from "react-kakao-maps-sdk";
import { Grid, Input, Text } from "../../elements";
import { history } from "../../redux/configureStore";
import { useSelector } from "react-redux";

function MapInfo(props) {
  const detailGroup = useSelector((state) => state.feed.detail);

  const [map, setMap] = useState();

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
            level={4}
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
