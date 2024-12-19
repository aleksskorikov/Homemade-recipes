import React from 'react';
import '../../styles/scss/_recipe.scss';


const EditButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="edit-button">Изменить</button>
    );
};

export default EditButton;
