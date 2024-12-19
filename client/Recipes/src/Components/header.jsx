import React from 'react';
import LogoBook from '../images/logo/logo.png';
import SearchComponent from './searchComponent';
import '../styles/scss/_header.scss';

const header = () => {
  return (
    <>
      <div className="header-block">
        <div className="conteiner">
          <div className="header">
            <div className="header__logo">
            <img src={LogoBook} alt="" className="header__logo-img" />
            </div>
            <h1 className="header-title">Домашні рецепти</h1>
            <SearchComponent/>
          </div>
      </div>
      </div>
      
    </>
  )
}

export default header;