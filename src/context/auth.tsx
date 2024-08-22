import { createContext, useReducer } from "react";
import { AuthAction, AuthInterface, OutletContext, auth } from "../types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<null | AuthInterface>(null);

const authContextReducer = (state: auth, action: AuthAction) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            localStorage.clear();
            location.reload();
            return initialState
        case 'UPDATE':
            const user = action.payload as auth
            const newState = {
                "name" : state.name,
                "picture" : state.picture,
                "password": user.password,
                "email": user.email,
            }
            localStorage.setItem('user', JSON.stringify(newState))
            return newState
        default:
            return state
    }
}

const initialState = JSON.parse(localStorage.getItem('user') as string) || {
    "password": null,
    "email": null,
    "name": null,
    "picture": null
}

export const AuthContextProvider = ({ children }: OutletContext) => {
    const [ contextAuth, contextAuthDispatch ] = useReducer(authContextReducer, initialState)

    return (
        <AuthContext.Provider value={{contextAuth, contextAuthDispatch}}>
            { children }
        </AuthContext.Provider>
    )
}