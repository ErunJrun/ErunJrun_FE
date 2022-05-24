import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import "./Weather.css";

const Weather = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState("");
  const [icon, setIcon] = useState("");
  const [feelsLike, setFeelsLike] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const apiKey = process.env.REACT_APP_API_KEY;

  const savePositionToState = (position) => {
    setLatitude(position.coords.lat);
    setLongitude(position.coords.lon);
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
    fetchWeather(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <Box>
      {/* <div style={{ height: "220px" }}>날씨</div> */}
      <div className="city">{cityName}</div>
      <div className="weather-box">
        <div className="weather-icon">
          <img src={iconURL} />
        </div>
        <div className="temperature">{temperature}°C</div>
      </div>
      <div className="feels">체감 온도 {feelsLike}°C</div>
      <div className="temp">
        <div>
          최고 <br /> {tempMax}°C
        </div>
        <div>
          최저 <br />
          {tempMin}°C
        </div>
        <div>
          습도 <br /> {humidity}%
        </div>
      </div>
    </Box>
  );
};

const Box = styled.div`
  margin: -30px 0 30px 40px;
  position: absolute;
  left: 65%;
  width: 280px;
  top: 22%;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-item: center;
  padding: 30px 0 15px 0;
`;

export default Weather;
