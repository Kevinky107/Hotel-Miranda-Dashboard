import { createAsyncThunk } from "@reduxjs/toolkit"
import users from '../../assets/users.json'

export const getUserListThunk = createAsyncThunk("user/getUserList", async() => {
    const myUserListPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (users.length > 0) {
                resolve(users);
            } else {
                reject(`Void Array`);
            }
        }, 200);
    });

    return myUserListPromise
        .then((list) => {return list})
        .catch((error) => {throw new Error(error)})
})

export const getUserThunk = createAsyncThunk("user/getUser", async({id, list}) => {
    const myUserListPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const userObject = list.filter(user => `${user.id}` === id)
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