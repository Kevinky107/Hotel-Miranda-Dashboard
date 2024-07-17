import { createContext, useEffect, useReducer } from "react";
import { OutletContext, ThemeAction, ThemeInterface } from "../types";

export const ThemeContext = createContext<null | ThemeInterface>(null);

const themeContextReducer = (state: 'dark' | 'light', action: ThemeAction) => {
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

export const ThemeContextProvider = ({ children }: OutletContext) => {
    const [ themeSelector, themeSelectorDispatch ] = useReducer(themeContextReducer, initialState)

    useEffect(() => {
        let darkThemeLink: HTMLLinkElement
        
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