import React, { createContext, useState, useContext } from 'react';
import { createTheme } from '@mui/material/styles';

const SwitchContext = createContext();

export const SwitchProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true); // Dark mode por defecto
  const [bootstrapTheme, setBootstrapTheme] = useState('dark');

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };
  

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });


  return (
    <SwitchContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </SwitchContext.Provider>
  );
};


export const useSwitch = () => useContext(SwitchContext);