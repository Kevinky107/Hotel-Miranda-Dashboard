import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getContactListThunk, getContactThunk } from "./contactThunk"
import { Comment } from "../../types"
import { RootState } from "../../app/store"

interface Slice {
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
    dataList: Comment[]
    data: null | Comment
    error: null | string
}
  
const initialState: Slice = {
    status: "idle",
    dataList: [],
    data: null,
    error: null,
}

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        removeContact: (state, action: PayloadAction<Comment>) => {
            state.dataList = [...state.dataList.filter(contact => contact._id !== action.payload._id)]
        },
        addContact: (state, action: PayloadAction<Comment>) => {
            state.dataList = [...state.dataList, action.payload]
        },
        editContact: (state, action: PayloadAction<Comment>) => {
            const aux = state.dataList.map((contact) => {
                if(contact._id === action.payload._id)
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
            .addCase(getContactListThunk.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.dataList = action.payload
                state.status = "fulfilled"
            })
            .addCase(getContactListThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
            .addCase(getContactThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getContactThunk.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.data = action.payload
                state.status = "fulfilled"
            })
            .addCase(getContactThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
    }
})
export const { removeContact, addContact, editContact } = contactSlice.actions
export const contactDataSelector = (state: RootState) => state.contact.data
export const contactDataListSelector = (state: RootState) => state.contact.dataList
export const contactStatusSelector = (state: RootState) => state.contact.status
export const contactErrorSelector = (state: RootState) => state.contact.error