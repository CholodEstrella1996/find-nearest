import { useState } from 'react';
import cities from '../public/cities.json';
import { City } from '../components/atoms/CitySearch/CitySearch.model';

const useCitySearch = (query: string) => {
  const [suggestions, setSuggestions] = useState<City[]>(cities as unknown as City[]);

  const searchCities = (query: string) => {
    if (query === '') {
      setSuggestions(cities as unknown as City[]);
    } else {
      const filteredCities = (cities as unknown as City[]).filter((city) =>
        city.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredCities);
    }
  };

  return { suggestions, searchCities };
};

export default useCitySearch;
