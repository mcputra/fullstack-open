import { useEffect, useState } from "react";
import countryService from "./services/country";
import Filter from "./components/Filter";
import Country from "./components/Country";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState("");

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response.data);
      console.log(response.data);
      // response.data.map((country, index) =>
      //   console.log(index, country.languages)
      // );
    });
  }, []);

  const handleCountryChange = (event) => {
    setFilteredCountry(event.target.value);
  };

  const filterResult = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filteredCountry.toLowerCase())
  );

  const renderCountry = () => {
    if (filterResult.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (filterResult.length <= 10 && filterResult.length > 1) {
      return <Countries countries={filterResult} />;
    } else if (filterResult.length === 1) {
      return <Country country={filterResult[0]} />;
    }
  };

  return (
    <>
      <Filter filter={filteredCountry} onFilterChange={handleCountryChange} />
      {renderCountry()}
    </>
  );
};

export default App;
