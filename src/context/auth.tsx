import { createContext, useReducer } from "react";
import { AuthAction, AuthInterface, OutletContext, auth } from "../types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<null | AuthInterface>(null);

async function login(user: {email: string, password: string}){
    await fetch(`${import.meta.env.BACKEND_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('TOKEN_KEY', JSON.stringify(data.Token))
        localStorage.setItem('user', JSON.stringify(data.User))
    })
    .catch(error => {
        window.alert(error);
    });
}

const authContextReducer = (state: auth, action: AuthAction) => {
    switch (action.type) {
        case 'LOGIN':
            login(action.payload as auth)
            return JSON.parse(localStorage.getItem('user') as string)
        case 'LOGOUT':
            localStorage.clear();
            location.reload();
        case 'UPDATE':
            const user = action.payload as auth
            return {
                "password": user.password,
                "email": user.email,
            }
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