
import React from 'react';
import { useNavigate } from 'react-router-dom';


const BackToMenuBtn = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); 
    };

    return (
        <div className="button-home">
            <button onClick={goBack} id="menu" className="to-home">повернутися назад</button>
        </div>
    );
};

export default BackToMenuBtn;

