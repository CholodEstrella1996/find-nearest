
interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export const calculateDistance = (city1: City, city2: City) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (city2.latitude - city1.latitude) * (Math.PI / 180);
    const dLon = (city2.longitude - city1.longitude) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(city1.latitude * (Math.PI / 180)) *
      Math.cos(city2.latitude * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
