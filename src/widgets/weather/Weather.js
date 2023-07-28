import React, { useState, useEffect } from "react";
import { Typography } from "antd";

export default function Weather() {
  const { Text } = Typography;
  const [weatherdata, fetchweather] = useState({});

  const fetchData = async () => {
    const API_KEY = "1b061b79c5539f8cafcbfdf517f257a2";
    const Location = "Rajgurunagar";
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${Location}&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const { name, weather } = data;
    const { temp, temp_min, temp_max } = data.main;
    const { id, main, description, icon } = weather[0];

    fetchweather({
      ...weatherdata,
      name: name,
      temp: Math.trunc(temp),
      min_temp: temp_min,
      max_temp: temp_max,
      id: id,
      icon: icon,
      main: main,
      description: description,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const nowdate = new Date();
  var currentMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    currentDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    month = nowdate.getMonth(),
    date = nowdate.getDate(),
    hour = nowdate.getHours(),
    minutes = nowdate.getMinutes(),
    day = nowdate.getDay(),
    amPM = "";

  if (hour === 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour -= 12;
    amPM = "PM";
  } else {
    amPM = "AM";
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const classname = () => {
    var iconClass = "wi-owm-";

    if (amPM === "PM") {
      iconClass += "night-";
    } else {
      iconClass += "day-";
    }
    return iconClass;
  };

  return (
    <>
      <div className="weather-app">
        <i
          className={`weather-icon wi wi-fw ${classname()}${weatherdata.id}`}
        ></i>
        <div className="date-time">
          <div className="time">
            {hour + ":" + minutes}
            <span>{amPM}</span>
          </div>
          <div className="date">
            <div className="day">{currentDay[day]}</div>
            <div className="monDate">{currentMonth[month] + " " + date}</div>
          </div>
        </div>

        <div className="location-weather">
          <div className="weather-status">
            <div className="city">{weatherdata.name}</div>
            <div className="forcast">{weatherdata.description}</div>
          </div>
          <div className="weather-temp">
            <div className="temperature">{weatherdata.temp}</div>
            <div className="high-low">
              <div className="high">{weatherdata.max_temp}</div>
              <div className="low">{weatherdata.min_temp}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
