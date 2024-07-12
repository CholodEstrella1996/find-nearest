import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CitySearch from './index';
import { City } from './CitySearch.model';

jest.mock('../../../hooks/useCitySearch.ts', () => ({
  __esModule: true,
  default: () => ({
    suggestions: [
      { id: 1, name: 'City A', country: "US", lat: 1, lng: 1 },
      { id: 2, name: 'City B', country: "US", lat: 2, lng: 2 },
    ],
    searchCities: jest.fn(),
  }),
}));

jest.mock('../../../utils/searchCity', () => ({
  calculateDistance: jest.fn(() => Math.random() * 100),
}));

jest.mock('../../../hooks/convert', () => ({
  mapCities: jest.fn((cities) => cities),
}));

describe('CitySearch', () => {
  it('renders input and city list', () => {
    render(<CitySearch />);

    expect(screen.getByPlaceholderText('Search for a city')).toBeInTheDocument();
    expect(screen.getByText('City A')).toBeInTheDocument();
    expect(screen.getByText('City B')).toBeInTheDocument();
  });

  it('filters city suggestions based on input', () => {
    render(<CitySearch />);

    const input = screen.getByPlaceholderText('Search for a city');
    fireEvent.change(input, { target: { value: 'City A' } });

    expect(screen.getByText('City A')).toBeInTheDocument();
    expect(screen.queryByText('City B')).not.toBeInTheDocument();
  });

  it('displays nearest cities when a city is selected', () => {
    render(<CitySearch />);

    fireEvent.click(screen.getByText('City A'));

    expect(screen.getByText('Selected City: City A')).toBeInTheDocument();
    // Assuming your mock implementation of calculateDistance and mapCities returns valid results
    expect(screen.getAllByText(/City \w+ \(\d+,\s\d+\)/)).toHaveLength(4);
  });

  it('displays all cities when input is empty', () => {
    render(<CitySearch />);

    const input = screen.getByPlaceholderText('Search for a city');
    fireEvent.change(input, { target: { value: '' } });

    expect(screen.getByText('City A')).toBeInTheDocument();
    expect(screen.getByText('City B')).toBeInTheDocument();
  });
});
