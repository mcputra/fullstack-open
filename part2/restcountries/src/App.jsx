import { useEffect, useState } from "react";
import Country from "./components/Country";
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

  const handleShow = (name) => {
    setFilteredCountries(
      countries.filter((country) => country.name.common === name)
    );
  };

  let content = "";

  if (filteredCountries.length === 1) {
    content = filteredCountries.map((country) => (
      <Country country={country} key={country.name.common} />
    ));
  } else if (filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>;
  } else {
    content = filteredCountries.map((country) => (
      <p key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleShow(country.name.common)}>Show</button>
      </p>
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
