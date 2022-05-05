import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ConstructionOutlined } from "@mui/icons-material";

import "./Weather.css"

const Weather = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState("");
  const [icon, setIcon] = useState("");
  const [feelsLike, setFeelsLike] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const apiKey = process.env.REACT_APP_API_KEY;

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";

  const fetchWeather = async () => {
    try {
      window.navigator.geolocation.getCurrentPosition(savePositionToState);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      setTemperature(res.data.main.temp);
      setCityName(res.data.name);
      setIcon(res.data.weather[0].icon);
      setWeather(res.data.weather[0].main);
      setFeelsLike(res.data.main.feels_like);
      setTempMax(res.data.main.temp_max);
      setTempMin(res.data.main.temp_min);
      setHumidity(res.data.main.humidity);
      //console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  return (
    <Box>
      <div>{cityName}</div>
      <img src={iconURL} />
      <div>{temperature}°C</div>
      <div>{weather}</div>
      <div>체감: {feelsLike}°C</div>
      <div>최고: {tempMax}°C</div>
      <div>최저: {tempMin}°C</div>
      <div>습도: {humidity}%</div>
    </Box>
  );
};

const Box = styled.div`
  padding: 5%;
  border: 1px solid #000000;
  margin-left: 30px;
  width: 20vw;
  height: 13vh;
`;

export default Weather;
