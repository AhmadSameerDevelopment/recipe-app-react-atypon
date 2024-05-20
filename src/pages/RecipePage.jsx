import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetails } from '../services/api';
import { Container, Card, CardContent, Typography, CircularProgress, Grid, List, ListItem, ListItemText } from '@mui/material';
import './RecipePage.css';

const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        const fetchRecipe = async () => {
            try {
                const response = await getRecipeDetails(id);
                console.log('API Response:', response);
                setRecipe(response);
            } catch (error) {
                console.error(error);
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
            <Container className="loading-container">
                <Grid container justifyContent="center" alignItems="center" className="loading-grid">
                    <CircularProgress aria-label="Loading" />
                </Grid>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="error-container">
                <Typography variant="h6" color="error" role="alert">{error}</Typography>
            </Container>
        );
    }

    if (recipe) {
        const renderIngredientDetails = (ingredient) => {
            const { amount, unit, name, image } = ingredient;
            const imageUrl = `https://spoonacular.com/cdn/ingredients_100x100/${image}`;

            return (
                <ListItem key={name}>
                    <img src={imageUrl} alt={name} className="ingredient-image" />
                    <ListItemText primary={`${amount} ${unit} ${name}`} />
                </ListItem>
            );
        };

        return (
            <Container>
                <Card className="recipe-card">
                    <div className="image-container">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="recipe-image"
                            aria-label={`Image of ${recipe.title}`}
                        />
                    </div>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {recipe.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className="recipe-summary"
                            dangerouslySetInnerHTML={{ __html: recipe.summary }}
                            aria-label="Recipe summary"
                        />
                        <List>
                            {recipe.extendedIngredients.map(renderIngredientDetails)}
                        </List>
                        <Typography variant="h6">Instructions</Typography>
                        <Typography variant="body1" component="div" aria-label="Recipe instructions">
                            <ul>
                                {recipe.analyzedInstructions[0].steps.map((step, index) => (
                                    <li key={index}>{step.step}</li>
                                ))}
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    return null;
};

export default RecipePage;
