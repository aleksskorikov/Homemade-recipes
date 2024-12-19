import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/scss/_bookPage.scss';
import { AuthContext } from '../Components/AuthContext.jsx';
import AddRecipeModal from './AddRecipeModal.jsx';
import axios from 'axios';

const BookPage = () => {
    const { id } = useParams();
    const [angleA, setAngleA] = useState('0deg');
    const [angleB, setAngleB] = useState('0deg');
    const [angleC, setAngleC] = useState('0deg');
    const [translate, setTranslate] = useState('50%');
    const [zIndexA, setZIndexA] = useState(10);
    const [zIndexB, setZIndexB] = useState(5);
    const [zIndexC, setZIndexC] = useState(1);
    const { bookTitle, userName, userID } = useContext(AuthContext);
    const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false); 
    const recipesPerPage = 5;
    const bookID = id;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.log('Пользователь не авторизован, запрос рецептов не выполняется');
                    setIsLoaded(true); 
                    return;
                }

                const response = await fetch(`http://localhost:4444/recipe?bookID=${bookID}&userID=${userID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Ошибка при загрузке рецептов');
                }

                const data = await response.json();
                setRecipes(data);
                setIsLoaded(true); 
            } catch (error) {
                console.error('Ошибка:', error.message);
                setIsLoaded(true);
            }
        };

        setRecipes([]);
        setIsLoaded(false);
        fetchRecipes();
    }, [bookID, userID]);

    const updateRecipeList = (newRecipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    };

    const handleAddRecipeClick = () => {
        setShowAddRecipeModal(true);
    };

    const saveRecipe = async (formData) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:4444/recipe', {
                ...formData,
                bookID: bookID,
                userID: userID
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setShowAddRecipeModal(false);
            setRecipes(prevRecipes => [...prevRecipes, response.data]);
        } catch (error) {
            console.error('Помилка:', error.response ? error.response.data : error.message);
            alert('Помилка під час збереження рецепта. Будь ласка, спробуйте ще раз.');
        }
    };

    const pageOrientation = () => {
        return window.innerWidth > window.innerHeight ? '-180deg' : '180deg';
    };

    useEffect(() => {
        const handleResize = () => {
            const angle = pageOrientation();
            setAngleA(angle);
            setAngleB(angle);
            setAngleC(angle);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClickFrontA = () => {
        setAngleA(pageOrientation());
        setTranslate('100%');
    };

    const handleClickBackA = () => {
        setAngleA('0deg');
        setTranslate('50%');
        setZIndexA(10);
    };

    const getRecipesForPage = (page) => {
        const startIndex = page * recipesPerPage;
        const endIndex = startIndex + recipesPerPage;
        return recipes.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="book-container">
            <div className="book">
                <div className="page-container page-a" style={{ transform: `translate(${translate}) rotateY(${angleA})`, zIndex: zIndexA }}>
                    <div className="page front page-a-front" onClick={handleClickFrontA}>
                        <h1>{bookTitle ? bookTitle : 'Mrs. Dalloway'}</h1>
                        <h3>An Excerpt from Chapter One</h3>
                        <h2>by {userName ? userName : 'Virginia Woolf'}</h2>
                    </div>
                    <div className="page back page-a-back" onClick={handleClickBackA}>
                        <p className='page-text'> Пориньте у світ кулінарного натхнення з нашою книгою домашніх рецептів, створеною для того, щоб стати вашим надійним помічником на кухні. Ця книга може стати для Вас не просто зібрання рецептів, а справжня скарбниця смаків і ароматів, яка подарує вам нескінченні можливості для кулінарних експериментів і задоволень.</p>
                        {userName && <button onClick={handleAddRecipeClick} className='addrecipe-btn'>Додати рецепт</button>}
                    </div>
                </div>

                <div className="page-container page-b" style={{ transform: `translate(${translate}) rotateY(${angleB})`, zIndex: zIndexB }}>
                    <div className="page front page-b-front">
                        {isLoaded && getRecipesForPage(currentPage).length > 0 ? ( 
                            <ol className='recipes-lists'>
                                {getRecipesForPage(currentPage).map((recipe) => (
                                    <li key={recipe._id} className='recipes-list'>
                                        <Link to={`/recipe/${recipe._id}`} className='recipes-link'>
                                            {recipe.name}
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        ) : isLoaded ? (
                            <p className='recipes-text-clue'>Для того, щоб побачити свої рецепти необхідно зареєструватися або увійти до свого облікового запису. Або у Вас поки що немає рецептів у цій книзі.</p>
                        ) : (
                            <p>Завантаження рецептов...</p> 
                        )}
                        {userName && <button onClick={handleAddRecipeClick} className='addrecipe-btn btn-adaptiv'>Додати рецепт</button>}
                        <div className="pagination">
                            <button onClick={goToPreviousPage} disabled={currentPage === 0} className='pagination__btn-previous'>
                                Попередня 
                            </button>
                            <span className='pagination__count'>
                                Сторінка {currentPage + 1} з {totalPages}
                            </span>
                            <button onClick={goToNextPage} disabled={currentPage === totalPages - 1} className='pagination__btn-next'>
                                Наступна
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AddRecipeModal
                updateRecipeList={updateRecipeList}
                show={showAddRecipeModal}
                onClose={() => setShowAddRecipeModal(false)}
                onSave={saveRecipe}
                bookID={bookID}
            />
        </div>
    );
};

export default BookPage;
