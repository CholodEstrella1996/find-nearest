import React from 'react';
import { render, screen } from '@testing-library/react';
import CitySearch from './CitySearch.component';

// Mock the necessary modules and hooks
jest.mock('../../../hooks/useCitySearch', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    suggestions: [{ id: 1, name: 'City A', lat: 0, lng: 0 }],
    searchCities: jest.fn(),
  })),
}));

jest.mock('../../../utils/searchCity', () => ({
  calculateDistance: jest.fn(() => Math.random() * 100),
}));

jest.mock('../../../hooks/convert', () => ({
  mapCities: jest.fn(() => [{ id: 1, name: 'City A', lat: 0, lng: 0 }]),
}));

describe('CitySearch', () => {
  it('renders input and city list', async () => {
    render(<CitySearch />);

    expect(screen.getByPlaceholderText('Search for a city')).toBeInTheDocument();

    // Encontrar elementos específicos dentro de la lista de ciudades
    const cityElement = screen.getByText(/City A \(0, 0\)/i);

    // Verificar que el elemento encontrado está presente
    expect(cityElement).toBeInTheDocument();
  });
});
