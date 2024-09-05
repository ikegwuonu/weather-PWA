import React, { useState } from 'react';
import './App.css';
import { fetchWeather } from './api/FetchWeather';

const App = () => {
  const [query, setQuery] = useState("");
  const [fetchWe, setFetchWe] = useState({});

  const search = async (e) => {
    e.preventDefault();
    const data = await fetchWeather(query);
    setFetchWe(data);
    console.log(data);
    setQuery("");
  };

  return (
    <div className='main-container'>
      <form onSubmit={search}>
        <input
          type="text"
          className='search'
          placeholder='Search...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>

      {fetchWe.main && (
        <div className='city'>
          <h2 className='city-name'>
            <span>{fetchWe.name}</span>
            <sup>{fetchWe.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(fetchWe.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className='city-icon'
              src={`http://openweathermap.org/img/wn/${fetchWe.weather[0].icon}@2x.png`}
              alt={fetchWe.weather[0].description}
            />
            <p>{fetchWe.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
