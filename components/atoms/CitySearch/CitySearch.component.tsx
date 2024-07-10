import React, { useState } from "react";
import useCitySearch from "../../../hooks/useCitySearch";
import { City } from "./CitySearch.model";
import cities from "../../../public/cities.json";
import CityList from "../CityList";
import { calculateDistance } from "../../../utils/searchCity";
import { mapCities } from "../../../hooks/convert";
import styles from "./CitySearch.module.css"; // Importa los estilos CSS módulo

const CitySearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const { suggestions, searchCities } = useCitySearch(query);
  const [nearCities, setNearCities] = useState<City[] | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    searchCities(e.target.value);
  };

  const findNearestCities = (selectedCity: City, cities: City[]): City[] => {
    const distances = cities.map((city) => ({
      city,
      distance: calculateDistance(selectedCity, city),
    }));

    return distances
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4)
      .map((item) => item.city);
  };

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    const nearestCities = findNearestCities(city, mapCities(cities));
    setNearCities(nearestCities);
  };

  return (
    <div>
      <input
        className={styles["city-search-input"]} 
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a city"
      />
      <div className={styles["city-search-results"]}> 
        <CityList cities={suggestions} onSelectCity={handleSelectCity} />
      </div>
      {selectedCity && (
        <div>
          <h2>Selected City: {selectedCity.name}</h2>
          {nearCities.map((city) => (
            <h2 key={city.id}>
              {" "}
              {city.name} ({city.lat}, {city.lng})
            </h2>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
