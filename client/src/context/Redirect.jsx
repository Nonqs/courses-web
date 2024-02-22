import React, { createContext, useState, useContext } from 'react';

const RedirectContext = createContext();

export const useRedirect = () => {
    return useContext(RedirectContext);
}

export const RedirectProvider = ({ children }) => {
    const [redirectPath, setRedirectPath] = useState(null);

    const setRedirect = (path) => {
        setRedirectPath(path);
    }

    console.log(redirectPath)

    return (
        <RedirectContext.Provider value={{ redirectPath, setRedirect }}>
            {children}
        </RedirectContext.Provider>
    );
};