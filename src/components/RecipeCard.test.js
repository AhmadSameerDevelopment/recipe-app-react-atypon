import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeCard from './RecipeCard';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const recipe = {
  id: 1,
  title: 'Test Recipe',
  image: 'test-image.jpg',
};

describe('RecipeCard', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders RecipeCard with provided recipe data', () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>
    );

    // Check if the card displays the correct title and image
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test recipe/i })).toHaveAttribute('src', 'test-image.jpg');
  });

  test('navigates to the correct recipe details page on click', () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>
    );

    const card = screen.getByRole('button', { name: /view details for test recipe/i });
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/recipe/1', { state: expect.any(Object) });
  });
});
