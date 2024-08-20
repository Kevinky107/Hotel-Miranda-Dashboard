import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getUserListThunk, getUserThunk } from "./userThunk"
import { User } from "../../types"
import { RootState } from "../../app/store"

interface Slice {
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
    dataList: User[]
    data: null | User
    error: null | string
}
  
const initialState: Slice = {
    status: "idle",
    dataList: [],
    data: null,
    error: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        removeUser: (state, action: PayloadAction<User>) => {
            state.dataList = [...state.dataList.filter(user => user._id !== action.payload._id)]
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.dataList = [...state.dataList, action.payload]
        },
        editUser: (state, action: PayloadAction<User>) => {
            const aux = state.dataList.map((user) => {
                if(user._id === action.payload._id)
                {
                    return action.payload
                }
                return user
            })
            state.dataList = JSON.parse(JSON.stringify(aux))
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserListThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getUserListThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.dataList = action.payload
                state.status = "fulfilled"
            })
            .addCase(getUserListThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
            .addCase(getUserThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
                state.data = action.payload
                state.status = "fulfilled"
            })
            .addCase(getUserThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
    }
})
export const { removeUser, addUser, editUser } = userSlice.actions
export const userDataSelector = (state: RootState) => state.user.data
export const userDataListSelector = (state: RootState) => state.user.dataList
export const userStatusSelector = (state: RootState) => state.user.status
export const userErrorSelector = (state: RootState) => state.user.error