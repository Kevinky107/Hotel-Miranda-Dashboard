import { createAsyncThunk } from "@reduxjs/toolkit"
import bookings from '../../assets/bookings.json'

export const getBookingListThunk = createAsyncThunk("room/getBookingList", async() => {
    const myRoomListPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (bookings.length > 0) {
                resolve(bookings);
            } else {
                reject(`Void Array`);
            }
        }, 200);
    });

    return myRoomListPromise
        .then((list) => {return list})
        .catch((error) => {throw new Error(error)})
})

export const getBookingThunk = createAsyncThunk("room/getBooking", async({id, list}) => {
    const myRoomListPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const bookingObject = list.filter(booking => `${booking.id}` === id)
            if (bookingObject.length > 0) {     
                resolve(bookingObject[0])
            } else {
                reject(`Booking Not Found `)
            }
        }, 200);
    });

    return myRoomListPromise
        .then((object) => {return object})
        .catch((error) => {throw new Error(error)})
})