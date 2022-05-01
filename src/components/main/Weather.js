import React ,{useEffect, useState} from "react";
import { FetchWeather } from "../components/FetchWeather";
import styled from "styled-components";

const Weather = () => {
  const [newWeather, setNewWeather] = useState({});

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = async(e)=> {
      if(e.key === "Enter") {
          const data = await FetchWeather(query)
          setWeather(data);
          setQuery('');
      }
  }
 
  
  const geoWeather = (() => {
    navigator.geolocation.getCurrentPosition
    (position => {
        const lat = position.coords.latitude
        const lon =  position.coords.longitude

        console.log(lat, lon);

        const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2f894af6872d7ac3beffd36c159b3b4b&units=metric`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.name, data.weather[0].main)
            setNewWeather(data.name, data.weather[0].main)
        });
        
    })
  });
  console.log(geoWeather());
  useEffect(()=>{
    geoWeather()
  },[])


  return (
    <div>

      <div>
      <input 
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress ={search}
        />
        <div>
          {geoWeather()}
          
        </div>
        
        
        {weather.main &&(
            <Box>
                <div>
                <p>{weather.coord.dt_txt}</p>
                <span>{weather.name}</span>
                <sup>{weather.sys.country}</sup>
                </div>
                <div>
                    {Math.round(weather.main.temp)}
                    <sup>&deg;C</sup>
                </div>
                <div>
                    
                    <img src={'https://openweathermap.org/img/wn/${weathers.icon}@2x.png'}
                    alt={weather.weather[0].description}/>
                    {/* <p>{weather.weather[0].description}</p> */}
                    <p>체감온도: {weather.main.feels_like}°C</p>
                    <p>최고온도: {weather.main.temp_max}°C</p>
                    <p>최저온도: {weather.main.temp_min}°C</p>
                    {/* <p>기압: {weather.main.pressure}</p> */}
                    <p>습도: {weather.main.humidity}%</p>   
                </div>
                
            </Box>
            
        )}
      </div>
      
    </div>
  );
};

const Box = styled.div`
  display: flex;
  padding: 5%;
  border: 1px solid;
`;

export default Weather;