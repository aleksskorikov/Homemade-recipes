import React from 'react';
import '../../styles/scss/_UserPage.scss';

const DeleteUserButton = ({ onDelete }) => {
    const handleDeleteUser = () => {
        if (window.confirm("Ви впевнені, що хочете видалити свій обліковий запис? Всі рецепти цього користувача будуть видалені!!! Цю дію не можна буде скасувати!!!")) {
            onDelete(); 
        }
    };

    return (
        <button onClick={handleDeleteUser} className=" btn-deliteuser">Видалити обліковий запис</button>
    );
};

export default DeleteUserButton;
