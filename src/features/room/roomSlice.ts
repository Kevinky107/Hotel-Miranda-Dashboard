import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addroomThunk, getRoomListThunk, getRoomThunk, removeRoomThunk, updateRoomThunk } from "./roomThunk"
import { Room } from "../../types"
import { RootState } from "../../app/store"

interface Slice {
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
    dataList: Room[]
    data: null | Room
    error: null | string
}
  
const initialState: Slice = {
    status: "idle",
    dataList: [],
    data: null,
    error: null,
}

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoomListThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getRoomListThunk.fulfilled, (state, action: PayloadAction<Room[]>) => {
                state.dataList = action.payload
                state.status = "fulfilled"
            })
            .addCase(getRoomListThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
            .addCase(getRoomThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
                state.data = action.payload
                state.status = "fulfilled"
            })
            .addCase(getRoomThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
            .addCase(removeRoomThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(removeRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
                state.dataList = [...state.dataList.filter(comment => comment._id !== action.payload._id)]
                state.status = "fulfilled"
            })
            .addCase(removeRoomThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
            .addCase(addroomThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(addroomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
                state.dataList = [...state.dataList, action.payload]
                state.status = "fulfilled"
            })
            .addCase(addroomThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
            .addCase(updateRoomThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(updateRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
                const aux = state.dataList.map((room) => {
                    if(room._id === action.payload._id)
                    {
                        return action.payload
                    }
                    return room
                })
                state.dataList = JSON.parse(JSON.stringify(aux))
                state.status = "fulfilled"
            })
            .addCase(updateRoomThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
    }
})

export const roomDataSelector = (state: RootState) => state.room.data
export const roomDataListSelector = (state: RootState) => state.room.dataList
export const roomStatusSelector = (state: RootState) => state.room.status
export const roomErrorSelector = (state: RootState) => state.room.error