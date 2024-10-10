import React from 'react';
import axios from 'axios';

const DeleteRecipeButton = ({ recipeId, onDeleteSuccess }) => {
    const handleDelete = async () => {
        const isConfirmed = window.confirm('Ви впевнені, що хочете видалити цей рецепт?');

        if (!isConfirmed) {
            return; 
        }

        try {
            await axios.delete(`http://localhost:5001/api/recipe/${recipeId}`);
            alert('Рецепт успішно вилучено.');
            if (onDeleteSuccess) onDeleteSuccess(); 
        } catch (error) {
            console.error('Помилка при видаленні рецепту:', error);
            alert('Не вдалося вилучити рецепт.');
        }
    };

    return (
        <button onClick={handleDelete} className="delete-recipe-btn">Видалити рецепт</button>
    );
};

export default DeleteRecipeButton;
