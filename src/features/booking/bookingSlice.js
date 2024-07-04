import { createSlice } from "@reduxjs/toolkit"
import { getBookingListThunk, getBookingThunk } from "./bookingThunk"

export const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        status: "idle",
        dataList: [],
        data: null,
        error: null,
    },
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
                state.dataList = [...action.payload]
                state.status = "fulfilled"
            })
            .addCase(getBookingListThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
            .addCase(getBookingThunk.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(getBookingThunk.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = "fulfilled"
            })
            .addCase(getBookingThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
    }
})
export const { removeBooking, addBooking, editBooking } = bookingSlice.actions
export const bookingDataSelector = (state) => state.booking.data
export const bookingDataListSelector = (state) => state.booking.dataList
export const bookingStatusSelector = (state) => state.booking.status
export const bookingErrorSelector = (state) => state.booking.error