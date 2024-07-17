import { createAsyncThunk } from "@reduxjs/toolkit"
import comments from '../../assets/comments.json'
import { Comment } from "../../types";

export const getContactListThunk = createAsyncThunk("contact/getContactList", async() => {
    const myContactListPromise = new Promise<Comment[]>((resolve, reject) => {
        setTimeout(() => {
            if (comments.length > 0) {
                resolve(comments);
            } else {
                reject(`Void Array`);
            }
        }, 200);
    });

    return myContactListPromise
        .then((list) => {return list})
        .catch((error) => {throw new Error(error)})
})

export const getContactThunk = createAsyncThunk("contact/getContact", async({id, list}: {id: string, list: Comment[]}) => {
    const myContactListPromise = new Promise<Comment>((resolve, reject) => {
        setTimeout(() => {
            const contactObject = list.filter(contact => `${contact.id}` === id)
            if (contactObject.length > 0) {     
                resolve(contactObject[0])
            } else {
                reject(`Contact Not Found `)
            }
        }, 200);
    });

    return myContactListPromise
        .then((object) => {return object})
        .catch((error) => {throw new Error(error)})
})