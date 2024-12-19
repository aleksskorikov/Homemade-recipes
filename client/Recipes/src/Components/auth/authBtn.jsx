import React from 'react';
import SingUpIn from './singUpIn';
import '../../styles/scss/_authBtn.scss';
import '../../styles/scss/_header.scss';

const AuthBtn = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className='auth-btn' onClick={toggleModal}>Створити обліковий запис</button>
            {isOpen && <SingUpIn onClose={toggleModal} />}
        </>
    );
};

export default AuthBtn;





