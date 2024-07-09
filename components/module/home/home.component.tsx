import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { calculateDistance } from "../../../utils/searchCity";
import { fetchCities } from "../../../services/cities";
import SearchInput from "../../atoms/inputSearch";

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

interface Props {
  nearestCities: City[];
}

export const Home: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [nearestCities, setNearestCities] = useState<City[]>([]);

  useEffect(() => {
    const getCities = async () => {
      const cities = await fetchCities();
      setCities(cities);
    };
    getCities();
  }, []);

  const findNearestCities = (selectedCity: City) => {
    console.log("selectedCity :>> ", selectedCity);
    const distances = cities
      .filter((city) => city.name !== selectedCity.name)
      .map((city) => ({
        city,
        distance: calculateDistance(selectedCity, city),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map((item) => item.city);

    setNearestCities(distances);
  };

  return (
    <div>
      <SearchInput cities={cities} onSelectCity={findNearestCities} />
      <div className={styles["city-list-container"]}>
        <h3 className={styles["city-list-header"]}>Cercanos:</h3>
        <ul className={styles["city-list"]}>
          {nearestCities.map((city) => (
            <li key={city.name} className={styles["city-list-item"]}>
              {city.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
