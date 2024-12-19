import React from 'react';
import { Link } from 'react-router-dom';

const toMainBtn = () => {
    return (
        <>
            <div className="btn-block">
                <Link to="/" id="menu" className="to-home">На головну</Link>
            </div>
        </>
    )
}

export default toMainBtn;