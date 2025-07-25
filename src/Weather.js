import React from "react";

const Weather = ({ data, lang }) => {
  // টেক্সট ট্রান্সলেশন object
  const t = {
    location: lang === "bn" ? "অবস্থান" : "Location",
    condition: lang === "bn" ? "আবহাওয়া" : "Condition",
    temperature: lang === "bn" ? "তাপমাত্রা" : "Temp",
    humidity: lang === "bn" ? "আর্দ্রতা" : "Humidity",
    wind: lang === "bn" ? "বাতাস" : "Wind",
    unitTemp: "°C",
    unitWind: "m/s",
  };

  return (
    <div className="weather-box">
      <h2>
        {data.name}, {data.sys.country}
      </h2>
      <h3>
        {t.condition}: {data.weather[0].main}
      </h3>
      <img
        src={`.png`}
        alt="weather-icon"
      />
      <p>🌡 {t.temperature}: {data.main.temp}{t.unitTemp}</p>
      <p>💧 {t.humidity}: {data.main.humidity}%</p>
      <p>🌬 {t.wind}: {data.wind.speed} {t.unitWind}</p>
    </div>
  );
};

export default Weather;
