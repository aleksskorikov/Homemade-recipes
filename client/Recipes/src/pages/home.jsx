import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/scss/_home.scss';
import LogoBook from '../images/logo/logo.png';
import Img1 from '../images/img/1.jpg';
import Img2 from '../images/img/2.jpg';
import Img3 from '../images/img/3.jpg';
import Img4 from '../images/img/4.jpg';

const books = [
  { id: 1, title: 'Рецепти перших страв', author: 'найкращий автор' },
  { id: 2, title: 'Рецепти других страв', author: 'найкращий автор' },
  { id: 3, title: 'Рецепти закусок', author: 'найкращий автор' },
  { id: 4, title: 'Рецепти заготовок', author: 'найкращий автор' },
  { id: 5, title: 'Рецепти маринаду', author: 'найкращий автор' },
  { id: 6, title: 'Рецепты приправ', author: 'найкращий автор' },
  { id: 7, title: 'Рецепти соусів', author: 'найкращий автор' },
  { id: 8, title: 'Рецепти виробів із тіста', author: 'найкращий автор' },
  { id: 9, title: 'Рецепти солодощів', author: 'найкращий автор' },
  { id: 10, title: 'Рецепты напитков', author: 'найкращий автор' },
  { id: 11, title: 'Інші рецепти', author: 'найкращий автор' }
];

const Home = () => {
  return (
    <>
      <div className="main">
        <div className="home-description">
          <p>"Зібрати власну колекцію рецептів — це не лише цікаво, але й надзвичайно корисно! Тепер у вас є можливість зберегти улюблені страви в одному місці, доповнити їх власними нотатками і навіть поділитися ними з близькими. Це прекрасний спосіб зберегти сімейні традиції, експериментувати з новими інгредієнтами та створювати справжні кулінарні шедеври. Створюйте свою унікальну книгу рецептів і насолоджуйтеся кожною сторінкою, наповненою любов'ю до кулінарії!"</p>
        </div>
        <div className="home-conteiner">
          <div className="img-block">
            <img src={Img1} alt="" className='img-block-img'/>
            <img src={Img2} alt="" className='img-block-img'/>
          </div>

          <div className="wrapper">
            <ul className="book__lists">
              {books.map((book) => (
                <Link key={book.id} to={`/book/${book.id}`} className='book__lists-linck'>
                  <li className="book__lists-list">
                    <div className="book-logo">
                      <img src={LogoBook} alt="" className="book__logo-img" />
                    </div>
                    <h1 className="book-title">{book.title}</h1>
                    <p className="book-avtor">{book.author}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="img-block">
            <img src={Img3} alt="" className='img-block-img'/>
            <img src={Img4} alt="" className='img-block-img'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
