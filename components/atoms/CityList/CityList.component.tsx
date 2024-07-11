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
          <CityItem key={city.id}  city={city} onSelect={onSelectCity} />
      ))}
    </ul>
  );
};

export default CityList;

