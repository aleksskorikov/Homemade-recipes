import React, { useState, useRef, useEffect } from 'react';
import '../../styles/scss/_singUpIn.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const singUpIn = () => {
    const { login } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [message, setMessage] = useState(null);
    const [img, setImg] = useState(null); 
    const navigate = useNavigate();
    const formContainerRef = useRef(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        avatarUrl: null, 
    });

    const handleSignIn = () => {
        setIsSignUp(false);
        setMessage(null); 
    };

    const handleSignUp = () => {
        setIsSignUp(true);
        setMessage(null); 
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value 
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setImg(e.target.files[0]); 
        } else {
            setImg(null); 
        }
    };

const handleRegister = async ({ email, fullName, password }) => {
    const formDataToSend = new FormData();
    formDataToSend.append('email', email);
    formDataToSend.append('fullName', fullName);
    formDataToSend.append('password', password);
    if (img) {
        formDataToSend.append('avatar', img); 
    }

    try {
        const response = await axios.post('http://localhost:4444/auth/register', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const avatarUrl = response.data.avatarUrl; 
        setMessage(`Привіт, ${response.data.fullName}! Ви успішно зареєстровані.`);

    } catch (error) {
        if (error.response && error.response.status === 400) {
            setMessage('Такий користувач уже зареєстровано.');
        } else {
            setMessage('Помилка: ' + error.message);
        }
    }
};

    
const handleLogin = async ({ email, password }) => {
    try {
        const response = await axios.post('http://localhost:4444/auth/login', {
            email,
            password,
        });

        const userName = response.data.fullName;
        const avatarUrl = response.data.avatarUrl; 
        const token = response.data.token;

        localStorage.setItem('token', token);

        login(userName, email, avatarUrl, password); 
        setMessage(`Успішний вхід: ${userName}`);

        setIsVisible(false);
        navigate('/', { state: { userName } });
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setMessage('Неправильно введено email або пароль.');
        } else {
            setMessage('Помилка: ' + error.message);
        }
    }
};



    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, fullName, password, avatarUrl } = formData;

        setMessage(null); 

        if (isSignUp) {
            handleRegister({ email, fullName, password, avatarUrl });
        } else {
            handleLogin({ email, password });
        }
    };

    const handleClickOutside = (event) => {
        if (formContainerRef.current && !formContainerRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    return (
        <>
            {isVisible && (
                <div className='blockk'>
                    <div
                        className={`containers ${isSignUp ? 'right-panel-active' : ''}`}
                        ref={formContainerRef}
                    >
                        <div className="container__form container--signup">
                            <form className="form" id="form1" onSubmit={handleSubmit}>
                                <h2 className="form__title">Sign Up</h2>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="User"
                                    className="input"
                                    onChange={handleChange}
                                    value={formData.fullName}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input"
                                    onChange={handleChange}
                                    value={formData.email}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input"
                                    onChange={handleChange}
                                    value={formData.password}
                                    required
                                />
                                <input
                                    type="file" 
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleImageChange }
                                />
                                <button type="submit" className="btn">Зареєструватися</button>
                                {message && <p className="form__message">{message} </p>} 
                            </form>
                        </div>

                        <div className="container__form container--signin">
                            <form className="form" id="form2" onSubmit={handleSubmit}>
                                <h2 className="form__title">Увійти</h2>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input"
                                    onChange={handleChange}
                                    value={formData.email}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input"
                                    onChange={handleChange}
                                    value={formData.password}
                                    required
                                />
                                <button type="submit" className="btn">Увійти</button>
                                {message && <p className="form__message">{message}</p>} 
                            </form>
                        </div>

                        <div className="container__overlay">
                            <div className="overlay">
                                <div className="overlay__panel overlay--left">
                                    <button className="btn" onClick={handleSignIn}>
                                        Увійти
                                    </button>
                                </div>
                                <div className="overlay__panel overlay--right">
                                    <button className="btn" onClick={handleSignUp}>
                                        Зареєструватися
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default singUpIn;



