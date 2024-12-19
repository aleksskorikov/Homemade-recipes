import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Foto from '../images/img/th.jpg';
import '../styles/scss/_recipe.scss';
import BackToMenuBtn from '../Components/btns/backTuMenuBtn';
import ToMainBtn from '../Components/btns/toMainBtn.jsx';
import DeleteRecipeButton from '../Components/btns/DeleteRecipeButton.jsx';
import RecipeModal from '../Components/RecipeModal.jsx';

const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


useEffect(() => {
  const fetchRecipe = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:4444/recipe/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      const data = response.data;
      const ingredientsBlock1 = Array.isArray(data.ingredientsBlock1) ? data.ingredientsBlock1 : JSON.parse(data.ingredientsBlock1 || '[]');
      const ingredientsBlock2 = Array.isArray(data.ingredientsBlock2) ? data.ingredientsBlock2 : JSON.parse(data.ingredientsBlock2 || '[]');

      setRecipe({
        ...data,
        ingredientsBlock1,
        ingredientsBlock2,
      });

    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  fetchRecipe();
}, [id]);

    
  const handleDeleteSuccess = () => {
    navigate(-1);
  };


  const handleSaveRecipe = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:4444/recipe/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`, 
            },
        });
        setShowEditModal(false);
        const response = await axios.get(`http://localhost:4444/recipe/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
        });
      setRecipe(response.data);

    } catch (error) {
        console.error('Помилка при збереженні рецепту:', error);
    }
};


  if (!recipe) return <p>Завантаження...</p>;

  return (
    <>
      <div className="recipe__btns-block">
        <BackToMenuBtn />
        <ToMainBtn />
      </div>
      
      <div className="conteiner">
        <div className="recipe">
          <h1 className="recipe-title">{recipe.name}</h1>
          <div className="recipe-image">
            <img
              src={recipe.imgUrl? `http://localhost:4444${recipe.imgUrl}` : Foto}
              alt={recipe.name}
              className="recipe-img"
            />
          </div>
          <div className="recipe-description">
            <h2 className='recipe-subtitles'>Інгридієнти</h2>
            {recipe.block1Title && recipe.ingredientsBlock1.length > 0 && (
              <>
                <h2 className='recipe-subtitle'>{recipe.block1Title}</h2>
                <ul className='recipe-subtitle-lists'>
                  {recipe.ingredientsBlock1.map((item, index) => (
                    <li key={`block1-${index}`} className='recipe-subtitle-list'>{item}</li>
                  ))}

                </ul>
              </>
            )}

            {recipe.block2Title && recipe.ingredientsBlock2.length > 0 && (
              <>
                <h2 className='recipe-subtitle'>{recipe.block2Title}</h2>
                <ul className='recipe-subtitle-lists'>
                  {recipe.ingredientsBlock2.map((item, index) => (
                    <li key={`block2-${index}`} className='recipe-subtitle-list'>{item}</li>
                  ))}
                </ul>
              </>
            )}

            <h2 className='recipe-subtitles'>Інструкція</h2>
            <p className='recipe-subtitle-text'>{recipe.description}</p>
          </div>

          <div className="recipe__btns-block">
            <DeleteRecipeButton recipeId={id} onDeleteSuccess={handleDeleteSuccess} />
            <button onClick={() => setShowEditModal(true)} className="edit-recipe-button">змінити рецепт</button>
          </div>

        </div>
      </div>
      <RecipeModal show={showEditModal} onClose={() => setShowEditModal(false)} onSave={handleSaveRecipe} bookID={String(recipe.bookID)} initialData={recipe}/>
    </>
  );
};

export default Recipe;






