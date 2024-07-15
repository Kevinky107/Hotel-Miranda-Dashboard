import { createContext, useEffect, useReducer } from "react";

export const ThemeContext = createContext(null);

const themeContextReducer = (state, action) => {
    switch (action.type) {
        case 'DARK':
            return state = "dark"
        case 'LIGHT':
            return state = "light"
        default:
            return state
    }
}

const initialState = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

export const ThemeContextProvider = ({ children }) => {
    const [ themeSelector, themeSelectorDispatch ] = useReducer(themeContextReducer, initialState)

    useEffect(() => {
        let darkThemeLink;
        
        if (themeSelector === 'dark') {
          darkThemeLink = document.createElement('link');
          darkThemeLink.rel = 'stylesheet';
          darkThemeLink.href = 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark/dark.css';
          darkThemeLink.id = 'dark-theme-css';
          document.head.appendChild(darkThemeLink);
        } else {
          const existingDarkThemeLink = document.getElementById('dark-theme-css');
          if (existingDarkThemeLink) {
            existingDarkThemeLink.remove();
          }
        }
        
        return () => {
          if (darkThemeLink) {
            darkThemeLink.remove();
          }
        };
      }, [themeSelector]);

    return (
        <ThemeContext.Provider value={{themeSelector, themeSelectorDispatch}}>
            { children }
        </ThemeContext.Provider>
    )
}