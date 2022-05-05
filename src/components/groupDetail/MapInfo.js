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
  const { kakao } = window;

  const detailGroup = useSelector((state) => state.feed.detail);

  const [isdrawing, setIsdrawing] = useState(false);
  const [clickLine, setClickLine] = useState();
  const [paths, setPaths] = useState([]);
  const [distances, setDistances] = useState([]);
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [moveLine, setMoveLine] = useState();

  // //서버에 보내줄 최종 거리(km)
  // const totalDistance = distances[distances.length - 1] / 100;

  // const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   // e.preventDefault();
  //   setPlace(inputText);
  //   setInputText("");
  // };

  // console.log(paths, distances);

  // const handleClick = (_map, mouseEvent) => {
  //   if (!isdrawing) {
  //     setDistances([]);
  //     setPaths([]);
  //   }
  //   setPaths((prev) => [
  //     ...prev,
  //     {
  //       lat: mouseEvent.latLng.getLat(),
  //       lng: mouseEvent.latLng.getLng(),
  //     },
  //   ]);
  //   setDistances((prev) => [
  //     ...prev,
  //     Math.round(clickLine.getLength() + moveLine.getLength()),
  //   ]);
  //   setIsdrawing(true);
  // };

  // const handleMouseMove = (_map, mouseEvent) => {
  //   setMousePosition({
  //     lat: mouseEvent.latLng.getLat(),
  //     lng: mouseEvent.latLng.getLng(),
  //   });
  // };

  // const handleRightClick = (_map, _mouseEvent) => {
  //   setIsdrawing(false);
  // };

  //장소 검색
  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });

          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [place]);

  const DistanceInfo = ({ distance }) => {
    const walkkTime = (distance / 67) | 0;
    const bycicleTime = (distance / 227) | 0;

    return (
      <Final className="dotOverlay distanceInfo">
        <li>
          <span className="label">총거리</span>{" "}
          <span className="number">{distance / 100}</span>km
        </li>
        <li>
          <span className="label">도보</span>{" "}
          {walkkTime > 60 && (
            <>
              <span className="number">{Math.floor(walkkTime / 60)}</span> 시간{" "}
            </>
          )}
          <span className="number">{walkkTime % 60}</span> 분
        </li>
        <li>
          <span className="label">자전거</span>{" "}
          {bycicleTime > 60 && (
            <>
              <span className="number">{Math.floor(bycicleTime / 60)}</span>{" "}
              시간{" "}
            </>
          )}
          <span className="number">{bycicleTime % 60}</span> 분
        </li>
      </Final>
    );
  };

  return (
    <>
      <Grid margin="30px auto">
        <Grid height="auto" padding="5px">
          <Grid>
            <Map // 지도를 표시할 Container
              id={`map`}
              center={{
                // 지도의 중심좌표
                lat: 37.498004414546934,
                lng: 127.02770621963765,
              }}
              style={{
                // 지도의 크기
                width: "800px",
                height: "450px",
              }}
              level={3} // 지도의 확대 레벨
              // onClick={handleClick}
              // onRightClick={handleRightClick}
              // onMouseMove={handleMouseMove}
              onCreate={setMap}
            >
              <Polyline
                path={[
                  { lat: 37.49877039333591, lng: 127.02717499015112 },
                  { lat: 37.49814012761434, lng: 127.02519574252022 },
                ]}
                strokeWeight={8} // 선의 두께입니다
                strokeColor={"#db4040"} // 선의 색깔입니다
                strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle={"solid"} // 선의 스타일입니다
                onCreate={setClickLine}
              />
              {paths.map((path) => (
                <CustomOverlayMap
                  key={`dot-${path.lat},${path.lng}`}
                  position={path}
                  zIndex={1}
                >
                  <span className="dot"></span>
                </CustomOverlayMap>
              ))}
              {paths.length > 1 &&
                distances.slice(1, distances.length).map((distance, index) => (
                  <CustomOverlayMap
                    key={`distance-${paths[index + 1].lat},${
                      paths[index + 1].lng
                    }`}
                    position={paths[index + 1]}
                    yAnchor={1}
                    zIndex={2}
                  >
                    {/* {!isdrawing && distances.length === index + 2 ? (
                      <DistanceInfo distance={distance} />
                    ) : (
                      <div className="dotOverlay">
                        <span className="number"></span>
                      </div>
                    )} */}
                  </CustomOverlayMap>
                ))}
            </Map>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const Final = styled.div`
  border: 1px solid black;
  background-color: white;
  /* opacity: 0.5; */
  padding: 20px;
  li {
    list-style: none;
  }
  border-radius: 5px;
`;

const SearchLoctionBtn = styled.button`
  width: 184px;
  height: 40px;
  background: #cecece;
  border: 1px solid #4e4e4e;
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  align-items: center;
  color: #000000;
  display: flex;
  justify-content: center;
  margin: 0 20px;
`;

const StepBtn = styled.button`
  width: 184px;
  height: 40px;
  background: #cecece;
  border: 1px solid #4e4e4e;
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  align-items: center;
  color: #000000;
  margin: 10px 10px;
`;

export default MapInfo;
