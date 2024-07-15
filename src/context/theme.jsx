import { createContext, useReducer } from "react";

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

    return (
        <ThemeContext.Provider value={{themeSelector, themeSelectorDispatch}}>
            { children }
        </ThemeContext.Provider>
    )
}