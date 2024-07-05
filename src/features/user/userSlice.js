import { createSlice } from "@reduxjs/toolkit"
import { getUserListThunk, getUserThunk } from "./userThunk"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        status: "idle",
        dataList: [],
        data: null,
        error: null,
    },
    reducers: {
        removeUser: (state, action) => {
            state.dataList = [...state.dataList.filter(user => user.id !== action.payload.id)]
        },
        addUser: (state, action) => {
            state.dataList = [...state.dataList, action.payload]
        },
        editUser: (state, action) => {
            const aux = state.dataList.map((user) => {
                if(user.id === action.payload.id)
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
            .addCase(getUserListThunk.fulfilled, (state, action) => {
                state.dataList = [...action.payload]
                state.status = "fulfilled"
            })
            .addCase(getUserListThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
            .addCase(getUserThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = "fulfilled"
            })
            .addCase(getUserThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
    }
})
export const { removeUser, addUser, editUser } = userSlice.actions
export const userDataSelector = (state) => state.user.data
export const userDataListSelector = (state) => state.user.dataList
export const userStatusSelector = (state) => state.user.status
export const userErrorSelector = (state) => state.user.error