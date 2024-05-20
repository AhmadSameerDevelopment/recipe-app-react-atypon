import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, searchResults }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        navigate(`/recipe/${recipe.id}`, { state: { searchResults } });
    };

    return (
        <Card onClick={handleClick} style={{ cursor: 'pointer' }} role="button" tabIndex="0" aria-pressed="false" aria-label={`View details for ${recipe.title}`}>
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
            </CardContent>
        </Card>
    );
};

export default RecipeCard;
