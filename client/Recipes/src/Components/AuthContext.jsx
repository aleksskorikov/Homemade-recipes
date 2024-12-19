import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null); 
    const [avatarUrl, setAvatarUrl] = useState(null); 
    const [bookTitle, setBookTitle] = useState(null); 
    const [password, setPassword] = useState(null); 

    const login = (name, email, avatarUrl, password) => {
        setUserName(name);
        setEmail(email); 
        setAvatarUrl(avatarUrl); 
        setPassword(password); 
    };

    const logout = () => {
        setUserName(null);
        setEmail(null); 
        setAvatarUrl(null); 
        setPassword(null); 
        setBookTitle(null); 
    };

    const resetAuthData = () => {
        setUserName(null);
        setEmail(null); 
        setAvatarUrl(null); 
        setPassword(null);
        setBookTitle(null);
    };

    const value = {
        userName,
        email, 
        avatarUrl, 
        bookTitle,
        password, 
        setBookTitle,
        login,
        logout,
        resetAuthData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };


