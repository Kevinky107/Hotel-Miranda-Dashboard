import { createAsyncThunk } from "@reduxjs/toolkit"
import { Comment } from "../../types";
import { backendAPIcall } from "../backendAPIcall";

export const getContactListThunk = createAsyncThunk("contact/getContactList", async() => {
    try {
        const contact: Comment[] = await backendAPIcall("/Contact");
        return contact;
    } catch (error) {
        throw new Error();
    }
})

export const getContactThunk = createAsyncThunk("contact/getContact", async(id: string) => {
    try {
        const contact: Comment = await backendAPIcall(`/Contact/${id}`);
        return contact;
    } catch (error) {
        throw new Error();
    }
})

export const removeContactThunk = createAsyncThunk("contact/removeContact", async(id: string) => {
    try {
        const contact: Comment = await backendAPIcall(`/Contact/delete/${id}`, "DELETE");
        return contact;
    } catch (error) {
        throw new Error();
    }
})

export const addContactThunk = createAsyncThunk("contact/addContact", async(contactData: Partial<Comment>) => {
    try {
        const contact: Comment = await backendAPIcall(`/Contact/add`, "POST", contactData);
        return contact;
    } catch (error) {
        throw new Error();
    }
})

export const updateContactThunk = createAsyncThunk("contact/updateContact", async(contactData: Comment) => {
    try {
        const contact: Comment = await backendAPIcall(`/Contact/update/${contactData._id}`, "PUT", contactData);
        return contact;
    } catch (error) {
        throw new Error();
    }
})