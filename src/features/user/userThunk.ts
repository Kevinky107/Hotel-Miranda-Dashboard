import { createAsyncThunk } from "@reduxjs/toolkit"
import users from '../../assets/users.json'
import { User } from "../../types";

export const getUserListThunk = createAsyncThunk("user/getUserList", async() => {
    const myUserListPromise = new Promise<User[]>((resolve, reject) => {
        setTimeout(() => {
            if (users.length > 0) {
                resolve(users as any);
            } else {
                reject(`Void Array`);
            }
        }, 200);
    });

    return myUserListPromise
        .then((list) => {return list})
        .catch((error) => {throw new Error(error)})
})

export const getUserThunk = createAsyncThunk("user/getUser", async({id, list}: {id: string, list: User[]}) => {
    const myUserListPromise = new Promise<User>((resolve, reject) => {
        setTimeout(() => {
            const userObject = list.filter(user => `${user._id}` === id)
            if (userObject.length > 0) {     
                resolve(userObject[0])
            } else {
                reject(`User Not Found `)
            }
        }, 200);
    });

    return myUserListPromise
        .then((object) => {return object})
        .catch((error) => {throw new Error(error)})
})