import React from "react";

const Forecast = ({ data, lang }) => {
  // বাংলা ও ইংরেজি অনুবাদ টেক্সট
  const t = {
    forecastTitle: lang === "bn" ? "📅 ৭ দিনের পূর্বাভাস" : "📅 7-Day Forecast",
    temp: lang === "bn" ? "তাপমাত্রা" : "Temp",
    unit: "°C",
  };

  // তারিখ বাংলায় দেখানোর ফাংশন (optional enhancement)
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return lang === "bn"
      ? date.toLocaleDateString("bn-BD", { weekday: "long", month: "long", day: "numeric" })
      : date.toDateString();
  };

  return (
    <div className="forecast-container">
      <h2>{t.forecastTitle}</h2>
      <div className="forecast-grid">
        {data.slice(0, 7).map((item, index) => (
          <div key={index} className="forecast-card">
            <p>{formatDate(item.dt_txt)}</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <p>{item.weather[0].main}</p>
            <p>🌡 {t.temp}: {item.main.temp}{t.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
