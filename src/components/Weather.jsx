import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import './Weather.css'

const Weather = () => {
  const [weather,setweather] = useState(false);
  const inputRef = useRef(null);

  const getWeather = async (city)=>{
    console.log(city);
    if(city === " "){
      setweather(false);
      alert("Please Enter City Name");
      return;
    }
    const url = `http://api.weatherapi.com/v1/current.json?key=0cc3c22d678e46b7bf1134443250307&q=${city}`;


    try {
      const response = await fetch(url);

      const data = await response.json();
      console.log(data);

      setweather({
        humidity:data.current.humidity,
        wind:data.current.wind_kph,
        location:data.location.name,
        country:data.location.country,
        condition:data.current.condition.text,
        condition_icon:data.current.condition.icon,
        temperature:data.current.temp_c,
        feels_like:data.current.feelslike_c,
        icons: "https" + data.current.condition.icon,
      });
    } 
    catch (error) {
      console.error(error);
      alert(error);
    }
};

  useEffect(()=>{
    getWeather("Dhaka");
  },[]);


  return (
    <div className='weather'>
        {/* Searchbar */}
        <div className='search-bar'>
          <input ref={inputRef} type='text' placeholder='Search a city'/>
          <img src={search_icon} alt='searching' onClick={()=>getWeather(inputRef.current.value)}/>
        </div>

        {weather?(
          <>
            <img src={weather.condition_icon} alt='condition' className='weather-icon'/>
            <h3 className='temperature'>{weather.temperature}°</h3>
            <h3 className='location'>{weather.location},{weather.country}</h3>
            <h3 className='condition'>{weather.condition}</h3>
            <h3 className='feels-like'>Feels like {weather.feels_like}°</h3>

            <div className='weather-data'>

              <div className='column'>
                <img src={humidity_icon} alt="humidity"/>
                <div>
                  <h3>{weather.humidity}% <span>Humidity</span></h3>
                </div>
              </div>

              <div className='column'>
                <img src={wind_icon} alt="wind"/>
                <div>
                  <h3>{weather.wind} kph <span>Wind Speed</span></h3>
                </div>
              </div>

            </div>
        
          </>):(<h3>Loading....</h3>)
        }
    </div>
  );
}

export default Weather


