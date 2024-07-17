import { createSlice } from "@reduxjs/toolkit"
import { getBookingListThunk, getBookingThunk } from "./bookingThunk"
import { Booking } from "../../types"
import { RootState } from "../../app/store"

interface Slice {
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
    dataList: Booking[]
    data: null | Booking
    error: null | string
}
  
const initialState: Slice = {
    status: "idle",
    dataList: [],
    data: null,
    error: null,
}

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        removeBooking: (state, action) => {
            state.dataList = [...state.dataList.filter(booking => booking.id !== action.payload.id)]
        },
        addBooking: (state, action) => {
            state.dataList = [...state.dataList, action.payload]
        },
        editBooking: (state, action) => {
            const aux = state.dataList.map((booking) => {
                if(booking.id === action.payload.id)
                {
                    return action.payload
                }
                return booking
            })
            state.dataList = JSON.parse(JSON.stringify(aux))
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookingListThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getBookingListThunk.fulfilled, (state, action) => {
                state.dataList = action.payload as Booking[]
                state.status = "fulfilled"
            })
            .addCase(getBookingListThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message as string
            })
            .addCase(getBookingThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getBookingThunk.fulfilled, (state, action) => {
                state.data = action.payload as Booking
                state.status = "fulfilled"
            })
            .addCase(getBookingThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message as string
            })
    }
})
export const { removeBooking, addBooking, editBooking } = bookingSlice.actions
export const bookingDataSelector = ((state: RootState) => state.booking.data)
export const bookingDataListSelector = (state: RootState) => state.booking.dataList
export const bookingStatusSelector = (state: RootState) => state.booking.status
export const bookingErrorSelector = (state: RootState) => state.booking.error