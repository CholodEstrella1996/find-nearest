import React from 'react';
import { City } from './CityItem.model';
import styles from './CityItem.module.css'; 

interface CityItemProps {
  city: City;
  onSelect: (city: City) => void;
}

const CityItem: React.FC<CityItemProps> = ({ city, onSelect }) => {
  return (
    <li className={styles['city-item']} onClick={() => onSelect(city)}>
      {city.name} ({city.lat}, {city.lng})
    </li>
  );
};

export default CityItem;
