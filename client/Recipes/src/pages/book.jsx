import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/scss/_book.scss';
import BackToMenuBtn from '../Components/btns/backTuMenuBtn';
import Img5 from '../images/img/5.jpg';
import Img6 from '../images/img/6.jpg';
import Img7 from '../images/img/7.jpg';
import Img8 from '../images/img/8.jpg';
import AddRecipeModal from '../Components/AddRecipeModal';

const Book = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/recipe`, {
          params: {
            bookID: id,
            limit: 10,
            page: currentPage
          }
        });

        setRecipes(response.data.rows);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [id, currentPage]);

  const handleAddRecipe = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5001/api/recipe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setRecipes([...recipes, response.data]);
        setShowAddModal(false);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error adding recipe:', error.response ? error.response.data : error.message);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="main">
        <BackToMenuBtn />
        <div className="home-conteiner">
          <div className="img-block">
            <img src={Img5} alt="" className="img-block-img" />
            <img src={Img6} alt="" className="img-block-img" />
          </div>
          <div className="book-page-block">
            <div className="book-page">
              <div className="book-open">
                <div className="book-left">
                  <p className="book-text">
                    Пориньте у світ кулінарного натхнення з нашою книгою домашніх рецептів, створеною для того, щоб стати вашим надійним помічником на кухні. Ця книга може стати для Вас не просто зібрання рецептів, а справжня скарбниця смаків і ароматів, яка подарує вам нескінченні можливості для кулінарних експериментів і задоволень.
                  </p>
                  <button className="add-recipe-btn" onClick={() => setShowAddModal(true)}>Додати рецепт</button>
                </div>
                <div className="book-right">
                  <ol className="recipe-list">
                    {recipes.map((recipe) => (
                      <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-link">
                        <li className="book-recipe">{recipe.name}</li>
                      </Link>
                    ))}
                  </ol>
                  
                  <div className="pagination-controls">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='pagination-btns'>Назад</button>
                    <span className='pagination-caunt'>Сторінка {currentPage} з {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='pagination-btns'>Вперед</button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="img-block">
            <img src={Img7} alt="" className="img-block-img" />
            <img src={Img8} alt="" className="img-block-img" />
          </div>
        </div>
      </div>

      <AddRecipeModal show={showAddModal} onClose={() => setShowAddModal(false)} onSave={handleAddRecipe} bookID={id} />
    </>
  );
};

export default Book;
