import { useState } from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  const [show, setShow] = useState([]);

  const handleShow = (index) => {
    const newShow = [...show];
    newShow[index] = !show[index];
    setShow(newShow);
  };

  return (
    <>
      {/* {countries.map((country) => (
        <>
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleShow(country)}>
              {show ? "hide" : "show"}
            </button>
          </p>
          {console.log(country)}
          {show && <Country country={country} />}
        </>
      ))} */}
      {countries.map((country, index) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShow(index)}>
            {show[index] ? "hide" : "show"}
          </button>
          {show[index] && <Country country={country} />}
        </div>
      ))}
    </>
  );
};

export default Countries;
