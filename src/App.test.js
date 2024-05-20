import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./pages/HomePage', () => () => <div>Mocked Home Page</div>);
jest.mock('./pages/RecipePage', () => () => <div>Mocked Recipe Page</div>);

test('renders HomePage and RecipePage routes', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Check if the mocked HomePage is rendered
  expect(screen.getByText('Mocked Home Page')).toBeInTheDocument();
  
  render(
    <MemoryRouter initialEntries={['/recipe/1']}>
      <App />
    </MemoryRouter>
  );
  // Check if the mocked RecipePage is rendered
  expect(screen.getByText('Mocked Recipe Page')).toBeInTheDocument();
});
