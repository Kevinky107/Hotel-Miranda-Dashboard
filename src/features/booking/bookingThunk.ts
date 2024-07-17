import { createAsyncThunk } from "@reduxjs/toolkit"
import bookings from '../../assets/bookings.json'
import { Booking } from "../../types";

export const getBookingListThunk = createAsyncThunk("booking/getBookingList", async() => {
    const myBookingListPromise = new Promise<Booking[]>((resolve, reject) => {
        setTimeout(() => {
            if (bookings.length > 0) {
                resolve(bookings as Booking[]);
            } else {
                reject(`Void Array`);
            }
        }, 200);
    });

    return myBookingListPromise
        .then((list) => {return list})
        .catch((error) => {throw new Error(error)})
})

export const getBookingThunk = createAsyncThunk("booking/getBooking", async({id, list}: {id: string, list: Booking[]}) => {
    const myBookingListPromise = new Promise<Booking>((resolve, reject) => {
        setTimeout(() => {
            const bookingObject = list.filter(booking => `${booking.id}` === id)
            if (bookingObject.length > 0) {     
                resolve(bookingObject[0])
            } else {
                reject(`Booking Not Found `)
            }
        }, 200);
    });

    return myBookingListPromise
        .then((object) => {return object})
        .catch((error) => {throw new Error(error)})
})