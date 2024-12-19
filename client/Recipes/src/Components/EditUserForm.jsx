import React, { useState } from 'react';
import '../styles/scss/_UserPage.scss';

const EditUserForm = ({ userName, email, avatarUrl, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        userName: userName || '', 
        email: email || '',       
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.userName) {
            newErrors.userName = "Ім'я користувача обов'язкове";
        }
        if (!formData.email) {
            newErrors.email = "Email обов'язковий";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Некоректний формат email';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            onSave(formData, selectedFile); 
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit__user-form">
            <label className='edit__user-label-img'>
                Завантажити новий аватар:
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className='edit__user-input-img'
                />
                {selectedFile && (
                    <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Предварительный просмотр"
                        className='edit__user-img'
                    />
                )}
            </label>
            <div className="edit__user-block">
                <label className='edit__user-label'>
                    Ім'я користувача:
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className='edit__user-input'
                    />
                </label>
                {errors.userName && <span className="error">{errors.userName}</span>}
                <label className='edit__user-label'>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='edit__user-input'    
                    />
                </label>
                {errors.email && <span className="error">{errors.email}</span>}
                <div className="edit__user-block-btns">
                    <button type="submit" className='edit__user-btn'>Зберегти зміни</button>
                    <button type="button" onClick={onCancel} className='edit__user-btn btn-cancellation'>Скасування</button>
                </div>
            </div>
        </form>
    );
};

export default EditUserForm;





