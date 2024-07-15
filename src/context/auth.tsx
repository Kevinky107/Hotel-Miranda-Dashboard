import { createContext, useReducer } from "react";
import { AuthAction, AuthInterface, User } from "../types";

export const AuthContext = createContext<null | AuthInterface>(null);

const authContextReducer = (state: User, action: AuthAction) => {
    switch (action.type) {
        case 'LOGIN':
            return state = action.payload as User
        case 'LOGOUT':
            return state = initialState
        case 'UPDATE':
            const user = action.payload as User
            return {
                "id": state.id,
                "password": user.password,
                "email": user.email,
                "name": state.name,
                "picture": state.picture,
                "post": state.post,
                "phone": state.phone,
                "postdescription" : state.postdescription,
                "startdate" : state.startdate,
                "state": state.state
            }
        default:
            return state
    }
}

const initialState = JSON.parse(localStorage.getItem('user') as string) || {
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


export const AuthContextProvider = ({ children }: any) => {
    const [ contextAuth, contextAuthDispatch ] = useReducer(authContextReducer, initialState)

    return (
        <AuthContext.Provider value={{contextAuth, contextAuthDispatch}}>
            { children }
        </AuthContext.Provider>
    )
}