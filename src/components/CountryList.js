import React, { useState, useEffect } from "react";
import { getRandomCountries } from "../API/getRandomCountries";
import { v4 as uuidv4 } from 'uuid';
import CountryNeighbors from "./CountryNeighbors";
import { NUM_COUNTRIES } from "../utils/helpers";

function CountryList() {
  const [tenRandomCountriesData, setTenRandomCountriesData] = useState([]);

  async function fetchRandom() {
    const { data, error } = await getRandomCountries();
    if (error) return;

    let tenCountries = [];
    while (tenCountries.length <= NUM_COUNTRIES) {
      const selected = data[Math.floor(Math.random() * data.length)];
      tenCountries.push(selected);
    }
    setTenRandomCountriesData(tenCountries);
  }

  useEffect(() => {
    fetchRandom();
    return () => fetchRandom();
  }, []);

  const noData = <p>No Countries data found</p>;
  return (
    <div>
      {!tenRandomCountriesData
        ? noData
        : tenRandomCountriesData.map((country) => (
          <p key={uuidv4()}>{country.name}</p>
          ))}

      <h2>Neighboors</h2>

      {!tenRandomCountriesData
        ? noData
        : tenRandomCountriesData.map((country) => (
            <CountryNeighbors key={uuidv4()} country={country.name} listofTen={tenRandomCountriesData} />
          ))}
    </div>
  );
}

export default CountryList;
