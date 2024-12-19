import React, { useState, useEffect } from 'react';
import EditUserForm from '../Components/EditUserForm.jsx'; 
import BackToMenuBtn from '../Components/btns/backTuMenuBtn.jsx';
import ToMainBtn from '../Components/btns/toMainBtn.jsx';
import DeleteUserButton from '../Components/btns/DeleteUserButton.jsx';
import { useAuth } from '../Components/AuthContext.jsx';
import '../styles/scss/_recipe.scss';
import '../styles/scss/_UserPage.scss';

const UserPage = () => {
    const { userName, email, avatarUrl, password, login, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const response = await fetch('http://localhost:4444/auth/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();

                    if (response.ok) {
                        login(data.fullName, data.email, data.avatarUrl, data.passwordHash);
                        setUserData(data); 
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Помилка сеті или сервера:", error);
                    logout();
                }
            }
        };

        fetchUserData();
    }, [login, logout]);

const handleUpdateUser = async (updatedData, selectedFile) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('fullName', updatedData.userName);
    formData.append('email', updatedData.email);
    if (selectedFile) {
        formData.append('avatar', selectedFile); 
    }

    try {
        const response = await fetch('http://localhost:4444/auth/update', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            login(data.fullName, data.email, data.avatarUrl, data.passwordHash);
            setIsEditing(false); 
        } else {
            console.error("Помилка під час оновлення даних користувача");
        }
    } catch (error) {
        console.error("Помилка мережі або сервера:", error);
    }
};



    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await fetch('http://localhost:4444/auth/delete', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    alert("Ваш обліковий запис успішно видалено.");
                    logout();
                } else {
                    const data = await response.json();
                    console.error("Помилка при видаленні облікового запису:", data.message);
                }
            } catch (error) {
                console.error("Помилка мережі або сервера:", error);
            }
        }
    };

    if (!userName) {
        return (
        <>
            <div className="recipe__btns-block">
                <BackToMenuBtn />
                <ToMainBtn />
            </div>
            <div>Користувач не авторизований.</div>    
        </>
        )
    }

    return (
        <div className="conteiner">
            <div className="recipe__btns-block">
                <BackToMenuBtn />
                <ToMainBtn />
            </div>
            <h2 className='info-title'>Інформація про користувача</h2>
            <div className="user__info">
                {avatarUrl && <img src={`http://localhost:4444/${avatarUrl}`} alt="Аватар пользователя" className='user__info-img'/>}
                <div className="user__info-block">
                    <p className='user__info-data'><strong className='user__info-subtitle'>Ім'я користувача:</strong> {userName}</p>
                    <p className='user__info-data'><strong className='user__info-subtitle'>Email:</strong> {email}</p>
                    <button onClick={() => setIsEditing(true)} className='user__info-btn'>Змінити</button>
                </div>
            </div>

            {isEditing && (
                <EditUserForm
                    userName={userName}
                    email={email}
                    avatarUrl={avatarUrl}
                    onSave={handleUpdateUser}
                    onCancel={() => setIsEditing(false)}
                />
            )}

            <DeleteUserButton onDelete={handleDeleteUser} />
        </div>
    );
};

export default UserPage;

