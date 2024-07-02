import { createContext, useReducer } from "react";

export const AuthContext = createContext(null);

const authContextReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return state = action.payload
        case 'LOGOUT':
            return state = initialState
        default:
            return state
    }
}

const initialState = JSON.parse(localStorage.getItem('user')) || {
    "id": null,
    "password": null,
    "email": null,
    "name": null,
    "picture": null,
    "post": null,
    "phone": null,
    "postdescription" : null,
    "startdate" : null,
    "state": null
}


export const AuthContextProvider = ({ children }) => {
    const [ contextAuth, contextAuthDispatch ] = useReducer(authContextReducer, initialState)

    return (
        <AuthContext.Provider value={{contextAuth, contextAuthDispatch}}>
            { children }
        </AuthContext.Provider>
    )
}