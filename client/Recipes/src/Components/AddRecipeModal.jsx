
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/scss/_AddRecipeModal.scss'; 

    const AddRecipeModal = ({ show, onClose, onSave, bookID }) => {
    const [name, setName] = useState('');
    const [img, setImg] = useState(null); 
    const [block1Title, setBlock1Title] = useState('');
    const [ingredientsBlock1, setIngredientsBlock1] = useState(['']);
    const [block2Title, setBlock2Title] = useState('');
    const [ingredientsBlock2, setIngredientsBlock2] = useState(['']);
    const [description, setDescription] = useState('');

    const handleAddIngredient = (block) => {
        if (block === 1) {
        setIngredientsBlock1([...ingredientsBlock1, '']);
        } else {
        setIngredientsBlock2([...ingredientsBlock2, '']);
        }
    };

    const handleChangeIngredient = (block, index, value) => {
        if (block === 1) {
        const updated = [...ingredientsBlock1];
        updated[index] = value;
        setIngredientsBlock1(updated);
        } else {
        const updated = [...ingredientsBlock2];
        updated[index] = value;
        setIngredientsBlock2(updated);
        }
    };

    const handleImageChange = (e) => {
        setImg(e.target.files[0]); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (img) formData.append('img', img);  
        formData.append('block1Title', block1Title);
        formData.append('ingredientsBlock1', JSON.stringify(ingredientsBlock1));
        formData.append('block2Title', block2Title);
        formData.append('ingredientsBlock2', JSON.stringify(ingredientsBlock2));
        formData.append('description', description);
        formData.append('bookID', bookID);

        onSave(formData);
    };

    return (
        show ? (
        <div className="modal-overlay">
            <div className="modal-content">
            <button className="modal-close" onClick={onClose}>✕</button>
            <h2 className='modal-title'>Додати рецепт</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className='modal__form'> 
                <label className='modal__form-lable'> Введіть назву рецепту:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className='modal__form-input'/>
                </label >
                        
                <label className='modal__form-lable'> Додати зображення (необов'язково):
                <input type="file" onChange={handleImageChange} className='modal__form-input'/> 
                </label>
                        
                <h2 className="modal__form-subtitle">Інгредієнти</h2>
                        
                <label className='modal__form-lable'> Блок інгредієнтів 1 (Щоб інгредієнти відображалися на сторінці, введіть назву. Наприклад: продукти для ....):
                <input type="text" value={block1Title} onChange={(e) => setBlock1Title(e.target.value)} required  className='modal__form-input'/>
                </label>
                        
                {ingredientsBlock1.map((ingredient, index) => (
                <label key={index} className='modal__form-lable'> Додати інгредієнт {index + 1}:
                <input type="text" value={ingredient} onChange={(e) => handleChangeIngredient(1, index, e.target.value)}className='modal__form-input'/>
                </label>
                ))}
                        
                <button type="button" onClick={() => handleAddIngredient(1)} className='modal__form-btn-add'>Додати інгредієнт</button>
                
                <div>
                    <label className='modal__form-lable'> Блок інгредієнтів 2 (Щоб інгредієнти відображалися на сторінці, введіть назву. Наприклад: продукти для ....):
                    <input type="text" value={block2Title} onChange={(e) => setBlock2Title(e.target.value)} className='modal__form-input'/>
                    </label>
                            
                    {ingredientsBlock2.map((ingredient, index) => (
                    <label key={index} className='modal__form-lable'> Додати інгредієнт {index + 1}:
                    <input type="text" value={ingredient} onChange={(e) => handleChangeIngredient(2, index, e.target.value)} className='modal__form-input'/>
                    </label>
                    ))}
                </div>

                        
                <button type="button" onClick={() => handleAddIngredient(2)} className='modal__form-btn-add'>Додати інгредієнт</button>
                <div>
                <label className='modal__form-lable'> Опис:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='modal__form-textarea'/>
                </label>
                </div>    
                
                        
                <button type="submit" className='modal__form-btn-ok'>Зберегти рецепт</button>
            </form>
            </div>
        </div>
        ) : null
    );
    };

    AddRecipeModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    bookID: PropTypes.string.isRequired,
    };

export default AddRecipeModal;





