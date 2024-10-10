import React from 'react';
import Header from "./Components/header.jsx";
import Footer from "./Components/footer.jsx";
import { Outlet } from "react-router-dom";

const Loyaut = () => {
return (
    <div>
        <>
            <div className="body">
                <Header />   
                <Outlet />
                <Footer />
            </div>
            
        </>
    </div>
)
}

export default Loyaut