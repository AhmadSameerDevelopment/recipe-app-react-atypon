import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useLocation } from 'react-router-dom';
import { getRecipeDetails } from '../services/api';
import { Container, Card, CardMedia, CardContent, Typography, CircularProgress, Grid, List, ListItem, ListItemText, Link } from '@mui/material';

const RecipeDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await getRecipeDetails(id);
                console.log('API Response:', response); // Debugging: log the API response
                setRecipe(response);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                if (error.response && error.response.status === 404) {
                    setError('Recipe not found.');
                } else {
                    setError('An error occurred while fetching recipe details.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <Container>
                <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
                    <CircularProgress />
                </Grid>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    if (!recipe || !recipe.id) {
        return (
            <Container>
                <Typography variant="h6" color="error">
                    Recipe not found.
                </Typography>
            </Container>
        );
    }

    const getIngredientCalories = (ingredientName) => {
        const foundIngredient = recipe.extendedIngredients.find(ing => ing.name === ingredientName);
        return foundIngredient ? foundIngredient.totalCalories.toFixed(2) : 'N/A';
    };

    return (
        <Container>
            <Link component={RouterLink} to="/" state={{ searchResults: location.state.searchResults }} underline="hover">
                Back to Home
            </Link>
            <Card>
                <CardMedia
                    component="img"
                    alt={recipe.title}
                    height="140"
                    image={recipe.image}
                    title={recipe.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {recipe.title}
                    </Typography>
                    <Typography variant="h6">Calories: {recipe.totalCalories.toFixed(2)}</Typography>
                    <Typography variant="body1" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                    <Typography variant="h6">Instructions:</Typography>
                    <Typography variant="body2" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

                    <Typography variant="h6">Ingredients:</Typography>
                    <List>
                        {recipe.extendedIngredients.map((ingredient) => (
                            <ListItem key={ingredient.id}>
                                <ListItemText primary={ingredient.originalName} secondary={`Calories: ${getIngredientCalories(ingredient.name)}`} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
};

export default RecipeDetails;
