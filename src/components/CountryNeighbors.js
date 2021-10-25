import React, { useState, useEffect } from "react";
import { getNeighbors } from "../API/getNeighbors";
import { v4 as uuidv4 } from 'uuid';

function CountryNeighbors({ country, listofTen }) {
  const [neighborsData, setNeighborsData] = useState();

  useEffect(() => {
    async function fetchNeighbor() {
      const { data, error } = await getNeighbors(country);
      if (error) return;
      const neighboors = data.neighbors.map((nextCity) => nextCity.name);

      let newNeighbors = [];
      listofTen.forEach(({ name }) => {
        const idx = neighboors.indexOf(name);
        if (idx > -1) {
          newNeighbors.push(`${country} is neigbor of ${name}`);
        }
      });
      setNeighborsData(newNeighbors);
    }
    fetchNeighbor();
  }, [country, listofTen]);

  return (
    <div>
      {neighborsData && neighborsData.map((item) => <p key={uuidv4()}>{item}</p>)}
    </div>
  );
}

export default CountryNeighbors;
