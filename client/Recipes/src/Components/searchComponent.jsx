
import React, { useState } from 'react';
import Search from '../images/logo/search.png';

const SearchComponent = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault(); 
        if (query.trim()) {

        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }
    };

    return (
        <div className="header__search">
        <p className="header__search-title">Пошук рецепта в Google</p>
        <form className="header__search-form" onSubmit={handleSearch}>
            <input
            type="search"
            className="search__form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Введите запрос..."
            />
            <button type="submit" className="search__form-btn">
            <img src={Search} alt="Search" className="form__btn-img" />
            </button>
        </form>
        </div>
    );
};

export default SearchComponent;
