import { City } from '../components/atoms/CitySearch/CitySearch.model';

export const calculateDistance = (city1: City, city2: City): number => {
  const toRadians = (degree: number) => degree * (Math.PI / 180);
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRadians(city2.lat - city1.lat);
  const dLon = toRadians(city2.lng - city1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(city1.lat)) * Math.cos(toRadians(city2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};
