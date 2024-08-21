import { createAsyncThunk } from "@reduxjs/toolkit"
import users from '../../assets/users.json'
import { User } from "../../types";
import { backendAPIcall } from "../backendAPIcall";

export const getUserListThunk = createAsyncThunk("User/getUserList", async() => {
    try {
        const user: User[] = await backendAPIcall("/Users");
        return user;
    } catch (error) {
        throw new Error();
    }
})

export const getUserThunk = createAsyncThunk("User/getUser", async(id: string) => {
    try {
        const user: User = await backendAPIcall(`/Users/${id}`);
        return user;
    } catch (error) {
        throw new Error();
    }
})

export const removeUserThunk = createAsyncThunk("User/removeUser", async(id: string) => {
    try {
        const user: User = await backendAPIcall(`/Users/delete/${id}`, "DELETE");
        return user;
    } catch (error) {
        throw new Error();
    }
})

export const addUserThunk = createAsyncThunk("User/addUser", async(userData: Partial<User>) => {
    try {
        const user: User = await backendAPIcall(`/Users/add`, "POST", userData);
        return user;
    } catch (error) {
        throw new Error();
    }
})

export const updateUserThunk = createAsyncThunk("User/updateUser", async(userData: Partial<User>) => {
    try {
        const user: User = await backendAPIcall(`/Users/update/${userData._id}`, "PUT", userData);
        return user;
    } catch (error) {
        throw new Error();
    }
})