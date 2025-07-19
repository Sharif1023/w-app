import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import Forecast from "./Forecast";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("bn"); // 'bn' or 'en'

  const API_KEY = "3ddef13509fd2fb854c76bd433a9e81e";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCoords({ lat, lon });
        fetchWeatherByCoords(lat, lon);
        fetchForecastByCoords(lat, lon);
      });
    }
  }, [language]);

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${language}&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeatherData(data);
      setCity(data.name);
    } catch (error) {
      console.error("Geo Weather Error:", error);
    }
    setLoading(false);
  };

  const fetchForecastByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${language}&appid=${API_KEY}`
      );
      const data = await res.json();
      setForecastData(filterDailyForecast(data.list));
    } catch (error) {
      console.error("Geo Forecast Error:", error);
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=${language}&appid=${API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        setWeatherData(data);
        setCity(data.name);
      } else {
        setWeatherData(null);
        alert(language === "bn" ? `শহর খুঁজে পাওয়া যায়নি: ${data.message}` : `City not found: ${data.message}`);
      }
    } catch (error) {
      console.error("City Weather Error:", error);
    }
    setLoading(false);
  };

  const fetchForecastByCity = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&lang=${language}&appid=${API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        setForecastData(filterDailyForecast(data.list));
      } else {
        setForecastData([]);
      }
    } catch (error) {
      console.error("City Forecast Error:", error);
    }
  };

  const handleSearch = () => {
    if (!city) return alert(language === "bn" ? "শহরের নাম লিখুন" : "Enter a city name");
    setCoords(null);
    fetchWeatherByCity(city);
    fetchForecastByCity(city);
  };

  const filterDailyForecast = (list) => {
    return list.filter((item) => item.dt_txt.includes("12:00:00"));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "bn" ? "en" : "bn"));
  };

  const t = {
    title: language === "bn" ? "☁️ বর্তমান আবহাওয়া" : "☁️ Current Weather",
    placeholder: language === "bn" ? "🔍 শহরের নাম লিখুন" : "🔍 Enter city name",
    searchBtn: language === "bn" ? "অনুসন্ধান" : "Search",
    darkMode: language === "bn" ? "🌙 ডার্ক মোড" : "🌙 Dark Mode",
    lightMode: language === "bn" ? "☀️ লাইট মোড" : "☀️ Light Mode",
    loading: language === "bn" ? "⏳ লোড হচ্ছে..." : "⏳ Loading...",
    toggleLang: language === "bn" ? "🇺🇸 English" : "🇧🇩 বাংলা"
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className="overlay"></div>

      <h1>{t.title}</h1>

      <div className="top-bar">
        <input
          type="text"
          placeholder={t.placeholder}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>{t.searchBtn}</button>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <button className="toggle-btn" onClick={toggleLanguage}>
          {t.toggleLang}
        </button>
      </div>

      {loading && <p>{t.loading}</p>}
      {weatherData && <Weather data={weatherData} lang={language} />}
      {forecastData.length > 0 && <Forecast data={forecastData} lang={language} />}
    </div>
  );
}

export default App;
