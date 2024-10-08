import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addBookingThunk, getBookingListThunk, getBookingThunk, removeBookingThunk, updateBookingThunk } from "./bookingThunk"
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookingListThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getBookingListThunk.fulfilled, (state, action: PayloadAction<Booking[]>) => {
                state.dataList = action.payload
                state.status = "fulfilled"
            })
            .addCase(getBookingListThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
            .addCase(getBookingThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.data = action.payload
                state.status = "fulfilled"
            })
            .addCase(getBookingThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
            .addCase(removeBookingThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(removeBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.dataList = [...state.dataList.filter(booking => booking._id !== action.payload._id)]
                state.status = "fulfilled"
            })
            .addCase(removeBookingThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
            .addCase(addBookingThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(addBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.dataList = [...state.dataList, action.payload]
                state.status = "fulfilled"
            })
            .addCase(addBookingThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
            .addCase(updateBookingThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(updateBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
                const aux = state.dataList.map((booking) => {
                    if(booking._id === action.payload._id)
                    {
                        return action.payload
                    }
                    return booking
                })
                state.dataList = JSON.parse(JSON.stringify(aux))
                state.status = "fulfilled"
            })
            .addCase(updateBookingThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message || 'Unexpected Error'
            })
    }
})
export const bookingDataSelector = ((state: RootState) => state.booking.data)
export const bookingDataListSelector = (state: RootState) => state.booking.dataList
export const bookingStatusSelector = (state: RootState) => state.booking.status
export const bookingErrorSelector = (state: RootState) => state.booking.error