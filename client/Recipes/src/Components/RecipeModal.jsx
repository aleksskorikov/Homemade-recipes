
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/scss/_AddRecipeModal.scss'; 

const RecipeModal = ({ show, onClose, onSave, bookID, initialData }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredientsBlock1, setIngredientsBlock1] = useState(['']);
    const [ingredientsBlock2, setIngredientsBlock2] = useState(['']);
    const [block1Title, setBlock1Title] = useState('');
    const [block2Title, setBlock2Title] = useState('');
    const [img, setImg] = useState(null);

    const MAX_INGREDIENTS = 10;

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setIngredientsBlock1(initialData.ingredientsBlock1 || ['']);
            setIngredientsBlock2(initialData.ingredientsBlock2 || ['']);
            setBlock1Title(initialData.block1Title || '');
            setBlock2Title(initialData.block2Title || '');
        }
    }, [initialData]);

    const handleAddList = (blockIndex) => {
        if (blockIndex === 1 && ingredientsBlock1.length < MAX_INGREDIENTS) {
            setIngredientsBlock1([...ingredientsBlock1, '']);
        } else if (blockIndex === 2 && ingredientsBlock2.length < MAX_INGREDIENTS) {
            setIngredientsBlock2([...ingredientsBlock2, '']);
        } else {
            alert('Максимальное количество ингредиентов - 10 в каждом блоке');
        }
    };

    const handleChangeList = (blockIndex, index, value) => {
        if (blockIndex === 1) {
            const updatedBlock1 = ingredientsBlock1.map((list, i) => (i === index ? value : list));
            setIngredientsBlock1(updatedBlock1);
        } else if (blockIndex === 2) {
            const updatedBlock2 = ingredientsBlock2.map((list, i) => (i === index ? value : list));
            setIngredientsBlock2(updatedBlock2);
        }
    };

    const handleSubmit =async (event) =>  {
        event.preventDefault();
        
        if (!name) {
            alert("Назва рецепту є обов'язковою для заповнення");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('bookID', bookID);
        formData.append('block1Title', block1Title || '');
        formData.append('block2Title', block2Title || '');
        formData.append('ingredientsBlock1', JSON.stringify(ingredientsBlock1));
        formData.append('ingredientsBlock2', JSON.stringify(ingredientsBlock2));

        if (img) {
            formData.append('img', img);
        };

        try {
            await onSave(formData);
            alert('Рецепт успішно змінено!'); 
        } catch (error) {
            console.error('Помилка при зміні рецепту:', error);
            alert('Помилка при зміні рецепту!');
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-contents">
                <h3 className='modal-title'>Змінити рецепт</h3>
                <form onSubmit={handleSubmit}>
                    <label className='modal__form-lable'> Введіть назву рецепту:
                        <input type="text" placeholder="Введіть назву рецепту" value={name} onChange={(e) => setName(e.target.value)} className='modal__form-input'/>
                    </label >

                    <label className='modal__form-lable'> Додати зображення (необов'язково):
                        <input type="file" onChange={(e) => setImg(e.target.files[0])} className='modal__form-input'/>
                    </label>

                    <h2 className="modal__form-subtitle">Інгредієнти</h2>

                    <label className='modal__form-lable'> Блок інгредієнтів 1 (введіть назву):
                        <input type="text" placeholder="Введіть назву блоку 1" value={block1Title} onChange={(e) => setBlock1Title(e.target.value)} className='modal__form-input'/>
                        {ingredientsBlock1.map((list, index) => (
                            <input key={`block1-${index}`} type="text" placeholder={`Інгредієнт ${index + 1}`} value={list} onChange={(e) => handleChangeList(1, index, e.target.value)} className='modal__form-input'/>
                        ))}
                        {ingredientsBlock1.length < MAX_INGREDIENTS && (
                            <button type="button" onClick={() => handleAddList(1)} className='modal__form-btn-add'>Додати інгредієнт</button>
                        )}
                    </label> 
                    
                    <div>
                        <label className='modal__form-lable'>Блок інгредієнтів 2 (введіть назву):
                            <input type="text" placeholder="Введіть назву блоку 2" value={block2Title} onChange={(e) => setBlock2Title(e.target.value)} className='modal__form-input'/>
                            {ingredientsBlock2.map((list, index) => (
                                <input key={`block2-${index}`} type="text" placeholder={`Інгредієнт ${index + 1}`} value={list} onChange={(e) => handleChangeList(2, index, e.target.value)} className='modal__form-input'/>
                            ))}
                            {ingredientsBlock2.length < MAX_INGREDIENTS && (
                                <button type="button" onClick={() => handleAddList(2)} className='modal__form-btn-add'>Додати інгредієнт</button>
                            )}
                        </label>     
                    </div>

                    <label className='modal__form-lable'> Опис:
                        <textarea placeholder="Введіть опис" value={description} onChange={(e) => setDescription(e.target.value)} className='modal__form-textarea'/>
                    </label>

                    <div className="modal-actions">
                        <button type="submit" className='modal__form-btn-ok'>Зберегти рецепт</button>
                        <button type="button" onClick={onClose} className='modal__form-btn-no'>Скасування</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

RecipeModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    bookID: PropTypes.string.isRequired,
    initialData: PropTypes.object, 
};

export default RecipeModal;
