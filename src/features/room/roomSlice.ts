import { createSlice } from "@reduxjs/toolkit"
import { getRoomListThunk, getRoomThunk } from "./roomThunk"
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
        removeRoom: (state, action) => {
            state.dataList = [...state.dataList.filter(room => room.id !== action.payload.id)]
        },
        addRoom: (state, action) => {
            state.dataList = [...state.dataList, action.payload]
        },
        editRoom: (state, action) => {
            const aux = state.dataList.map((room) => {
                if(room.id === action.payload.id)
                {
                    return action.payload
                }
                return room
            })
            state.dataList = JSON.parse(JSON.stringify(aux))
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoomListThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getRoomListThunk.fulfilled, (state, action) => {
                state.dataList = action.payload as Room[]
                state.status = "fulfilled"
            })
            .addCase(getRoomListThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message as string
            })
            .addCase(getRoomThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getRoomThunk.fulfilled, (state, action) => {
                state.data = action.payload as Room
                state.status = "fulfilled"
            })
            .addCase(getRoomThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message as string
            })
    }
})
export const { removeRoom, addRoom, editRoom } = roomSlice.actions
export const roomDataSelector = (state: RootState) => state.room.data
export const roomDataListSelector = (state: RootState) => state.room.dataList
export const roomStatusSelector = (state: RootState) => state.room.status
export const roomErrorSelector = (state: RootState) => state.room.error