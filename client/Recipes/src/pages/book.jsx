import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/scss/_book.scss';
import BackToMenuBtn from '../Components/btns/backTuMenuBtn';
import Img5 from '../images/img/5.jpg';
import Img6 from '../images/img/6.jpg';
import Img7 from '../images/img/7.jpg';
import Img8 from '../images/img/8.jpg';
import BookPage from '../Components/bookPage';
import React, { useContext, useEffect } from 'react';


const Book = () => {

  return (
    <>
      <div className="main">
        <BackToMenuBtn />
        <div className="home-conteiner">
          <div className="img-block">
            <img src={Img5} alt="" className="img-block-img" />
            <img src={Img6} alt="" className="img-block-img" />
          </div>

          <BookPage />

          <div className="img-block">
            <img src={Img7} alt="" className="img-block-img" />
            <img src={Img8} alt="" className="img-block-img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;









