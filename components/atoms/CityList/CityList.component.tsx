import React from 'react';
import { City } from './CityList.model';
import CityItem from '../CityItem';
import styles from './CityList.module.css'; // Importa los estilos CSS módulo

interface CityListProps {
  cities: City[];
  onSelectCity: (city: City) => void;
}

const CityList: React.FC<CityListProps> = ({ cities, onSelectCity }) => {
  return (
    <ul className={styles['city-list']}>
      {cities.map((city) => (
        <li key={city.id} className={styles['city-list-item']}>
          <CityItem city={city} onSelect={onSelectCity} />
        </li>
      ))}
    </ul>
  );
};

export default CityList;

