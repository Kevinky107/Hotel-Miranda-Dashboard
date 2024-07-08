import { createSlice } from "@reduxjs/toolkit"
import { getContactListThunk, getContactThunk } from "./contactThunk"

export const contactSlice = createSlice({
    name: "contact",
    initialState: {
        status: "idle",
        dataList: [],
        data: null,
        error: null,
    },
    reducers: {
        removeContact: (state, action) => {
            state.dataList = [...state.dataList.filter(contact => contact.id !== action.payload.id)]
        },
        addContact: (state, action) => {
            state.dataList = [...state.dataList, action.payload]
        },
        editContact: (state, action) => {
            const aux = state.dataList.map((contact) => {
                if(contact.id === action.payload.id)
                {
                    return action.payload
                }
                return contact
            })
            state.dataList = JSON.parse(JSON.stringify(aux))
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContactListThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getContactListThunk.fulfilled, (state, action) => {
                state.dataList = [...action.payload]
                state.status = "fulfilled"
            })
            .addCase(getContactListThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
            .addCase(getContactThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getContactThunk.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = "fulfilled"
            })
            .addCase(getContactThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
    }
})
export const { removeContact, addContact, editContact } = contactSlice.actions
export const contactDataSelector = (state) => state.contact.data
export const contactDataListSelector = (state) => state.contact.dataList
export const contactStatusSelector = (state) => state.contact.status
export const contactErrorSelector = (state) => state.contact.error