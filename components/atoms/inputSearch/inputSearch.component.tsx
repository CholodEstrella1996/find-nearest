import React, { useState, useEffect } from "react";
import styles from "./inputSearch.module.css"; 

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

interface Props {
  cities: City[];
  onSelectCity: (city: City) => void;
}

export const SearchInput: React.FC<Props> = ({ cities, onSelectCity }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);

  useEffect(() => {
    if (query.trim() !== "") {
      const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  }, [query, cities]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelect = (city: City) => {
    onSelectCity(city);
    setSuggestions([]); // Cierra las sugerencias después de seleccionar una ciudad
  };

  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Find a city"
        className={styles["search-input"]}
      />
      {suggestions.length > 0 && (
        <ul className={styles["suggestions-list"]}>
          {suggestions.map((city, index) => (
            <li
              key={city.name + index}
              className={styles["suggestions-item"]}
              onClick={() => handleSelect(city)}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
