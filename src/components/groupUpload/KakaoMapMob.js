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
import { useDispatch, useSelector } from "react-redux";
import {
  addDistance,
  addPaths,
  resetMap,
} from "../../redux/modules/uploadInfo";
import swal from "sweetalert";

const KakaoMapMob = () => {
  const { kakao } = window;

  const dispatch = useDispatch();
  const [rightState, setRightState] = useState(false);

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

  console.log(paths, mousePosition, clickLine);

  //서버에 보내줄 최종 거리(km)

  const totalDistance = (distances[distances.length - 1] / 1000).toFixed(2);

  // const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);

  const [map, setMap] = useState();
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
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
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });

    setDistances((prev) => [
      ...prev,
      Math.round(clickLine.getLength() + moveLine.getLength()),
    ]);
    setIsdrawing(true);
    setRightState(false);
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
        // swal("검색된 장소가 없습니다", "", "warning");
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
      <Grid width="375px" margin="24px auto 56px auto">
        <Grid width="343px" display="flex" margin="0 auto 16px auto">
          <LocationInput
            type="text"
            onChange={onChange}
            placeholder="장소를 검색하여 코스를 지정하세요."
            value={inputText}
            onKeyPress={handleSubmit}
          />
          <SearchLocationBtn onClick={handleSubmit}>검색하기</SearchLocationBtn>
        </Grid>

        <Grid width="375px">
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="58px"
            margin="24px 0 0 0"
            bg="#7b7b7b"
            padding="5px 27px"
          >
            <Text size="11px" color="white">
              지도위를 터치해 경로를 설정한 후, ‘경로완성’을 눌러
              마무리해주세요. <br></br>다시 지도를 그리고 싶은 경우, 지도위에
              새로 설정해주시면 됩니다.
            </Text>
          </Grid>
          <Map // 지도를 표시할 Container
            id={`map`}
            center={{
              // 지도의 중심좌표
              lat: 37.498004414546934,
              lng: 127.02770621963765,
            }}
            style={{
              // 지도의 크기
              width: "375px",
              height: "320px",
            }}
            level={3} // 지도의 확대 레벨
            onClick={handleClick}
            onRightClick={handleRightClick}
            // onMouseMove={handleMouseMove}
            onCreate={setMap}
          >
            <Polyline
              path={paths}
              strokeWeight={5} // 선의 두께입니다
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
              strokeWeight={3} // 선의 두께입니다
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
                  onClick={() => setInfo(marker)}
                >
                  {info && info.content === marker.content && (
                    <div style={{ color: "#000" }}>{marker.content}</div>
                  )}
                </MapMarker>
              ))} */}
          </Map>
          {rightState ? (
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="13px"
              width="343px"
              height="44px"
              margin="16px auto 0 auto"
              borderRadius="39px"
              bg="#F0F0F0"
            >
              <Text size="14px" margin="0">
                경로종료
              </Text>
            </Grid>
          ) : (
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="13px"
              width="343px"
              height="44px"
              margin="16px auto 0 auto"
              borderRadius="39px"
              bg="#68f99e"
              _onClick={() => {
                handleRightClick();
                setRightState(!rightState);
              }}
            >
              <Text
                _onClick={() => {
                  handleRightClick();
                  setRightState(!rightState);
                }}
                size="14px"
                margin="0"
              >
                경로종료
              </Text>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const LocationInput = styled.input`
  width: 273px;
  height: 44px;
  box-sizing: border-box;
  border: 1px solid #b8b8b8;
  border-radius: 3px 0 0 3px;
  padding: 10px 0px 10px 32px;
  margin: 0;
  outline: none;
  font-weight: 400;
  font-size: 13px;
  color: black;
  :focus {
    border: 1px solid #68f99e;
  }
  ::placeholder {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-size: 13px;
    font-weight: 400;
    color: #7b7b7b;
  }
`;

const SearchLocationBtn = styled.button`
  font-family: "Spoqa Han Sans Neo";
  padding: 5px;
  width: 70px;
  height: 44px;
  background: #030c37;
  border-radius: 0px 3px 3px 0px;
  color: white;
  font-weight: 500;
  font-size: 13px;
  box-sizing: border-box;
  margin: 0;
  border: none;
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

export default KakaoMapMob;
