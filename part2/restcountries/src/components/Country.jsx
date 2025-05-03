import { useEffect, useState } from "react";
import countryService from "../services/country";

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const [weatherIconUrl, setWeatherIconUrl] = useState(null);

  useEffect(() => {
    countryService
      .getWeather({
        lat: country.capitalInfo.latlng[0],
        lon: country.capitalInfo.latlng[1],
        apiKey: import.meta.env.VITE_SOME_KEY,
      })
      .then((response) => {
        setWeather(response.data);
        setWeatherIconUrl(
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
        console.log(weather);
      });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        Capital{" "}
        {country.capital && country.capital.length > 0
          ? country.capital.join(", ")
          : "unknown"}
      </p>
      <p>Area {country.area}</p>
      <h1>Languages</h1>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h1>Weather in {country.capital}</h1>
      {!weather.main ? (
        <p>Temperature unknown</p>
      ) : (
        <p>Temperature {weather.main.temp - 273.15} celcius</p>
      )}
      <img
        src={!weather.weather ? null : weatherIconUrl}
        alt={!weather.weather ? "Weather icon" : weather.weather[0].description}
      />
    </div>
  );
};

export default Country;
