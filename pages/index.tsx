import React, { useEffect, useState } from 'react';
import SearchInput from '../components/atoms/inputSearch';
import Home from '../components/module/home';
import { calculateDistance } from '../utils/searchCity';
import { fetchCities } from '../services/cities';

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

const Index: React.FC = () => {

  return (
    <div>
      
      <Home />
    </div>
  );
};

export default Index;
