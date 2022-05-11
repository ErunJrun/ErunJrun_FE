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
          <Map // 지도를 표시할 Container
            id={`map`}
            center={{
              // 지도의 중심좌표
              lat: detailGroup?.mapLatLng[0]?.lat,
              lng: detailGroup?.mapLatLng[0]?.lng,
            }}
            style={{
              // 지도의 크기
              width: "758px",
              height: "406px",
            }}
            level={4} // 지도의 확대 레벨
            onCreate={setMap}
          >
            <Polyline
              path={detailGroup?.mapLatLng}
              strokeWeight={5} // 선의 두께입니다
              strokeColor={"#686EF9"} // 선의 색깔입니다
              strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
              strokeStyle={"solid"} // 선의 스타일입니다
            />
          </Map>
        </Grid>
      </Grid>
    </>
  );
}

export default MapInfo;
