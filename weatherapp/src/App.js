import React, { useState, useEffect } from "react";
import City from "./components/city";
import Details from "./components/details";
import Forecast from "./components/forecast";
import axios from 'axios';
import "./App.css";

const App = () => {
  const [value, setValue] = useState([])
  const [current, setCurrent] = useState([])
  const [number, setNumber] = useState(0) 
  useEffect(() => {
    console.log("Эффект дышит.")

    const asyncFunc = async () => {
      const res = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=54.1838&lon=45.1749&exclude=minutely,hourly,alerts&appid=72f802fb940dfed3c0bd79b7d8cd21e9&units=metric&lang=ru')
      setValue(formatForecastWeather(res.data))
      setCurrent(formatCurrentWeather(res.data))
    }

    const formatForecastWeather = (data) => {
      const {
        daily
      } = data

      return daily
    }

    const formatCurrentWeather = (data) => {
      const {
        current
      } = data
      return current
    }

    asyncFunc()
  }, [])

  const handleCallback = (childData) => {
    setNumber(childData)
  }

  return (
    <div>
      <City data={current} />
      <Details data={value[number]} />
      <div className="daily-frame">
        <div className="daily">
          По дням
        </div>
      </div>
      <div className="forecast">
        <Forecast data={value[0]} day={0} parentCallback={handleCallback} />
        <Forecast data={value[1]} day={1} parentCallback={handleCallback}/>
        <Forecast data={value[2]} day={2} parentCallback={handleCallback}/>
        <Forecast data={value[3]} day={3} parentCallback={handleCallback}/>
        <Forecast data={value[4]} day={4} parentCallback={handleCallback}/>
        <Forecast data={value[5]} day={5} parentCallback={handleCallback}/>
        <Forecast data={value[6]} day={6} parentCallback={handleCallback}/>
      </div>

    </div>
  )
}

export default App;
