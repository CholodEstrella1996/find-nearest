import axios from 'axios';

export const fetchCities = async () => {
  const response = await axios.get('/cities.json');
  return response.data;
};

