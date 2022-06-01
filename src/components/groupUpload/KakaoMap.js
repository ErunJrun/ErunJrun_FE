import React, { useRef, useEffect, useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addDistance,
  addPaths,
  resetMap,
} from "../../redux/modules/uploadInfo";

//css, library, package
import swal from "sweetalert";
import styled from "styled-components";
import {
  Map,
  Polyline,
  CustomOverlayMap,
  MapMarker,
} from "react-kakao-maps-sdk";
//Image

//elements
import { Grid, Input, Text } from "../../elements";

//components

//page

function KakaoMap() {
  const { kakao } = window;

  const dispatch = useDispatch();

  const mapInfoList = useSelector((state) => state.uploadInfo);

  const [isdrawing, setIsdrawing] = useState(false);
  const [clickLine, setClickLine] = useState();
  const [paths, setPaths] = useState(mapInfoList?.paths);
  const [distances, setDistances] = useState([]);
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [moveLine, setMoveLine] = useState();

  //서버에 보내줄 최종 거리(km)

  const totalDistance = (distances[distances.length - 1] / 1000).toFixed(2);

  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);

  const [map, setMap] = useState();
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    setPlace(inputText);
  };

  const handleClick = (_map, mouseEvent) => {
    if (!isdrawing) {
      setDistances([]);
      setPaths([]);
      dispatch(resetMap());
    }
    setPaths((prev) => [
      ...prev,
      {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    ]);
    setDistances((prev) => [
      ...prev,
      Math.round(clickLine.getLength() + moveLine.getLength()),
    ]);
    setIsdrawing(true);
  };

  const handleMouseMove = (_map, mouseEvent) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  const handleRightClick = (_map, _mouseEvent) => {
    setIsdrawing(false);
    dispatch(addPaths(paths));
    dispatch(addDistance(totalDistance));
  };

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
      } else {
        swal("검색된 장소가 없습니다", "", "warning");
        setInputText("");
      }
    });
  }, [place]);

  const DistanceInfo = ({ distance }) => {
    const runningTime = (distance / 100) | 0;

    return (
      <Final className="dotOverlay distanceInfo">
        <li>
          <span className="label">총거리</span>{" "}
          <span className="number">{totalDistance}</span>km
        </li>
        <li>
          <span className="label">페이스 : 6'00'km/h</span>{" "}
        </li>
        <li>
          <span>러닝시간 : </span>
          {runningTime > 60 && (
            <>
              <span className="number">{Math.floor(runningTime / 60)}</span>시간
            </>
          )}
          <span className="number">{runningTime % 60}</span>분
        </li>
      </Final>
    );
  };

  return (
    <>
      <Grid margin="30px auto">
        <Grid display="flex" margin="0 0 16px 0">
          <LocationInput
            type="text"
            onChange={onChange}
            placeholder="장소를 검색하여 코스를 지정하세요."
            value={inputText}
            onKeyPress={onCheckEnter}
          />
          <SearchLocationBtn onClick={handleSubmit}>검색하기</SearchLocationBtn>
        </Grid>

        <Grid
          width="865px"
          height="68px"
          bg="#7B7B7B"
          padding="24px"
          margin="32px 0 0 0"
        >
          <Text regular margin="0" color="white">
            왼쪽 클릭을 통해 경로를 설정한 후, 오른쪽 클릭으로 경로를 마무리
            해주세요.
          </Text>
        </Grid>

        <Grid>
          <Map // 지도를 표시할 Container
            id={`map`}
            center={{
              // 지도의 중심좌표
              lat: mapInfoList?.paths[0]
                ? mapInfoList?.paths[0]?.lat
                : 37.498004414546934,
              lng: mapInfoList?.paths[0]
                ? mapInfoList?.paths[0]?.lng
                : 127.02770621963765,
            }}
            style={{
              // 지도의 크기
              width: "865px",
              height: "464px",
            }}
            level={3} // 지도의 확대 레벨
            onClick={handleClick}
            onRightClick={handleRightClick}
            onMouseMove={handleMouseMove}
            onCreate={setMap}
          >
            <Polyline
              path={paths}
              strokeWeight={6} // 선의 두께입니다
              strokeColor={"#686EF9"} // 선의 색깔입니다
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
                  {!isdrawing && distances.length === index + 2 ? (
                    <DistanceInfo distance={distance} />
                  ) : (
                    <div className="dotOverlay">
                      <span className="number"></span>
                    </div>
                  )}
                </CustomOverlayMap>
              ))}
            <Polyline
              path={isdrawing ? [paths[paths.length - 1], mousePosition] : []}
              strokeWeight={6} // 선의 두께입니다
              strokeColor={"#686EF9"} // 선의 색깔입니다
              strokeOpacity={0.5} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
              strokeStyle={"solid"} // 선의 스타일입니다
              onCreate={setMoveLine}
            />
            {isdrawing && (
              <CustomOverlayMap position={mousePosition} yAnchor={1} zIndex={2}>
                <div className="dotOverlay distanceInfo">
                  총거리
                  <span className="number">
                    {totalDistance === "NaN" ? null : totalDistance}
                  </span>
                  km
                </div>
              </CustomOverlayMap>
            )}
            {/* {markers.map((marker) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onMouseOver={() => setInfo(marker)}
              >
                {info && info.content === marker.content && (
                  <Text margin="3px auto" width="152px" textalign>
                    {marker.content}
                  </Text>
                )}
              </MapMarker>
            ))} */}
          </Map>
        </Grid>
      </Grid>
    </>
  );
}

const LocationInput = styled.input`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  font-weight: 500;
  max-width: 694px;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  border: 1px solid #cbcbcb;
  border-radius: 3px;
  padding: 10px 0px 10px 32px;
  margin: 0 32px 0 0;
  :focus {
    border: 1px solid #030c37;
    outline: none;
  }
  ::placeholder {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-size: 16px;
    font-weight: 500;
  }
`;

const SearchLocationBtn = styled.button`
  font-family: "Spoqa Han Sans Neo";
  padding: 10px;
  max-width: 139px;
  width: 100%;
  height: 52px;
  background: #030c37;
  border: 1px solid #030c37;
  border-radius: 3px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  box-sizing: border-box;
  margin: 0;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #030c37;
  }
`;

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

export default KakaoMap;
