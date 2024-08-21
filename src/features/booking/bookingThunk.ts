import { createAsyncThunk } from "@reduxjs/toolkit"
import { Booking } from "../../types";
import { backendAPIcall } from "../backendAPIcall";

export const getBookingListThunk = createAsyncThunk("booking/getBookingList", async() => {
    try {
        const bookings: Booking[] = await backendAPIcall("/Bookings");
        return bookings;
    } catch (error) {
        throw new Error();
    }
})

export const getBookingThunk = createAsyncThunk("booking/getBooking", async(id: string) => {
    try {
        const booking: Booking = await backendAPIcall(`/Bookings/${id}`);
        return booking;
    } catch (error) {
        throw new Error();
    }
})

export const removeBookingThunk = createAsyncThunk("booking/removeBooking", async(id: string) => {
    try {
        const booking: Booking = await backendAPIcall(`/Bookings/delete/${id}`, "DELETE");
        return booking;
    } catch (error) {
        throw new Error();
    }
})

export const addBookingThunk = createAsyncThunk("booking/addBooking", async(bookingData: Partial<Booking>) => {
    try {
        const booking: Booking = await backendAPIcall(`/Bookings/add`, "POST", bookingData);
        return booking;
    } catch (error) {
        throw new Error();
    }
})

export const updateBookingThunk = createAsyncThunk("booking/updateBooking", async(bookingData: Booking) => {
    try {
        const booking: Booking = await backendAPIcall(`/Bookings/update/${bookingData._id}`, "PUT", bookingData);
        return booking;
    } catch (error) {
        throw new Error();
    }
})