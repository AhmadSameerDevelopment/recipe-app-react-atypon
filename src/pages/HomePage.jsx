import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { searchRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const HomePage = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const [searchQuery, setSearchQuery] = useState(query.get("query") || "");
  const [cuisine, setCuisine] = useState(query.get("cuisine") || "");
  const [diet, setDiet] = useState(query.get("diet") || "");
  const [intolerances, setIntolerances] = useState(query.get("intolerances") || "");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.get("query") || query.get("cuisine") || query.get("diet") || query.get("intolerances")) {
      handleSearch(true);
    } 
  }, []);

  const handleSearch = async (initial = false) => {
    if (!initial) {
      navigate(`/?query=${searchQuery}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}`);
    }

    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const data = await searchRecipes(searchQuery, cuisine, diet, intolerances);
      setRecipes(data); // Set the recipes fetched from your backend
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred while fetching recipes. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !loading) {
      // Search on Enter if not already loading
      handleSearch();
    }
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`, {
      state: { searchQuery, cuisine, diet, intolerances, recipes },
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Recipe Search
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search by Keyword"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Search by Keyword"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Cuisine"
            variant="outlined"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Cuisine"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Diet"
            variant="outlined"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Diet"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Intolerances"
            variant="outlined"
            value={intolerances}
            onChange={(e) => setIntolerances(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Intolerances"
          />
        </Grid>
      </Grid>

      <Box mt={2} display="flex" justifyContent="flex-start">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearch()}
          disabled={loading}
          aria-label="Search Recipes"
        >
          Search
        </Button>
      </Box>

      {/* Error Display */}
      {error && (
        <Typography variant="body1" color="error" mt={2} role="alert">
          {error}
        </Typography>
      )}

      {/* Loading Spinner */}
      {loading && (
        <Box mt={2} display="flex" justifyContent="center" aria-live="polite">
          <CircularProgress aria-label="Loading" />
        </Box>
      )}

      {/* Recipe Cards */}
      <Grid container spacing={2} mt={2}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe)}
              aria-label={`View details for ${recipe.title}`}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
