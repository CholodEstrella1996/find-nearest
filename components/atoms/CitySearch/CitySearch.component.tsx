import React, { useState } from 'react';
import Input from '@mui/joy/Input';
import useCitySearch from '../../../hooks/useCitySearch';
import { City } from './CitySearch.model';
import cities from '../../../public/cities.json';
import CityList from '../CityList';
import { calculateDistance } from '../../../utils/searchCity';
import { mapCities } from '../../../hooks/convert';
import styles from './CitySearch.module.css';
import { Card } from '@mui/joy';

const CitySearch: React.FC = () => {
  const [query, setQuery] = useState('');
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
    <div className={styles.container}>
      <div className={styles.column}>
        <Input
          className={styles['city-search-input']}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city"
        />
        <Card className={styles['city-search-results']}>
          <CityList cities={suggestions} onSelectCity={handleSelectCity} />
        </Card>
      </div>
      {selectedCity && (
        <div className={styles.column}>
          <div className={styles['selected-city']}>
            <h2>Selected City: {selectedCity.name}</h2>
            <div className={styles['nearest-cities']}>
              {nearCities &&
                nearCities.map((city) => (
                  <h3 key={city.id}>
                    {city.name} ({city.lat}, {city.lng})
                  </h3>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
