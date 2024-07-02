import { createSlice } from "@reduxjs/toolkit"
import { getRoomListThunk, getRoomThunk } from "./roomThunk"

export const roomSlice = createSlice({
    name: "room",
    initialState: {
        status: "idle",
        dataList: [],
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRoomListThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getRoomListThunk.fulfilled, (state, action) => {
                state.dataList = [...state.dataList, ...action.payload]
                state.status = "fulfilled"
            })
            .addCase(getRoomListThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
            .addCase(getRoomThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getRoomThunk.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = "fulfilled"
            })
            .addCase(getRoomThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
    }
})

export const roomDataSelector = (state) => state.room.data
export const roomDataListSelector = (state) => state.room.dataList
export const roomStatusSelector = (state) => state.room.status
export const imagesErrorSelector = (state) => state.room.error