import { useEffect, useState } from "react";
import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((returnedData) => {
      setCountries(returnedData);
    });
  }, []);

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(newSearch.toLowerCase())
      )
    );
  };

  let content = "";

  if (filteredCountries.length === 1) {
    content = filteredCountries.map((country) => (
      <div key={country.name.common}>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    ));
  } else if (filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>;
  } else {
    content = filteredCountries.map((country) => (
      <p key={country.name.common}>{country.name.common}</p>
    ));
  }

  return (
    <div>
      <p>
        find countries <input onChange={handleChange} />
      </p>
      {content}
    </div>
  );
};

export default App;
