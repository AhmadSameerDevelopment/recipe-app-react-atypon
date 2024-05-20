import axios from 'axios';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

export const searchRecipes = async (query, cuisine, diet, intolerances) => {
  const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
    params: { query, cuisine, diet, intolerances, apiKey: API_KEY }
  });
  return response.data.results;
};

export const getRecipeDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
    params: { apiKey: API_KEY }
  });
  return response.data;
};
