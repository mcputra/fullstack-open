import { useEffect, useState } from "react";
import openWeatherMap from "../services/openWeatherMap";

const Country = ({ country }) => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    openWeatherMap
      .getWeather(
        country.capitalInfo.latlng[0],
        country.capitalInfo.latlng[1],
        api_key
      )
      .then((returnedData) => {
        setWeatherData(returnedData);
      });
  }, [country.capitalInfo, api_key]);

  const celciusTemp = weatherData?.main?.temp - 273.15;

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h2>Weather in {country.capital}</h2>
      {weatherData && (
        <>
          <p>Temperature {celciusTemp.toFixed(2)} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
            alt={weatherData?.weather?.description}
          />
          <p>Wind {weatherData.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default Country;
