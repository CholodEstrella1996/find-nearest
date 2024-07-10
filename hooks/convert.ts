interface City {
    country:string,
    name: string;
    lat: string;
    lng: string;
  }
  

export const mapCities = (data: City[]) => {
  return data.map((item, index) => ({
    id: index + 1,
    name: item.name,
    country: item.country,
    lat: parseFloat(item.lat),   // Convertir latitud de string a number
    lng: parseFloat(item.lng),  // Convertir longitud de string a number
  }));
};
