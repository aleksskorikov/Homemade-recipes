import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../../Components/AuthContext.jsx';
import '../../styles/scss/_authBtn.scss';

const ResetDataButton = () => {
    const { resetAuthData } = useContext(AuthContext);
    const navigate = useNavigate();

    // Сбрасываем данные при обновлении страницы
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('token'); 
            resetAuthData();
            console.log('Данные авторизации и рецепты сброшены');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [resetAuthData]);

    const handleResetData = () => {
        localStorage.removeItem('token');
        resetAuthData();
        console.log('Данные авторизации и рецепты сброшены');
        
        navigate('/'); 
    };

    return (
        <button className='auth-btn' onClick={handleResetData}>Вихід</button>
    );
};

export default ResetDataButton;









