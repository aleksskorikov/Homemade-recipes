import React, { useState, useEffect } from 'react';
import Search from '../images/logo/search.png';
import AuthBtn from '../Components/auth/authBtn';
import ResetDataButton from './btns/ResetDataButton';
import { useAuth } from '../Components/AuthContext'; 
import '../styles/scss/_header.scss';
import { Link } from 'react-router-dom';
import AltAvatar from '../assets/altUser.jpg';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const { userName, avatarUrl, logout } = useAuth(); 

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
                    placeholder="Введіть запит..."
                />
                <button type="submit" className="search__form-btn">
                    <img src={Search} alt="Search" className="form__btn-img" />
                </button>
            </form>

            <div className="user-wrapper">
                <div className="user-avatar">
                    {avatarUrl ? ( 
                        <img src={`http://localhost:4444/${avatarUrl}`} alt="User Avatar" className="avatar-img" />
                    ) : (
                        <img src={AltAvatar} alt="Default Avatar" className="avatar-img" />
                    )}
                </div>

                {userName ? (
                    <div className='search-block'>
                        <Link to='/user' className='search-title-name'>Привіт, {userName}!</Link>
                        <ResetDataButton /> 
                    </div>
                ) : (
                    <AuthBtn />  
                )}
            </div>

        </div>
    );
};

export default SearchComponent;












